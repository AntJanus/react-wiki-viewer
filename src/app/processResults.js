export function processResults(results) {
  const pages = results.query.pages;
  const pageArray = Object.keys(pages).map(key => pages[key]);

  return pageArray;
}
