"use client";

import { useState } from 'react';

interface Snowboard {
  serial_number: number;
  make: string;
  model: string;
  size: number;
  email: string | null;
  claimed: boolean;
  found: boolean;
  found_by: string | null;
}

const MainForm = () => {
  const [serial, setSerial] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [size, setSize] = useState('');
  const [email, setEmail] = useState('');
  const [snowboard, setSnowboard] = useState<Snowboard | null>(null);
  const [found, setFound] = useState<boolean | null>(null); // Track if snowboard is found
  const [showSearch, setShowSearch] = useState(true); // Track if the search button should be shown
  const [isSerialDisabled, setIsSerialDisabled] = useState(false); // Track if the serial number field should be disabled

  const handleSerialSearch = async () => {
    const response = await fetch(`/api/snowboard/${serial}`);
    if (response.status === 200) {
      const data: Snowboard = await response.json();
      setSnowboard(data);
      setFound(true); // Set found state
      setIsSerialDisabled(true); // Disable the serial number field
    } else {
      setSnowboard(null);
      setFound(false); // Reset found state
      setIsSerialDisabled(true); // Disable the serial number field
    }
    setShowSearch(false); // Hide the search button
  };

  const handleRegister = async () => {
    await fetch('/api/snowboard/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serial_number: parseInt(serial), make, model, size: parseInt(size), email }),
    });
    alert('Snowboard registered and claimed successfully');
  };

  const handleClaim = async () => {
    await fetch('/api/snowboard/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serial_number: parseInt(serial), email }),
    });
    alert('Snowboard claimed successfully');
  };

  const handleFound = async () => {
    await fetch('/api/snowboard/found', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serial_number: parseInt(serial), found_by: email }),
    });
    alert(`Notification sent to ${snowboard?.email || 'the registered owner'}`);
  };

  // Handle input change for serial number to allow only numeric characters
  const handleSerialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setSerial(value);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Snowboard Registry</h1>
      <input
        type="text"
        className="border p-2 mb-4 w-full"
        placeholder="Serial Number"
        value={serial}
        onChange={handleSerialChange}
        disabled={isSerialDisabled} // Disable the serial number field if needed
      />
      {showSearch && (
        <button className="bg-white text-black p-2 mb-4" onClick={handleSerialSearch}>Search</button>
      )}

      {found === false && (
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
          <button className="bg-white text-black p-2" onClick={handleRegister} disabled={!email}>Register & Claim</button>
          <button className="bg-white text-black p-2 ml-2" onClick={handleFound} disabled={!email}>Found</button>
        </>
      )}

      {found === true && snowboard && (
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
          {snowboard.claimed ? (
            <>
              <button className="bg-white text-black p-2" onClick={handleFound} disabled={!email}>Found</button>
            </>
          ) : (
            <>
              <button className="bg-white text-black p-2" onClick={handleClaim} disabled={!email}>Claim</button>
              <button className="bg-white text-black p-2 ml-2" onClick={handleFound} disabled={!email}>Found</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MainForm;
