// get search text
export const getSearchText = (state) => {
  return (state && state.search && state.search.query) || ''
}
