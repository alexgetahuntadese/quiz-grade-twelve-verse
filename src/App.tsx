
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Grade10 from "./pages/Grade10";
import Grade11 from "./pages/Grade11";
import Grade12 from "./pages/Grade12";
import Quiz from "./pages/Quiz";
import Reximix from "./pages/Reximix";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/grade-10" element={<Grade10 />} />
          <Route path="/grade-11" element={<Grade11 />} />
          <Route path="/grade-12" element={<Grade12 />} />
          <Route path="/quiz/:chapterId" element={<Quiz />} />
          <Route path="/reximix" element={<Reximix />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
