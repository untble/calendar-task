import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import styles from '../../Calendar.module.scss';
import { IDay } from '../../interfaces/IDay';
import { format } from 'date-fns';
import { FiPlusCircle } from 'react-icons/fi';
import { Event, Events, PlusBtn } from './styles';
import { css } from '@emotion/css';
import { CalendarContext } from '../../../../context/CalendarContext';

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
  holidays
}): ReactElement => {
  const [showPlusBtn, setShowPlusBtn] = useState<boolean>(false);
  const [text, setText] = useState<string>('');
  const { updateEvent, createEvent } = useContext(CalendarContext);
  const currentDay = (isFirstDayOfMonth || isLastDayOfMonth) ?
    `${format(new Date(year, month), 'MMM')} ${day}` : day;


  useEffect(() => {
    const holiday = holidays?.find(d => d.date === date);
    if (holiday) {
      createEvent(id, holiday.name, setText, pageId, true);
    }
}, [holidays]);

  return (
    <div
      className={`day ${styles.day} ${isCurrentMonth && styles.currentMonth} ${isToday && styles.today}`}
      onMouseEnter={() => setShowPlusBtn(true)}
      onMouseLeave={() => setShowPlusBtn(false)}
    >
      <div className={css`display: flex;
        justify-content: space-between;
        width: 100%`}
      >
        <span>{currentDay}</span>
        {showPlusBtn && <PlusBtn>
          <FiPlusCircle onClick={() => createEvent(id, text, setText, pageId, false)} />
        </PlusBtn>}
      </div>
      <Events>
        {events.map(event => <Event key={event.id}>
            <textarea
              value={event.text}
              readOnly={event.isReadOnly}
              onChange={e => updateEvent(id, event.id, e.target.value, pageId)}
              className={css`resize: none; width: 100%; cursor: pointer`}
            />
          </Event>
        )}
      </Events>
    </div>
  );
};

export default Day;