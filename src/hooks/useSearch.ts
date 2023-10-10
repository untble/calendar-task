import { useState } from 'react';
import { IEvent } from '../components/Calendar/interfaces/day';

interface ISearchResults {
  data: IEvent[];
  searchQuery: string;
  updateSearchQuery: (query: string) => void;
  performSearch: () => void;
  resetSearch: () => void;
}

const useSearch = (initialData): ISearchResults => {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState('');

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const performSearch = (e) => {
    e.preventDefault();
    const daysWithEvents = [];

    if (searchQuery) {
      initialData.forEach(id => {
        return Object.values(id).forEach((day) => day.forEach(d => {
          if (d.events.length) {
            daysWithEvents.push(d.events);
          }
        }));
      });
    }

    const filteredData = daysWithEvents.flat(1).filter((event) =>
      event.text.toLowerCase().includes(searchQuery.toLowerCase()) && !event.isReadOnly
    );
    setData(filteredData);
  };

  const resetSearch = () => {
    setSearchQuery('');
    setData([]);
  };

  return <ISearchResults>{
    data,
    searchQuery,
    updateSearchQuery,
    performSearch,
    resetSearch,
  };
};

export default useSearch;