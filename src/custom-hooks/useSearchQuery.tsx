import { useState } from 'react';

const useSearchQuery = (
  initial: string = ''
): { searchQuery: string; handleSearchQuery: (val: string) => void } => {
  const [searchQuery, setSearchQuery] = useState<string>(initial);
  const handleSearchQuery = (value: string) => {
    setSearchQuery(value);
  };
  return {
    searchQuery,
    handleSearchQuery,
  };
};

export default useSearchQuery;
