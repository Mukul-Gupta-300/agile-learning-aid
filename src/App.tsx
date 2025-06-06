import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "@/components/auth/LandingPage";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import PlaceholderPage from "@/pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

// Custom component to handle redirection based on auth status
const HomeRedirect = () => {
  const { user } = useAuth(); // adjust based on your actual context shape
  return user ? <Navigate to="/dashboard" replace /> : <LandingPage />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomeRedirect />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />

                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />

                  <Route path="/live" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <PlaceholderPage 
                        title="Live Classes" 
                        description="Join interactive live sessions with your teachers and classmates." 
                      />
                    </ProtectedRoute>
                  } />

                  <Route path="/resources" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <PlaceholderPage 
                        title="Learning Resources" 
                        description="Access your course materials, videos, and study guides." 
                      />
                    </ProtectedRoute>
                  } />

                  <Route path="/chatbot" element={
                    <ProtectedRoute>
                      <PlaceholderPage 
                        title="AI Assistant" 
                        description="Get instant help with your questions using our AI-powered assistant." 
                      />
                    </ProtectedRoute>
                  } />

                  <Route path="/notes" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <PlaceholderPage 
                        title="My Notes" 
                        description="Review and organize your lesson notes and summaries." 
                      />
                    </ProtectedRoute>
                  } />

                  <Route path="/quizzes" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <PlaceholderPage 
                        title="Quizzes & Assessments" 
                        description="Take quizzes and track your learning progress." 
                      />
                    </ProtectedRoute>
                  } />

                  <Route path="/create" element={
                    <ProtectedRoute allowedRoles={['teacher']}>
                      <PlaceholderPage 
                        title="Create Content" 
                        description="Design engaging lessons and learning materials for your students." 
                      />
                    </ProtectedRoute>
                  } />

                  <Route path="/schedule" element={
                    <ProtectedRoute allowedRoles={['teacher']}>
                      <PlaceholderPage 
                        title="Schedule Classes" 
                        description="Organize and schedule your upcoming classes and sessions." 
                      />
                    </ProtectedRoute>
                  } />

                  <Route path="/analytics" element={
                    <ProtectedRoute allowedRoles={['teacher']}>
                      <PlaceholderPage 
                        title="Analytics Dashboard" 
                        description="Monitor student progress and engagement metrics." 
                      />
                    </ProtectedRoute>
                  } />

                  {/* Redirect old paths */}
                  <Route path="/dashboard/student" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard/teacher" element={<Navigate to="/dashboard" replace />} />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
