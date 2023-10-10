import styled from '@emotion/styled';


export const PlusBtn = styled.div({
  cursor: 'pointer',
  color: 'black'
});

export const Events = styled.div({
  overflowY: 'auto',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem'
});

export const Day = styled('div')`
  width: 100%;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  border: solid 1px #D1C4E9;
  color: grey;
  background-color: #EBEBEB;
  
  &.currentMonth {
    color: black;
    background-color: #E2E6E9;
  }

  &.today {
    background-color: cornflowerblue;
  }
`;

export const Container = styled('div')`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Event = styled('textarea')`
  resize: none;
  width: 100%;
  cursor: pointer; 
  border: none;
  outline: none;
`;

export const EventContainer = styled('div')`
  display: flex;
  background-color: white;
`;