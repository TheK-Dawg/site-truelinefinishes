// Non-English lead guard (operator rule, 25 Oct 2026): a lead whose message is not written in
// English is worthless to our English-speaking clients and must never reach them. The submit
// handler calls nonEnglishReason(message) BEFORE the lead is saved or anyone is notified; a
// non-null result means: reject the submission and log it with reason "non-english".
//
// Deliberately conservative - it only fires on clear evidence:
//  1. Script: at least 8 letters in a non-Latin script (Cyrillic, Arabic, Bengali, Devanagari,
//     CJK, Thai...) making up at least half of all letters. A Chinese company name inside an
//     English message does not trip it.
//  2. Latin-script languages (French, Spanish, German...): at least 6 words, at least 3 distinct
//     function words of one other language, covering at least 25% of the words and outnumbering
//     the English function words (or 2 distinct covering 30% with no English function word).
//  3. Short text with no English function word, written with 3+ letters English never uses
//     (ə ı ş ł ą ř ø å ñ ß...), at least 8% of its letters.
//  Tokens with digits (postcodes, phone numbers) are ignored, so postcodes, phone numbers,
//  names, links and short English messages never trip it.

const SCRIPTS = [
  'Cyrillic', 'Greek', 'Arabic', 'Hebrew', 'Devanagari', 'Bengali', 'Gurmukhi', 'Gujarati', 'Oriya',
  'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Sinhala', 'Thai', 'Lao', 'Khmer', 'Myanmar', 'Georgian',
  'Armenian', 'Ethiopic', 'Han', 'Hiragana', 'Katakana', 'Hangul', 'Tibetan', 'Mongolian', 'Thaana',
].map((name) => [name, new RegExp(`\\p{Script=${name}}`, 'u')]);

// Function words only. Left out on purpose: anything that is also an everyday English word
// ("die", "van", "pour", "plus", "per", "con", "do", "as", "ale", "care"...), a common UK first
// name ("ben", "dan") or a UK postcode area ("po", "sa", "ng", "se").
const FOREIGN = {
  French: 'le la les de des du un une est et que qui sur avec dans je vous nous il elle ce cette sont mais très bonjour merci salut votre notre au aux ou où être avoir chez cela ça peut mes tes leur leurs voici voilà aussi alors donc comme',
  Spanish: 'el los las de del que y en una por para es está estoy hola gracias usted ustedes su sus como pero muy quiero tengo más mi mis tu tus nosotros ellos este esta esto cuando donde porque señor buenos buenas días',
  Portuguese: 'os de da dos das que em uma para não olá obrigado obrigada você vocês seu sua seus suas mais muito estou está tenho quero isso este esta pelo pela nós eles dia',
  Italian: 'il gli che di è un una sono ciao grazie della delle degli nel nella alla alle dei nei sulla ai lei lui loro suo sua mio mia tuo tua ci si chi cosa questo questa quello quella anche molto vorrei sei siamo hanno ho hai abbiamo avete sempre ancora dopo tutto tutti più già così buongiorno buonasera salve perché quando',
  German: 'der das und ist nicht ich sie wir mit für auf ein eine zu dem von hallo danke bitte ihr ihre sind haben habe wie aber oder auch noch nach bei möchte können guten',
  Dutch: 'de het een en ik je niet dat op te voor met hallo bedankt zijn wij jullie maar ook nog naar heb hebben wil goedendag graag',
  Polish: 'się nie jest że na jak dla czy mnie jestem dzień dobry dziękuję proszę jesteś mamy będzie tak też tylko przez oraz witam',
  Romanian: 'și în cu pe pentru este nu să mai ce sunt bună ziua mulțumesc vă vreau aveți acest această',
  Turkish: 've bir bu için ile çok gibi daha merhaba teşekkür ederim değil var yok siz nasıl',
  Indonesian: 'yang di untuk dengan saya anda ini itu tidak ada kami bisa apa kita juga dari akan sudah terima kasih selamat',
  Vietnamese: 'và của là có không được cho với này các những một tôi bạn chúng đã sẽ rất anh xin chào cảm ơn',
  Swedish: 'och att det som är på för med jag inte har vi ni hej tack också mycket ditt din vill ville veta',
  Danish: 'og det som på med jeg ikke har vi hej tak også meget din dit jeres vores vil gerne hvad hvor hvordan venlig hilsen',
  Norwegian: 'og det som på med jeg ikke har vi hei takk også mye din ditt å vite ønsket hva hvor',
  Czech: 'je že jak jsem jste děkuji dobrý prosím',
  Tagalog: 'ang mga ako ikaw salamat kumusta namin ninyo ito iyan',
};
const FOREIGN_SETS = Object.entries(FOREIGN).map(([lang, words]) => [lang, new Set(words.split(/\s+/))]);

// Letters that do not occur in English words (Azerbaijani, Turkish, Polish, Czech, Romanian,
// Vietnamese, Nordic, Hungarian, Baltic...). Plain accented vowels (é, ü, ö...) are excluded:
// English loanwords and names use them.
const STRONG_LETTERS = /[əıİğĞşŞőŐűŰłŁąĄęĘżŻźŹśŚćĆńŃřŘěĚůŮșȘțȚăĂđĐơƠưƯãÃõÕñÑßøØåÅæÆœŒčČšŠžŽňŇťŤďĎľĽĺĹŕŔėĖųŲūŪīĪāĀēĒļĻķĶņŅģĢŭŬạ-ỹ]/gu;

const ENGLISH = new Set(('the a an and or but if of to in on at by for with from up about into over after ' +
  'i me my we us our you your he him his she her it its they them their this that these those ' +
  'is are was were be been being am have has had do does did will would can could should may might must ' +
  "not no yes please thanks thank hi hello dear hey need want looking quote call back when what where how " +
  "there here some any just also very so as than then too out get got like know let i'm it's i'd i've " +
  "we're we'd don't can't won't there's that's").split(/\s+/));

/**
 * Why `text` reads as clearly not English, or null when it may be English (or is too short to
 * judge). The result is a short label for the rejection log, e.g. "Bengali script" or
 * "French (la, un, qui)".
 * @param {unknown} text
 * @returns {string | null}
 */
export function nonEnglishReason(text) {
  const raw = String(text ?? '').normalize('NFKC')
    .replace(/https?:\/\/\S+|www\.\S+|\S+@\S+\.\S+/giu, ' '); // links and addresses are not language
  const letters = raw.match(/\p{L}/gu) || [];
  if (letters.length < 8) return null;
  const nonLatin = new Map();
  let latin = 0;
  for (const ch of letters) {
    if (/\p{Script=Latin}/u.test(ch)) { latin += 1; continue; }
    const name = SCRIPTS.find(([, re]) => re.test(ch))?.[0] || 'non-Latin';
    nonLatin.set(name, (nonLatin.get(name) || 0) + 1);
  }
  const other = letters.length - latin;
  if (other >= 8 && other / letters.length >= 0.5) {
    const [name] = [...nonLatin.entries()].sort((a, b) => b[1] - a[1])[0];
    return `${name === 'Han' ? 'Chinese/Japanese' : name} script`;
  }
  const words = raw.toLowerCase().replace(/’/g, "'").split(/[^\p{L}\p{N}']+/u)
    .map((w) => w.replace(/^'+|'+$/g, '')).filter((w) => w && !/\d/.test(w));
  if (words.length < 4) return null;
  const english = words.filter((w) => ENGLISH.has(w)).length;
  let best = null;
  for (const [lang, set] of FOREIGN_SETS) {
    const hits = words.filter((w) => set.has(w));
    const distinct = [...new Set(hits)];
    if (distinct.length >= 2 && (!best || hits.length > best.hits)) best = { lang, hits: hits.length, distinct };
  }
  if (best && words.length >= 6) {
    const label = `${best.lang} (${best.distinct.slice(0, 4).join(', ')})`;
    // Main rule: 3+ distinct function words of one language, 25%+ of the words, outnumbering English.
    if (best.distinct.length >= 3 && best.hits >= words.length * 0.25 && best.hits > english) return label;
    // Short template spam ("Hai, saya ingin tahu harga Anda."): 2 distinct, 30%+, no English at all.
    if (english === 0 && best.hits >= words.length * 0.3) return label;
  }
  // No English function word at all, written with letters English never uses
  // ("Salam, qiymətinizi bilmək istədim.").
  const strong = raw.match(STRONG_LETTERS) || [];
  if (english === 0 && strong.length >= 3 && strong.length >= letters.length * 0.08) {
    return `non-English letters (${[...new Set(strong)].slice(0, 4).join(' ')})`;
  }
  return null;
}
