import type { ServiceContent } from './types';
import { services } from '../site';

const mods = import.meta.glob<{ default: ServiceContent }>('./*.ts', { eager: true });

/** One content module per plan hub; the build fails if a hub has no page. */
export const serviceContent: ServiceContent[] = services.map((s) => {
  const mod = mods[`./${s.slug}.ts`];
  if (!mod) throw new Error(`missing service content: ${s.slug}`);
  return mod.default;
});
