'use client'; // This tells Next.js this component runs in the browser (client-side)

// Import useState from React - this is the hook we use to manage state (data that can change)
import { useState } from 'react';
// Import Link from Next.js for navigation between pages
import Link from 'next/link';

// This is our main component that will display on the page
export default function ClickCounterApp() {
  // useState is a React hook that lets us create state variables
  // const [variable, functionToUpdateVariable] = useState(initialValue)
  // clickCount = the current value (starts at 0)
  // setClickCount = the function we call to update clickCount
  const [clickCount, setClickCount] = useState(0);

  // This function runs when the user clicks the button
  // It increases the click count by 1
  const handleButtonClick = () => {
    // setClickCount updates the state with a new value
    // clickCount + 1 means: take the current value and add 1 to it
    setClickCount(clickCount + 1);
  };

  // This function resets the counter back to 0
  // Great for starting over!
  const handleReset = () => {
    setClickCount(0);
  };

  // JSX (JavaScript XML) - this is what React displays on the page
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* Navigation link to the React & Next.js manual */}
      <Link
        href="/manual"
        className="absolute top-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        Read Manual
      </Link>

      {/* Container div that holds everything centered on the page */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full">
        
        {/* Title - tells the user what this app does */}
        <h1 className="text-4xl font-bold text-center text-indigo-600 mb-2">
          Click Counter
        </h1>
        
        {/* Subtitle - friendly explanation */}
        <p className="text-center text-gray-600 text-sm mb-8">
          Click the button below to count how many times you click!
        </p>

        {/* Display the current click count */}
        {/* The curly braces {} let us insert JavaScript values into JSX */}
        <div className="bg-indigo-50 rounded-lg p-8 mb-6 text-center">
          <p className="text-gray-600 text-sm font-medium mb-2">Current Count:</p>
          <p className="text-6xl font-bold text-indigo-600">
            {clickCount}
          </p>
        </div>

        {/* The main button that users click */}
        <button
          // onClick is an event handler - it runs our function when clicked
          onClick={handleButtonClick}
          // className applies Tailwind CSS styling to make it look nice
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 mb-4 text-lg"
        >
          Click Me! 🎯
        </button>

        {/* Reset button - lets user start counting from 0 again */}
        <button
          onClick={handleReset}
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-lg transition-all duration-200 text-base"
        >
          Reset Counter ↻
        </button>

        {/* Fun fact section - shows some info based on the click count */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            {/* This is a conditional - different messages based on how many clicks */}
            {clickCount === 0 && '👋 Click the button to start counting!'}
            {clickCount > 0 && clickCount < 5 && '🚀 You\'re getting started!'}
            {clickCount >= 5 && clickCount < 10 && '⭐ Great job! Keep clicking!'}
            {clickCount >= 10 && clickCount < 20 && '🔥 You\'re on a roll!'}
            {clickCount >= 20 && '🏆 Amazing! You\'re a clicking champion!'}
          </p>
        </div>
      </div>
    </main>
  );
}
