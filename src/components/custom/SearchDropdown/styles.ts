import styled from '@emotion/styled';

export const SearchDropdownForm = styled('form')`
  max-width: 45rem;
  margin: 0 auto;
  padding: 1.25px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const SearchInput = styled('input')`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-bottom: 0.75rem;
`;

export const SearchButton = styled('button')`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: .5rem 1rem;
  margin-right: .6rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const DropdownList = styled('ul')`
  list-style: none;
  position: absolute;
  background-color: white;
  padding: .5rem;
  width: 42rem;
  margin: 1rem;
  max-height: 20rem;
  overflow: auto;
`;

export const ListItem = styled('li')`
  padding: 5px;
  cursor: pointer;
  z-index: 10;
  background: #007bff;
  color: white;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.3s;
  border-radius: .25rem;
  margin-bottom: .2rem;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background-color: #f0f0f0;
    color: black;
  }
`;

export const NoResults = styled('p')`
  margin-top: 0.75rem; 
  color: #888;
`;