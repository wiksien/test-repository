"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { executeFunction } from "@/utils/function.js";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [message, setMessage] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.style.background = "linear-gradient(45deg, #000000, #1a1a1a)";
    document.body.style.overflow = "hidden";
    setIsVisible(true);
    return () => {
      document.body.style.background = "";
      document.body.style.overflow = "";
    };
  }, []);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const result = await executeFunction();
      setMessage(result);
      setShowResult(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 text-white relative overflow-hidden">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: i * 0.1, duration: 1 }}
                className="absolute rounded-full mix-blend-screen filter blur-3xl animate-blob"
                style={{
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, ${Math.random() * 30 + 40}%)`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${Math.random() * 600 + 200}px`,
                  height: `${Math.random() * 600 + 200}px`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${Math.random() * 30 + 20}s`,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="z-10"
          >
            <Card className="w-[600px] mb-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-4xl font-bold">QuantumLeap AI</CardTitle>
                <CardDescription className="text-xl text-white">Revolutionizing the Future of Technology</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">Harness the power of quantum computing and AI to solve humanity&apos;s greatest challenges.</p>
                <ul className="list-disc list-inside text-sm space-y-2">
                  <li>Accelerate scientific discoveries</li>
                  <li>Optimize global supply chains</li>
                  <li>Revolutionize financial modeling</li>
                  <li>Combat climate change with unprecedented efficiency</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleClick} 
                  disabled={isLoading}
                  className="w-full bg-white text-indigo-900 hover:bg-gray-200 transition-colors duration-300 text-lg font-bold"
                >
                  {isLoading ? 'Initializing Quantum Core...' : 'Unleash the Power of QuantumLeap'}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="z-10"
          >
            <Card className="w-[600px] bg-gradient-to-r from-cyan-900 via-blue-900 to-indigo-900 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">QuantumLeap Results</CardTitle>
                <CardDescription className="text-lg text-white">Transforming Data into World-Changing Insights</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm font-mono bg-black bg-opacity-50 p-4 rounded">
                  {message}
                </pre>
              </CardContent>
              <CardFooter className="text-sm italic">
                Empowering visionaries to shape the future, one quantum computation at a time.
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
