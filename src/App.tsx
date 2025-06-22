import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Subject from './pages/Subject';
import Quiz from './pages/Quiz';
import Grade10 from './pages/Grade10';
import Grade11 from './pages/Grade11';
import Grade12 from './pages/Grade12';
import Grade11Subject from './pages/Grade11Subject';
import Grade11Quiz from './pages/Grade11Quiz';
import Grade12Subject from './pages/Grade12Subject';
import Grade12Quiz from './pages/Grade12Quiz';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

// Simple Error Boundary component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, info: any) {
    // Log error details for debugging
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-100 text-red-800 rounded-xl m-8 text-center">
          <h1 className="text-2xl font-bold mb-2">A component crashed:</h1>
          <pre className="whitespace-pre-line">{String(this.state.error)}</pre>
          <div className="mt-4">Please send this message to your developer or try refreshing the app.</div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/grade-10" element={<Grade10 />} />
          <Route path="/grade-11" element={<Grade11 />} />
          <Route path="/grade-12" element={<Grade12 />} />
          <Route path="/subject/:subject" element={<Subject />} />
          <Route path="/quiz/:subject/:chapter/:difficulty" element={<Quiz />} />
          <Route path="/grade11/:subject" element={<Grade11Subject />} />
          <Route path="/grade11/:subject/:chapter/:difficulty" element={<Grade11Quiz />} />
          <Route path="/grade12/:subject" element={<Grade12Subject />} />
          <Route path="/grade12/:subject/:chapter/:difficulty" element={<Grade12Quiz />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
