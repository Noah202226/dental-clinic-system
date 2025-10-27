"use client";

import React, { useEffect, useMemo, useState } from "react";
import useClinicStore from "@/app/stores/useClinicStore";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

// Simple skeleton component
function SkeletonCard() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-8 w-3/5 bg-gray-200 rounded" />
      <div className="h-4 w-1/3 bg-gray-200 rounded" />
      <div className="mt-4 h-32 bg-gray-200 rounded" />
    </div>
  );
}

export default function PatientDetail() {
  const selectedPatient = useClinicStore((s) => s.selectedPatient);
  const selectPatient = useClinicStore((s) => s.selectPatient);

  // Track tab state
  const [tab, setTab] = useState("overview"); // overview | appointments | history | billing

  // Small transition skeleton when switching patients
  const [isSwitching, setIsSwitching] = useState(false);
  useEffect(() => {
    // whenever selectedPatient changes, show skeleton momentarily
    if (!selectedPatient) return;
    setIsSwitching(true);
    const t = setTimeout(() => setIsSwitching(false), 220);
    return () => clearTimeout(t);
  }, [selectedPatient?.id]);

  if (!selectedPatient) {
    return <div className="text-center p-8">No patient selected.</div>;
  }

  const handleBack = () => selectPatient(null);

  // computed details for tabs (replace with real derived values)
  const appointments = useMemo(
    () => selectedPatient.appointments || [],
    [selectedPatient]
  );
  const history = useMemo(
    () => selectedPatient.history || [],
    [selectedPatient]
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedPatient.id}
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="relative"
      >
        {/* Sticky Back + Floating Appointment Button */}
        <div className="sticky top-0 z-10 bg-white pt-2 pb-4">
          <div className="flex items-center justify-between">
            <Button onClick={handleBack} variant="outline" className="mb-2">
              ← Back to Patient List
            </Button>

            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setTab("overview")}>
                Overview
              </Button>
              <Button variant="ghost" onClick={() => setTab("appointments")}>
                Appointments
              </Button>
              <Button variant="ghost" onClick={() => setTab("history")}>
                History
              </Button>
              <Button variant="ghost" onClick={() => setTab("billing")}>
                Billing
              </Button>
            </div>
          </div>
        </div>

        <Card className="mt-3">
          <CardHeader>
            <CardTitle className="text-3xl text-blue-700">
              {selectedPatient.name}
            </CardTitle>
            <p className="text-sm text-gray-500">
              Record ID: {selectedPatient.patientId}
            </p>
          </CardHeader>

          <CardContent>
            {isSwitching ? (
              <SkeletonCard />
            ) : (
              <>
                {tab === "overview" && (
                  <div className="space-y-4">
                    <div className="border-b pb-3">
                      <h4 className="font-semibold text-lg">Contact Details</h4>
                      <p>📞 Phone: {selectedPatient.phone || "N/A"}</p>
                      <p>✉️ Email: {selectedPatient.email || "N/A"}</p>
                    </div>

                    <div className="flex space-x-3">
                      <Button variant="default">
                        Schedule New Appointment
                      </Button>
                      <Button variant="secondary">
                        View Medical History ({history.length})
                      </Button>
                    </div>
                  </div>
                )}

                {tab === "appointments" && (
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Appointments</h4>
                    {appointments.length === 0 ? (
                      <p className="text-gray-500">
                        No upcoming appointments recorded.
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {appointments.map((a) => (
                          <li key={a.id} className="p-3 border rounded">
                            {a.summary || "Appointment"}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {tab === "history" && (
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      Medical History
                    </h4>
                    {history.length === 0 ? (
                      <p className="text-gray-500">
                        No medical history available.
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {history.map((h, i) => (
                          <li key={i} className="p-3 border rounded">
                            {h.note || "History item"}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {tab === "billing" && (
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Billing</h4>
                    <p className="text-gray-500">
                      Billing details go here (placeholder).
                    </p>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Floating New Appointment CTA */}
        <div className="fixed right-6 bottom-6 z-50">
          <button
            onClick={() =>
              alert(`Create appointment for ${selectedPatient.name}`)
            }
            className="px-4 py-3 rounded-full shadow-lg bg-blue-600 text-white hover:scale-105 transition-transform"
            title="New Appointment"
          >
            + New Appointment
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
