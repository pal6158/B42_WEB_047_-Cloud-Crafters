import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventDetailsForm from './components/EventCreationWizard/EventDetailsForm';
import LocationPicker from './components/EventCreationWizard/LocationPicker';
import DateTimePicker from './components/EventCreationWizard/DateTimePicker';
import MediaUpload from './components/EventCreationWizard/MediaUpload';
import InviteesSelector from './components/EventCreationWizard/InviteesSelector';
import ConfirmationStep from './components/EventCreationWizard/ConfirmationStep';
import Navbar from './components/EventCreationWizard/pages/Home/Navbar/Navbar';
import Footer from './components/EventCreationWizard/Pages/Home/Footer/Footer';
import Home from './components/EventCreationWizard/pages/Home/Home';
import LoginPage from './components/EventCreationWizard/Pages/Home/LogIn/LoginPage';
import RegistrationPage from './components/EventCreationWizard/Pages/Home/RegistrationPage/RegistrationPage';
import About from './components/EventCreationWizard/Pages/Home/About/About';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path='/about' element={<About />} />
        <Route path="/event-details" element={<EventDetailsForm />} />
        <Route path="/location-picker" element={<LocationPicker />} />
        <Route path="/date-time-picker" element={<DateTimePicker />} />
        <Route path="/media-upload" element={<MediaUpload />} />
        <Route path="/invitees-selector" element={<InviteesSelector />} />
        <Route path="/confirmation-step" element={<ConfirmationStep />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;