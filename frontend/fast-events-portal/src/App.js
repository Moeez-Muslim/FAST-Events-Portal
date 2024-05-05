import './App.css';

import EventsGrid from './Components/Events/EventsGrid';
import NavComp from './Components/Navs/NavComp';
import MyEvents from './Components/MyEvents/MyEvents';
import LogIn from "./Components/Register/LogIn"
import OrganizerGrid from './Components/Organizer/OrganizerGrid';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventDetails from './Components/Events/EventDetails';
import AddEvent from './Components/Events/AddEvent';
import SignUp from './Components/Register/SignUp';


function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route exact path='/' element={<LogIn/>} />
            <Route path='/events' element={<EventsGrid/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/my-events' element={<MyEvents/>} />
            <Route path='/organizer' element={<OrganizerGrid/>} />
            <Route path='/events/details/:id' element={<EventDetails/>} />
            <Route path='/create-event' element={<AddEvent/>} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
