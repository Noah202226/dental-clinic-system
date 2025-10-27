// store/useClinicStore.js
import { create } from "zustand";
import { patients, appointments, records } from "@/lib/db";

const useClinicStore = create((set, get) => ({
  // --- STATE ---
  patientsList: [],
  selectedPatient: null,
  isLoading: false,

  // --- ACTIONS ---

  // 1. Load all patients
  loadPatients: async () => {
    set({ isLoading: true });
    try {
      const allPatients = await patients.toArray();
      set({ patientsList: allPatients });
    } catch (error) {
      console.error("Error loading patients:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  // 2. Add a new patient
  addPatient: async (patientData) => {
    try {
      const id = await patients.add(patientData);
      const newPatient = { ...patientData, id };

      set((state) => ({
        patientsList: [newPatient, ...state.patientsList],
      }));
      return id; // Return ID for navigation/selection
    } catch (error) {
      console.error("Failed to add patient:", error);
    }
  },

  // 3. Select a patient for viewing/editing their record
  selectPatient: async (id) => {
    const patient = get().patientsList.find((p) => p.id === id);
    set({ selectedPatient: patient });
    // In a full system, you would also load their appointments and records here
  },

  // 4. Create an Appointment
  createAppointment: async (apptData) => {
    try {
      const id = await appointments.add(apptData);
      console.log(`Appointment created: ${id}`);
      // Optional: Add logic to update local patient state with new appt
    } catch (error) {
      console.error("Failed to schedule appointment:", error);
    }
  },
}));

export default useClinicStore;
