"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import useClinicStore from "@/app/stores/useClinicStore";
import SidebarNav from "./components/SidebarNav";
import PatientList from "./components/PatientList";
import PatientDetail from "./components/PatientDetail";

export default function HomePage() {
  const selectedPatient = useClinicStore((state) => state.selectedPatient);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* SIDEBAR */}
      <SidebarNav />

      {/* MAIN */}
      <main className="flex-1 overflow-auto p-4 md:p-8">
        <header className="mb-6">
          <h2 className="text-3xl font-extrabold text-gray-800">
            Patient Management
          </h2>
          <p className="text-gray-500">
            Manage patient records and clinical activity.
          </p>
        </header>

        <Card className="h-[90%] p-0 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            {/* LEFT: Patient List */}
            <div className="md:col-span-1 border-r overflow-y-auto p-6">
              <PatientList />
            </div>

            {/* RIGHT: Detail (occupies 2 cols on md+) */}
            <div className="md:col-span-2 overflow-y-auto p-6">
              {/* when no patient is selected we show a friendly placeholder */}
              {selectedPatient ? (
                <PatientDetail />
              ) : (
                <div className="h-full flex flex-col justify-center items-center text-gray-400">
                  <p className="text-lg font-medium">No patient selected</p>
                  <p className="mt-2">
                    Select a patient from the left to view details.
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
