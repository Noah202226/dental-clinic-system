// components/SidebarNav.js

"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function SidebarNav() {
  return (
    // Sidebar container defined in the previous HomePage code
    <aside
      className="w-16 md:w-64 bg-white border-r shadow-lg flex flex-col transition-all duration-300 
                       hidden sm:flex" // Hides on small devices, expands on medium/large
    >
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-blue-700 md:block hidden">
          Clinic
        </h1>
        <span className="text-2xl text-blue-700 md:hidden">🦷</span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-grow p-4 space-y-2">
        <Button variant="ghost" className="w-full justify-start text-left">
          <span className="md:inline hidden">Patients</span>
          <span className="md:hidden">👥</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-left">
          <span className="md:inline hidden">Schedule View</span>
          <span className="md:hidden">📅</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-left">
          <span className="md:inline hidden">Billing</span>
          <span className="md:hidden">💵</span>
        </Button>

        {/* Add more navigation links here */}
      </nav>
    </aside>
  );
}
