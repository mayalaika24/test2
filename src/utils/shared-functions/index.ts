export const checkFileType = (input?: string | File | null): any => {
  return typeof input === 'string' ? input : '';
};

export const extractItems = (
  pages?: Array<{ data: { items: Array<any>; pagination: object } }>
) => {
  if (Array.isArray(pages)) {
    return pages.flatMap((page) => page.data.items);
  }
  return [];
};
