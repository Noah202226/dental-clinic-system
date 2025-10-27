// lib/db.js
import Dexie from "dexie";

const db = new Dexie("DentalClinicDB");

db.version(1).stores({
  // Patients (The primary record)
  patients: "++id, &patientId, &name, phone, email",
  // Appointments (Linked to the patient)
  appointments: "++id, patientId, date, time, status, notes",
  // Treatments/Procedures (A list of services offered)
  treatments: "++id, name, price",
  // Records (Linking patient to treatments/history)
  records: "++id, patientId, appointmentId, treatmentIds, totalFee, date",
});

export const { patients, appointments, treatments, records } = db;

export default db;
