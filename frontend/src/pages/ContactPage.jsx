import React from 'react';
import ContactForm from '../components/ContactForm'; // Will be created later

function ContactPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ContactPage</h1>
      <ContactForm />
    </div>
  );
}

export default ContactPage;
