"use client";

import { useState } from 'react';

interface Snowboard {
  serial_number: string;
  make: string;
  model: string;
  size: number;
  email: string | null;
}

const MainForm = () => {
  const [serial, setSerial] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [size, setSize] = useState('');
  const [email, setEmail] = useState('');
  const [snowboard, setSnowboard] = useState<Snowboard | null>(null);
  const [notFound, setNotFound] = useState(false); // Track if snowboard is not found
  const [showSubmit, setShowSubmit] = useState(true); // Track if the submit button should be shown
  const [isSerialDisabled, setIsSerialDisabled] = useState(false); // Track if the serial number field should be disabled

  const handleSerialSubmit = async () => {
    const response = await fetch(`/api/snowboard/${serial}`);
    if (response.status === 200) {
      const data: Snowboard = await response.json();
      setSnowboard(data);
      setNotFound(false); // Reset not found state
      setIsSerialDisabled(true); // Disable the serial number field
    } else {
      setSnowboard(null);
      setNotFound(true); // Set not found state
    }
    setShowSubmit(false); // Hide the submit button
  };

  const handleRegister = async () => {
    await fetch('/api/snowboard/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serial_number: serial, make, model, size: parseInt(size), email }),
    });
    alert('Snowboard registered successfully');
  };

  const handleUpdateEmail = async () => {
    await fetch('/api/snowboard/updateEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serial_number: serial, email }),
    });
    alert('Email updated successfully');
  };

  const handleFound = async () => {
    if (snowboard?.email) {
      await fetch('/api/snowboard/found', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serial_number: serial }),
      });
      alert(`Notification sent to ${snowboard.email}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register or Find Snowboard</h1>
      <input
        type="text"
        className="border p-2 mb-4 w-full"
        placeholder="Serial Number"
        value={serial}
        onChange={(e) => setSerial(e.target.value)}
        disabled={isSerialDisabled} // Disable the serial number field if needed
      />
      {showSubmit && (
        <button className="bg-blue-500 text-white p-2 mb-4" onClick={handleSerialSubmit}>Submit</button>
      )}
      
      {notFound && (
        <>
          <input
            type="text"
            className="border p-2 mb-4 w-full"
            placeholder="Make"
            value={make}
            onChange={(e) => setMake(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 mb-4 w-full"
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
          <input
            type="number"
            className="border p-2 mb-4 w-full"
            placeholder="Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
          <input
            type="email"
            className="border p-2 mb-4 w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-blue-500 text-white p-2" onClick={handleRegister}>Register</button>
        </>
      )}

      {snowboard && (
        <>
          <input
            type="text"
            className="border p-2 mb-4 w-full"
            placeholder="Make"
            value={snowboard.make}
            disabled
          />
          <input
            type="text"
            className="border p-2 mb-4 w-full"
            placeholder="Model"
            value={snowboard.model}
            disabled
          />
          <input
            type="number"
            className="border p-2 mb-4 w-full"
            placeholder="Size"
            value={snowboard.size}
            disabled
          />
          <input
            type="email"
            className="border p-2 mb-4 w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {snowboard.email ? (
            <button className="bg-blue-500 text-white p-2" onClick={handleFound} disabled={!email}>Found</button>
          ) : (
            <>
              <button className="bg-blue-500 text-white p-2" onClick={handleUpdateEmail} disabled={!email}>Register</button>
              <button className="bg-blue-500 text-white p-2 ml-2" onClick={handleFound} disabled={!email}>Found</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MainForm;
