import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import EApp from './components/EApp';
import CreateEvent from './components/createevent';
import IndividualEvent from './components/individualDisplay';
import Signup from './components/Signup';
import Login from './components/Login';
import EditDetails from './components/editDetails';
import Home from './components/Home';
import Footer from './components/Footer'; // Import Footer
import About from './components/About';

function App() {
  return (
      <AuthProvider>  {/* Wrap the entire app with AuthProvider */}
         <Navbar/>{/* Include the navbar here to ensure it's available across all routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <EApp />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-event"
            element={
              <PrivateRoute>
                <CreateEvent />
              </PrivateRoute>
            }
          />
          <Route path="/event/:id" element={<IndividualEvent />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editdetails/:_id" element={<EditDetails />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer /> {/* Include Footer here to display it across all routes */}
      </AuthProvider>
  );
}

export default App;
