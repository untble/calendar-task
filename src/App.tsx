import './App.css'
import Calendar from "./components/Calendar/Calendar";
import { CalendarContextProvider } from './context/CalendarContext';

function App() {
  return (
    <>
      <CalendarContextProvider>
        <Calendar />
      </CalendarContextProvider>
    </>
  )
}

export default App
