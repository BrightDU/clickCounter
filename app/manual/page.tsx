'use client';

import React from "react"

import { useState } from 'react';

export default function ManualPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  const Section = ({ 
    id, 
    title, 
    children 
  }: { 
    id: string; 
    title: string; 
    children: React.ReactNode 
  }) => (
    <div className="mb-8 border-l-4 border-indigo-600 pl-6 py-4">
      <button
        onClick={() => toggleSection(id)}
        className="flex items-center justify-between w-full text-left"
      >
        <h2 className="text-2xl font-bold text-indigo-600 hover:text-indigo-700">
          {title}
        </h2>
        <span className="text-xl text-indigo-600">
          {expandedSection === id ? '−' : '+'}
        </span>
      </button>
      {expandedSection === id && (
        <div className="mt-4 text-gray-700 leading-relaxed space-y-4">
          {children}
        </div>
      )}
    </div>
  );

  const CodeBlock = ({ code, language = 'jsx' }: { code: string; language?: string }) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono my-4">
      <code>{code}</code>
    </pre>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">React & Next.js Manual</h1>
          <p className="text-xl text-indigo-100">
            A Comprehensive Guide for Beginners: Understanding React Fundamentals and Next.js
          </p>
          <p className="text-sm text-indigo-200 mt-4">
            Created: January 2026 | Version 1.0
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Table of Contents */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">Table of Contents</h2>
          <ol className="space-y-2 text-indigo-600">
            <li className="cursor-pointer hover:text-indigo-700">1. What is React?</li>
            <li className="cursor-pointer hover:text-indigo-700">2. React Fundamentals</li>
            <li className="cursor-pointer hover:text-indigo-700">3. JSX: JavaScript XML</li>
            <li className="cursor-pointer hover:text-indigo-700">4. Components</li>
            <li className="cursor-pointer hover:text-indigo-700">5. Props: Passing Data</li>
            <li className="cursor-pointer hover:text-indigo-700">6. State: Managing Data</li>
            <li className="cursor-pointer hover:text-indigo-700">7. Hooks: useState & useEffect</li>
            <li className="cursor-pointer hover:text-indigo-700">8. Event Handling</li>
            <li className="cursor-pointer hover:text-indigo-700">9. Conditional Rendering</li>
            <li className="cursor-pointer hover:text-indigo-700">10. Lists and Keys</li>
            <li className="cursor-pointer hover:text-indigo-700">11. What is Next.js?</li>
            <li className="cursor-pointer hover:text-indigo-700">12. Next.js vs React</li>
            <li className="cursor-pointer hover:text-indigo-700">13. Routing in Next.js</li>
          </ol>
        </div>

        {/* Introduction */}
        <Section id="intro" title="What is React?">
          <p>
            React is a JavaScript library created by Facebook for building user interfaces (UIs) with reusable components. 
            It makes creating interactive websites easier and faster by letting you break your UI into small, manageable pieces.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 my-4">
            <strong>Simple Definition:</strong> React helps you build interactive websites where the page updates instantly 
            without reloading, making the experience smooth and responsive for users.
          </div>
          <h3 className="text-lg font-semibold text-indigo-600 mt-6 mb-3">Why React?</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Reusable Components:</strong> Write code once, use it many times</li>
            <li><strong>Fast Updates:</strong> Only changes what needs to change (Virtual DOM)</li>
            <li><strong>Easy to Learn:</strong> Uses JavaScript you already know</li>
            <li><strong>Large Community:</strong> Lots of tutorials, libraries, and help available</li>
            <li><strong>Component-Based:</strong> Organize your code into small, manageable pieces</li>
          </ul>
        </Section>

        <Section id="fundamentals" title="React Fundamentals">
          <p>
            React is built on a few core ideas. Understanding these will make everything else click into place.
          </p>
          <h3 className="text-lg font-semibold text-indigo-600 mt-6 mb-3">1. The Virtual DOM</h3>
          <p>
            React creates a virtual copy of your website in memory. When something changes, React updates the virtual version first, 
            figures out what changed, and then updates only those specific parts on the actual page. This makes websites faster.
          </p>
          <h3 className="text-lg font-semibold text-indigo-600 mt-6 mb-3">2. One-Way Data Flow</h3>
          <p>
            Data flows from parent to child components. This makes your code predictable and easier to debug.
          </p>
          <h3 className="text-lg font-semibold text-indigo-600 mt-6 mb-3">3. Declarative Programming</h3>
          <p>
            Instead of telling React "how" to update the UI, you tell it "what" it should look like. 
            React figures out how to make it happen. This is much easier than manual DOM manipulation.
          </p>
        </Section>

        <Section id="jsx" title="JSX: JavaScript XML">
          <p>
            JSX lets you write HTML-like code directly in JavaScript. It looks like HTML but is actually JavaScript.
          </p>
          <CodeBlock code={`// JSX - looks like HTML but it's JavaScript
const greeting = <h1>Hello, World!</h1>;

// JSX can include JavaScript expressions in curly braces
const name = "Alice";
const message = <h1>Hello, {name}!</h1>;

// JSX can have multiple elements (must be wrapped in one parent)
const card = (
  <div>
    <h2>Welcome</h2>
    <p>This is a card component</p>
  </div>
);`} />
          <h3 className="text-lg font-semibold text-indigo-600 mt-6 mb-3">Key Rules of JSX</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>Must return a single parent element</li>
            <li>Use <code className="bg-gray-200 px-2 py-1 rounded">className</code> instead of <code className="bg-gray-200 px-2 py-1 rounded">class</code></li>
            <li>Use curly braces {} to insert JavaScript values</li>
            <li>Close all tags (self-closing tags must end with /&gt;)</li>
          </ul>
        </Section>

        <Section id="components" title="Components: Building Blocks">
          <p>
            Components are reusable pieces of UI. Think of them like LEGO blocks - you can build them once and use them everywhere.
          </p>
          <h3 className="text-lg font-semibold text-indigo-600 mt-6 mb-3">Functional Components (Modern Way)</h3>
          <p>
            Function components are just JavaScript functions that return JSX. They're the standard way to write React today.
          </p>
          <CodeBlock code={`// Simple functional component
function Welcome() {
  return <h1>Welcome to my website!</h1>;
}

// Component with more content
function UserCard() {
  return (
    <div className="card">
      <h2>John Doe</h2>
      <p>Email: john@example.com</p>
    </div>
  );
}

// Using the component
export default function App() {
  return <UserCard />;
}`} />
          <h3 className="text-lg font-semibold text-indigo-600 mt-6 mb-3">Component Naming</h3>
          <p>
            Component names must start with a capital letter. This is how React knows it's a component and not a regular HTML tag.
          </p>
        </Section>

        <Section id="props" title="Props: Passing Data to Components">
          <p>
            Props are like function parameters - they let you pass data from a parent component to a child component. 
            Props are read-only and help you reuse components with different data.
          </p>
          <CodeBlock code={`// Component that accepts props
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}

// Using the component with different props
export default function App() {
  return (
    <>
      <Greeting name="Alice" age={25} />
      <Greeting name="Bob" age={30} />
      <Greeting name="Charlie" age={35} />
    </>
  );
}`} />
          <h3 className="text-lg font-semibold text-indigo-600 mt-6 mb-3">Key Points About Props</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>Props are passed from parent to child</li>
            <li>Props are read-only - child cannot change them</li>
            <li>Use destructuring to access props easily</li>
            <li>Props make components reusable</li>
          </ul>
        </Section>

        <Section id="state" title="State: Managing Data That Changes">
          <p>
            State is data that can change inside a component. Unlike props which come from outside, state is managed by the component itself. 
            When state changes, React re-renders the component to show the new data.
          </p>
          <CodeBlock code={`// Component using state
import { useState } from 'react';

function Counter() {
  // useState returns [currentValue, function to update it]
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
    </div>
  );
}`} />
          <h3 className="text-lg font-semibold text-indigo-600 mt-6 mb-3">State vs Props</h3>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-indigo-600">
                  <th className="text-left py-2">State</th>
                  <th className="text-left py-2">Props</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-indigo-200">
                  <td className="py-2">Managed by component</td>
                  <td>Passed from parent</td>
                </tr>
                <tr className="border-b border-indigo-200">
                  <td className="py-2">Can be changed</td>
                  <td>Read-only</td>
                </tr>
                <tr>
                  <td className="py-2">Local to component</td>
                  <td>Available to child</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="hooks" title="Hooks: useState and useEffect">
          <p>
            Hooks are special functions that let you use React features in function components. The two most important hooks are useState and useEffect.
          </p>
          <h3 className="text-lg font-semibold text-indigo-600 mt-6 mb-3">useState Hook</h3>
          <p>We already learned about useState - it manages state in function components.</p>
          
          <h3 className="text-lg font-semibold text-indigo-600 mt-6 mb-3">useEffect Hook</h3>
          <p>
            useEffect lets you run code after the component renders. It's used for side effects like fetching data, updating the document title, or setting up timers.
          </p>
          <CodeBlock code={`import { useState, useEffect } from 'react';

function FetchData() {
  const [data, setData] = useState(null);

  // This runs after the component renders
  useEffect(() => {
    // Fetch data from an API
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(result => setData(result));
  }, []); // Empty array means run only once when component loads

  return <div>{data ? data.name : 'Loading...'}</div>;
}`} />
          <h3 className="text-lg font-semibold text-indigo-600 mt-6 mb-3">useEffect Dependencies</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><code className="bg-gray-200 px-2 py-1 rounded">[]</code> (empty) - Runs once when component loads</li>
            <li><code className="bg-gray-200 px-2 py-1 rounded">[dependency]</code> - Runs when dependency changes</li>
            <li>No array - Runs after every render (usually not recommended)</li>
          </ul>
        </Section>

        <Section id="events" title="Event Handling">
          <p>
            Event handling lets you respond to user interactions like clicks, typing, and form submissions.
          </p>
          <CodeBlock code={`import { useState } from 'react';

function FormExample() {
  const [name, setName] = useState('');

  // Handle text input
  const handleChange = (event) => {
    setName(event.target.value);
  };

  // Handle button click
  const handleClick = () => {
    alert('Hello, ' + name);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    console.log('Form submitted:', name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name}
        onChange={handleChange}
        placeholder="Enter your name"
      />
      <button onClick={handleClick}>Greet Me</button>
    </form>
  );
}`} />
          <h3 className="text-lg font-semibold text-indigo-600 mt-6 mb-3">Common Events</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><code className="bg-gray-200 px-2 py-1 rounded">onClick</code> - When user clicks element</li>
            <li><code className="bg-gray-200 px-2 py-1 rounded">onChange</code> - When input value changes</li>
            <li><code className="bg-gray-200 px-2 py-1 rounded">onSubmit</code> - When form is submitted</li>
            <li><code className="bg-gray-200 px-2 py-1 rounded">onHover</code> - When mouse enters/leaves</li>
            <li><code className="bg-gray-200 px-2 py-1 rounded">onKeyPress</code> - When key is pressed</li>
          </ul>
        </Section>

        <Section id="conditional" title="Conditional Rendering">
          <p>
            Sometimes you want to show or hide elements based on conditions. Here are the main ways to do it.
          </p>
          <CodeBlock code={`// Using if/else
function LoginMessage({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please log in</h1>;
  }
}

// Using ternary operator (one line)
function StatusBadge({ isActive }) {
  return <span>{isActive ? 'Online' : 'Offline'}</span>;
}

// Using logical AND (show if true)
function AdminPanel({ isAdmin }) {
  return (
    <>
      <h1>Dashboard</h1>
      {isAdmin && <button>Delete User</button>}
    </>
  );
}

// Using switch statement
function ErrorMessage({ code }) {
  switch(code) {
    case 404:
      return <p>Page not found</p>;
    case 500:
      return <p>Server error</p>;
    default:
      return <p>Unknown error</p>;
  }
}`} />
        </Section>

        <Section id="lists" title="Lists and Keys">
          <p>
            When rendering lists of items, you use the map() function. Each item needs a unique key to help React keep track of them.
          </p>
          <CodeBlock code={`function TodoList() {
  const todos = [
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build a project' },
    { id: 3, text: 'Deploy it' }
  ];

  return (
    <ul>
      {todos.map((todo) => (
        // Each item needs a unique 'key' prop
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// Reusable component for list items
function TodoItem({ todo, onDelete }) {
  return (
    <li>
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

// Using the component
function TodoListWithDelete() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build a project' }
  ]);

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}`} />
          <h3 className="text-lg font-semibold text-indigo-600 mt-6 mb-3">Why Keys Matter</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li>Help React identify which items have changed</li>
            <li>Preserve component state in lists</li>
            <li>Should be unique among siblings</li>
            <li>Don't use array index as key</li>
          </ul>
        </Section>

        <Section id="nextjs-intro" title="What is Next.js?">
          <p>
            Next.js is a framework built on top of React that makes building web applications easier and more powerful. 
            Think of React as the engine, and Next.js as the complete car with all the tools you need.
          </p>
          <div className="bg-green-50 border-l-4 border-green-600 p-4 my-4">
            <strong>Simple Definition:</strong> Next.js is a React framework that adds features like routing, 
            server-side rendering, and static generation to make building production-ready web apps faster.
          </div>
          <h3 className="text-lg font-semibold text-indigo-600 mt-6 mb-3">Why Next.js?</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Built-in Routing:</strong> File-based routing system (no need for react-router)</li>
            <li><strong>Server-Side Rendering:</strong> Render pages on the server for better performance</li>
            <li><strong>Static Generation:</strong> Pre-build pages at build time</li>
            <li><strong>API Routes:</strong> Build backend APIs directly in your Next.js app</li>
            <li><strong>Optimization:</strong> Automatic image and code optimization</li>
            <li><strong>Full-Stack:</strong> Write frontend and backend in the same project</li>
          </ul>
        </Section>

        <Section id="nextjs-react" title="Next.js vs React">
          <h3 className="text-lg font-semibold text-indigo-600 mt-6 mb-3">Comparison</h3>
          <div className="bg-indigo-50 p-4 rounded-lg overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-indigo-600">
                  <th className="text-left py-2">Feature</th>
                  <th className="text-left py-2">React</th>
                  <th className="text-left py-2">Next.js</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-indigo-200">
                  <td className="py-2 font-semibold">Type</td>
                  <td>UI Library</td>
                  <td>Full Framework</td>
                </tr>
                <tr className="border-b border-indigo-200">
                  <td className="py-2 font-semibold">Routing</td>
                  <td>Need react-router</td>
                  <td>Built-in file-based</td>
                </tr>
                <tr className="border-b border-indigo-200">
                  <td className="py-2 font-semibold">Backend</td>
                  <td>Separate server needed</td>
                  <td>API routes included</td>
                </tr>
                <tr className="border-b border-indigo-200">
                  <td className="py-2 font-semibold">Performance</td>
                  <td>Client-side rendering</td>
                  <td>SSR & Static generation</td>
                </tr>
                <tr className="border-b border-indigo-200">
                  <td className="py-2 font-semibold">Setup</td>
                  <td>Manual config</td>
                  <td>Zero-config defaults</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold">Uses</td>
                  <td>UIs, SPAs</td>
                  <td>Full web applications</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section id="nextjs-routing" title="Routing in Next.js">
          <p>
            Next.js uses file-based routing - the folder structure determines your URLs automatically.
          </p>
          <CodeBlock code={`// File structure:
// app/
//   page.tsx          -> www.example.com/
//   about/
//     page.tsx        -> www.example.com/about
//   products/
//     page.tsx        -> www.example.com/products
//     [id]/
//       page.tsx      -> www.example.com/products/123
//   api/
//     posts/
//       route.ts      -> API endpoint at /api/posts

// Example page component
export default function Home() {
  return <h1>Welcome to my website!</h1>;
}

// Example dynamic route (products/[id]/page.tsx)
export default function ProductPage({ params }) {
  return <h1>Product {params.id}</h1>;
}

// Example API route (api/hello/route.ts)
export async function GET(request) {
  return Response.json({ message: 'Hello, World!' });
}`} />
          <h3 className="text-lg font-semibold text-indigo-600 mt-6 mb-3">Linking Between Pages</h3>
          <CodeBlock code={`import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/products">Products</Link>
    </nav>
  );
}`} />
        </Section>

        {/* Summary */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-12">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">Summary: Your Learning Path</h2>
          <div className="space-y-4">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-indigo-700 mb-2">Phase 1: React Basics (Start Here)</h3>
              <p className="text-gray-700">Learn JSX, Components, Props, State, Hooks, and Event Handling</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-700 mb-2">Phase 2: React Intermediate</h3>
              <p className="text-gray-700">Master Conditional Rendering, Lists, useEffect, and component composition</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700 mb-2">Phase 3: Add Next.js</h3>
              <p className="text-gray-700">Learn routing, API routes, and build full-stack applications</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-700 mb-2">Phase 4: Advanced Concepts</h3>
              <p className="text-gray-700">Context API, Custom Hooks, Performance Optimization, Testing</p>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8 mb-12">
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">Pro Tips for Learning</h2>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-2xl">1</span>
              <div>
                <strong>Build Projects:</strong> The best way to learn is by building real projects. Start small and gradually increase complexity.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">2</span>
              <div>
                <strong>Read Code:</strong> Look at other people's React code on GitHub. Learn from real-world examples.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">3</span>
              <div>
                <strong>Practice Regularly:</strong> Spend 30 minutes every day practicing. Consistency beats intensity.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">4</span>
              <div>
                <strong>Use React DevTools:</strong> Install the React DevTools browser extension to inspect components and debug easily.
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-2xl">5</span>
              <div>
                <strong>Join Communities:</strong> Connect with other React developers on Discord, Reddit, and Stack Overflow.
              </div>
            </li>
          </ul>
        </div>

        {/* Print Instructions */}
        <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-lg mb-12">
          <h3 className="font-bold text-amber-900 mb-2">Print to PDF Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-amber-900">
            <li>Press <code className="bg-amber-200 px-2 py-1 rounded">Ctrl+P</code> (Windows) or <code className="bg-amber-200 px-2 py-1 rounded">Cmd+P</code> (Mac)</li>
            <li>Select "Save as PDF" as the printer</li>
            <li>Click the "Save" button</li>
            <li>Your manual will be saved as a PDF file!</li>
          </ol>
        </div>
      </div>
    </main>
  );
}
