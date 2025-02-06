import React, { useState } from 'react';

import EventDetailsForm from './components/EventCreationWizard/EventDetailsForm';
import LocationPicker from './components/EventCreationWizard/LocationPicker';
import DateTimePicker from './components/EventCreationWizard/DateTimePicker';
import MediaUpload from './components/EventCreationWizard/MediaUpload';
import InviteesSelector from './components/EventCreationWizard/InviteesSelector';
import ConfirmationStep from './components/EventCreationWizard/ConfirmationStep';
import Navbar from './components/EventCreationWizard/pages/Home/Navbar/Navbar';
import Footer from './components/EventCreationWizard/Pages/Home/Footer/Footer';
import Home from './components/EventCreationWizard/pages/Home/Home';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    date: '',
    time: '',
    invitees: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const submitForm = () => alert('Event Created Successfully!');

  return (
    <div>
      {/* Navbar and Footer are always visible */}
      <Navbar />
      
      {/* Conditionally render each component based on the current step */}
      {step === 0 && <Home />}
      {step === 1 && <EventDetailsForm formData={formData} setFormData={setFormData} nextStep={nextStep} />}
      {step === 2 && <LocationPicker formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <DateTimePicker formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && <MediaUpload nextStep={nextStep} prevStep={prevStep} />}
      {step === 5 && <InviteesSelector formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 6 && <ConfirmationStep formData={formData} prevStep={prevStep} submitForm={submitForm} />}


      <Footer />

     
    </div>
  );
};

export default App;
