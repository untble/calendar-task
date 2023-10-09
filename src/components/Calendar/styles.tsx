import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Header = styled('header')`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 1.25rem;
`;

export const Month = styled('div')`
  margin: auto;
  width: fit-content;
  display: flex;
  justify-content: space-between;
  color: black;
  font-weight: 700;
`;

export const UpDownWrapper = styled('div')`
  display: flex;
  gap: .25rem;
`;

export const Calendar = styled('div')`
  width: 100%;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(7, 1fr);
  grid-column: 1 / 7;
  padding: 1rem;
  overflow: hidden;
`;

export const WeekDay = styled('div')`
  text-align:center;
  color: black;
  border-radius:1rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;
`;

export const arrowButton = css`
  width: 2.25rem;
  height: 2rem;
  color: #989898;
  border-radius: 3px;
  background-color: #E2E6E9;
  cursor: pointer;
`;

export const DownloadButton = styled('button')`
  padding: .3rem 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: .5rem;
  background: transparent;
  border-radius: .5rem;
  transition: 0.5s;
  border: 1px solid darkkhaki;
  
  &:hover {
    background-color: grey;
  }
`