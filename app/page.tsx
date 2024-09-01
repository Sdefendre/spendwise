"use client";

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mountain } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Globe() {
  const points = useRef()

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.1
    }
  })

  const particlesPosition = React.useMemo(() => {
    const positions = new Float32Array(10000 * 3)
    const radius = 2

    for (let i = 0; i < 10000; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360)
      const phi = THREE.MathUtils.randFloatSpread(360)

      const x = radius * Math.sin(theta) * Math.cos(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(theta)

      positions.set([x, y, z], i * 3)
    }

    return positions
  }, [])

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [view, setView] = useState("daily");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex flex-col min-h-[100dvh] ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center">
          <Mountain className="h-6 w-6" />
          <span className="sr-only">Steve's Budget</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          {/* ... navigation links ... */}
        </nav>
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded-lg ml-4 ${isDarkMode ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <main className="flex-1">
        <section className="w-full h-[calc(100vh-3.5rem)] bg-black">
          <Canvas camera={{ position: [0, 0, 6] }}>
            <ambientLight intensity={0.5} />
            <Globe />
          </Canvas>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                Steve's Budget
              </h1>
              <p className="mx-auto max-w-[600px] text-muted-foreground mt-4 text-lg md:text-xl">
                Manage your spending with ease and precision
              </p>
              <div className="mt-8">
                <Button className="bg-white text-black hover:bg-gray-200">Get Started</Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Budget view buttons */}
        <div className="mb-8 mt-8 text-center">
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

        {/* Budget information grid */}
        <div className={`w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
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

        {/* Features section */}
        <section className={`w-full py-12 md:py-24 lg:py-32 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <Image
                src="/placeholder.svg?height=310&width=550"
                width={550}
                height={310}
                alt="Dashboard preview"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Spend smarter, not harder
                  </h2>
                  <p className={`max-w-[600px] ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed`}>
                    Steve's Budget gives you real-time insights into your spending habits, helping you make informed financial decisions.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sign-up section */}
        <section className={`w-full py-12 md:py-24 lg:py-32 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Start managing your finances today</h2>
                <p className={`mx-auto max-w-[600px] ${isDarkMode ? 'text-gray-300' : 'text-gray-500'} md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed`}>
                  Join thousands of users who have taken control of their spending with Steve's Budget.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className={`flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>© 2023 Steve's Budget. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className={`text-xs hover:underline underline-offset-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} href="#">
            Terms of Service
          </Link>
          <Link className={`text-xs hover:underline underline-offset-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
