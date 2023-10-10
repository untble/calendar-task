import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { IDay } from '../../interfaces/day';
import { format } from 'date-fns';
import { FiPlusCircle, FiMove } from 'react-icons/fi';
import { Container, Event, EventContainer, Events, PlusBtn } from './styles';
import { css } from '@emotion/css';
import { CalendarContext } from '../../../../context/CalendarContext';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {Day as DayWrapper} from './styles'

const Day: FC<IDay> = ({
   day,
   isFirstDayOfMonth,
   pageId,
   id,
   isLastDayOfMonth,
   events,
   month,
   year,
   isCurrentMonth,
   isToday,
   date,
   holidays,
 }): ReactElement => {
  const [showPlusBtn, setShowPlusBtn] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const currentDay = (isFirstDayOfMonth || isLastDayOfMonth) ?
    `${format(new Date(year, month), 'MMM')} ${day}` : day;

  const {
    updateEvent,
    createEvent,
  } = useContext(CalendarContext);

  useEffect(() => {
    const holiday = holidays?.find(d => d.date === date);
    if (holiday) {
      createEvent(id, holiday.name, setText, pageId, true);
    }
  }, [holidays]);

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <DayWrapper
          className={`${isCurrentMonth && "currentMonth"} ${isToday && "today"}`}
          onMouseEnter={() => setShowPlusBtn(true)}
          onMouseLeave={() => setShowPlusBtn(false)}
        >
          <Container>
            <span>
              {currentDay} {events.length > 0 && (<span className={css`color: grey`}>{events.length} {events.length === 1 ? 'event' : 'events'}</span>)}
            </span>
            {showPlusBtn && <PlusBtn>
              <FiPlusCircle onClick={() => createEvent(id, text, setText, pageId, false)} />
            </PlusBtn>}
          </Container>
          <Events ref={provided.innerRef} {...provided.droppableProps}>
            {events.map((event, index) => <Draggable
              key={event.id}
              draggableId={event.id}
              index={index}
              isDragDisabled={event.isReadOnly}>
                {(provided) => (
                  <div ref={provided.innerRef}
                       {...provided.draggableProps}
                       {...provided.dragHandleProps}
                  >
                      <EventContainer>
                        <Event
                          value={event.text}
                          readOnly={event.isReadOnly}
                          onChange={e => updateEvent(id, event.id, e.target.value, pageId)}
                          rows={5}
                        />
                        {!event.isReadOnly && <FiMove className={css`color: black`} size='1.25rem' />}
                      </EventContainer>
                  </div>
                )}
              </Draggable>,
            )}
          </Events>
          {provided.placeholder}
        </DayWrapper>
      )}
    </Droppable>
  );
};

export default Day;