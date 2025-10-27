// components/AddPatientForm.js

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useClinicStore from "@/app/stores/useClinicStore"; // Import your store

// This component receives the function to close the dialog as a prop
export default function AddPatientForm({ onClose }) {
  const addPatient = useClinicStore((state) => state.addPatient);

  // Local state for form inputs
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Name and Phone are required!");
      return;
    }

    const newPatientData = {
      name: name,
      phone: phone,
      email: email,
      // Assign a simple unique ID for display/linking (e.g., initials + random number)
      patientId: `${name.substring(0, 3).toUpperCase()}-${Date.now()
        .toString()
        .slice(-4)}`,
    };

    // Call the Zustand action which saves to Dexie
    await addPatient(newPatientData);

    // Clear form and close modal
    setName("");
    setPhone("");
    setEmail("");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email (Optional)</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full">
        Save Patient Record
      </Button>
    </form>
  );
}
