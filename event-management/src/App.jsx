import React, { useState } from 'react';
import EventDetailsForm from './components/EventCreationWizard/EventDetailsForm';
import LocationPicker from './components/EventCreationWizard/LocationPicker';
import DateTimePicker from './components/EventCreationWizard/DateTimePicker';
import MediaUpload from './components/EventCreationWizard/MediaUpload';
import InviteesSelector from './components/EventCreationWizard/InviteesSelector';
import ConfirmationStep from './components/EventCreationWizard/ConfirmationStep';

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
      {step === 1 && <EventDetailsForm formData={formData} setFormData={setFormData} nextStep={nextStep} />}
      {step === 2 && <LocationPicker formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <DateTimePicker formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && <MediaUpload nextStep={nextStep} prevStep={prevStep} />}
      {step === 5 && <InviteesSelector formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      {step === 6 && <ConfirmationStep formData={formData} prevStep={prevStep} submitForm={submitForm} />}
    </div>
  );
};

export default App;
