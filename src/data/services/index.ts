import type { ServiceContent, TownContent } from './types';
import { services, builtTowns } from '../site';

const serviceMods = import.meta.glob<{ default: ServiceContent }>('./*.ts', { eager: true });
const townMods = import.meta.glob<{ default: TownContent }>('../towns/*.ts', { eager: true });

/** One content module per plan hub; the build fails if a hub has no page. */
export const serviceContent: ServiceContent[] = services.map((s) => {
  const mod = serviceMods[`./${s.slug}.ts`];
  if (!mod) throw new Error(`missing service content: ${s.slug}`);
  return mod.default;
});

export const townContent: TownContent[] = builtTowns.map((t) => {
  const mod = townMods[`../towns/${t.slug}.ts`];
  if (!mod) throw new Error(`missing town content: ${t.slug}`);
  return mod.default;
});
