import './App.css';
import EventsGrid from './Components/Events/EventsGrid';
import NavComp from './Components/Navs/NavComp';
import MyEvents from './Components/MyEvents/MyEvents';
import LogIn from "./Components/Register/LogIn"
import OrganizerDashboard from './Components/Organizer/OrganizerDashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventDetails from './Components/Events/EventDetails';
import AddEvent from './Components/Events/AddEvent';


function App() {
  const event = {
    "title":"Rock Concert",
    "description":"An amazing rock concert featuring top bands.",
    "imageURL":"https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "dateTime":"2024-06-20T19:00:00.000Z",
    "ticketsAvailable":150,"venue":"Madison Square Garden, New York",
    "registered":["123456789","987654321"],
    "organizers":["John Doe","Jane Smith"]
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<LogIn/>} />
          <Route path='/events' element={<EventsGrid/>} />
          <Route path='/my-events' element={<MyEvents/>} />
          <Route path='/organizer' element={<OrganizerDashboard/>} />
          <Route path='/events/details/:id' element={<EventDetails/>} />
        </Routes>
      </div>
    </BrowserRouter>
    //<EventsGrid/>
  );
}

export default App;
