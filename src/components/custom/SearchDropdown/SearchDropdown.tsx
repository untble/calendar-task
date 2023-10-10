import useSearch from '../../../hooks/useSearch';
import './styles';
import { SearchInput, SearchDropdownForm, SearchButton, DropdownList, ListItem, NoResults } from './styles';

const SearchDropdown = ({ initialData }) => {
  const {
    data,
    searchQuery,
    updateSearchQuery,
    performSearch,
    resetSearch,
  } = useSearch(initialData);

  return (
    <SearchDropdownForm onSubmit={performSearch}>
      <SearchInput
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => updateSearchQuery(e.target.value)}
      />
      <SearchButton onClick={performSearch}>Search</SearchButton>
      <SearchButton onClick={resetSearch}>Reset</SearchButton>
      {data?.length > 0 ? (
        <DropdownList>
          {data.map((event) => (
            <ListItem key={event.id}>{event.text}</ListItem>
          ))}
        </DropdownList>
      ) : (
        <NoResults>No results found</NoResults>
      )}
    </SearchDropdownForm>
  );
};

export default SearchDropdown;