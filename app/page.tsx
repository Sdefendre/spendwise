"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [view, setView] = useState("daily");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-start p-24 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Steve's Budget</h1>
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded-lg ${isDarkMode ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      
      <div className="mb-8">
        <button
          onClick={() => setView("daily")}
          className={`px-4 py-2 rounded-lg mr-2 ${view === "daily" ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
        >
          Daily View
        </button>
        <button
          onClick={() => setView("monthly")}
          className={`px-4 py-2 rounded-lg mr-2 ${view === "monthly" ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
        >
          Monthly View
        </button>
        <button
          onClick={() => setView("yearly")}
          className={`px-4 py-2 rounded-lg ${view === "yearly" ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
        >
          Yearly View
        </button>
      </div>

      <div className={`w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
        <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl font-semibold mb-4">Total Balance</h2>
          <p className="text-3xl font-bold text-green-600">$5,280.00</p>
        </div>
        
        <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl font-semibold mb-4">
            {view === "daily" ? "Daily" : view === "monthly" ? "Monthly" : "Yearly"} Budget
          </h2>
          <p className="text-3xl font-bold text-blue-600">
            {view === "daily" ? "$100.00" : view === "monthly" ? "$3,000.00" : "$36,000.00"}
          </p>
        </div>
        
        <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>Groceries</span>
              <span className="text-red-500">-$120.50</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Salary</span>
              <span className="text-green-500">+$3,000.00</span>
            </li>
            <li className="flex justify-between items-center">
              <span>Utilities</span>
              <span className="text-red-500">-$200.00</span>
            </li>
          </ul>
        </div>
        
        <div className={`p-6 rounded-lg shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl font-semibold mb-4">Savings Goal</h2>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  60%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div style={{ width: "60%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
            </div>
          </div>
        </div>
      </div>
      
      <button className={`mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${isDarkMode ? 'hover:bg-blue-500' : 'hover:bg-blue-700'}`}>
        Add New Transaction
      </button>
    </main>
  );
}
