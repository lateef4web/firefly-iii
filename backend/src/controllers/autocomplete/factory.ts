import { Request, Response } from 'express';

export type AutocompleteItem = { id: string; name: string };

function buildItems(prefix: string): AutocompleteItem[] {
  return Array.from({ length: 5 }).map((_, i) => ({
    id: String(i + 1),
    name: `${prefix} ${i + 1}`,
  }));
}

export function createAutocompleteHandler(prefix: string) {
  const items = buildItems(prefix);
  return (req: Request, res: Response) => {
    const query = typeof req.query.query === 'string' ? req.query.query.toLowerCase() : '';
    const filtered = query
      ? items.filter((item) => item.name.toLowerCase().includes(query))
      : items;
    res.json(filtered);
  };
}

