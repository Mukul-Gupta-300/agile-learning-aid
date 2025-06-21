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

// Import the new student pages
import StudentLiveClasses from "./components/dashboard/StudentLiveClass";
import StudentResources from "./components/dashboard/StudentResources";
import StudentChatbot from "./components/dashboard/StudentChatbot";
import StudentNotes from "./components/dashboard/StudentNotes";
import StudentQuizzes from "./components/dashboard/StudentQuizzes";

// Custom component to handle redirection based on auth status
const HomeRedirect = () => {
  const { user } = useAuth();
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

                  {/* Student Routes */}
                  <Route path="/live" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentLiveClasses />
                    </ProtectedRoute>
                  } />

                  <Route path="/resources" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentResources />
                    </ProtectedRoute>
                  } />

                  <Route path="/chatbot" element={
                    <ProtectedRoute>
                      <StudentChatbot />
                    </ProtectedRoute>
                  } />

                  <Route path="/notes" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentNotes />
                    </ProtectedRoute>
                  } />

                  <Route path="/quizzes" element={
                    <ProtectedRoute allowedRoles={['student']}>
                      <StudentQuizzes />
                    </ProtectedRoute>
                  } />

                  {/* Teacher Routes - keeping as placeholders for now */}
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