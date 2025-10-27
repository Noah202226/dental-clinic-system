"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import useClinicStore from "@/app/stores/useClinicStore";
import AddPatientForm from "./AddPatientForm";

export default function PatientList({ isDetailView = false }) {
  const {
    patientsList = [],
    loadPatients,
    selectPatient,
    isLoading,
    selectedPatient,
  } = useClinicStore();

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadPatients();
  }, [loadPatients]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = patientsList.slice();

    if (q) list = list.filter((p) => (p.name || "").toLowerCase().includes(q));

    if (sortBy === "name") {
      list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    } else if (sortBy === "newest") {
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } else if (sortBy === "oldest") {
      list.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    }

    return list;
  }, [patientsList, query, sortBy]);

  if (isLoading) return <p>Loading patient data...</p>;

  return (
    <div className="flex flex-col h-full">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4 gap-3">
        <h2 className="text-2xl font-bold">
          Patients{" "}
          <span className="text-sm text-gray-500">({patientsList.length})</span>
        </h2>

        {/* ADD PATIENT */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              + New Patient
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
            </DialogHeader>
            <AddPatientForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* SEARCH + SORT */}
      <div className="flex gap-3 mb-4">
        <Input
          placeholder="Search patients..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Sort
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortBy("name")}>
              Name A–Z
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("newest")}>
              Newest
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("oldest")}>
              Oldest
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* PATIENT LIST */}
      <ul className="divide-y divide-gray-200 overflow-y-auto flex-1 rounded-lg border bg-white">
        {filtered.length === 0 ? (
          <li className="p-4 text-center text-gray-500">No patients found.</li>
        ) : (
          filtered.map((patient) => {
            const isActive = selectedPatient?.id === patient.id;
            return (
              <motion.li
                key={patient.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`p-3 hover:bg-gray-50 flex justify-between items-center cursor-pointer transition-colors ${
                  isActive
                    ? "bg-blue-50 border-l-4 border-blue-600 shadow-sm"
                    : ""
                }`}
                onClick={() => selectPatient(patient.id)}
              >
                <div>
                  <div className="font-medium text-blue-700">
                    {patient.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    ID: {patient.patientId}
                  </div>
                </div>

                <div className="text-xs text-gray-400">
                  {patient.phone ? patient.phone : "—"}
                </div>
              </motion.li>
            );
          })
        )}
      </ul>
    </div>
  );
}
