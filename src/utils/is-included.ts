export const isIncluded = (text: string | number, searchText: string) => {
  return String(text).toLowerCase().includes(searchText.toLowerCase());
};
