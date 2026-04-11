import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { useAuth } from './hooks/api/useAuth';
import AuthGuard from './components/common/AuthGuard';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Messages = lazy(() => import('./pages/Messages'));
const Profile = lazy(() => import('./pages/Profile'));
const GigDetails = lazy(() => import('./pages/GigDetails'));
const PostGig = lazy(() => import('./pages/PostGig'));
const Login = lazy(() => import('./pages/Login'));

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent: React.FC = () => {
  const { isLoading, user } = useAuth();

  // If we are checking the session, show nothing or the login page to avoid the redirect flicker
  if (isLoading && !user) {
    return (
      <Suspense fallback={null}>
        <Login />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={null}>
      <Routes>
        {/* If user is logged in, redirect away from login automatically */}
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="gig/:id" element={<GigDetails />} />
          
          {/* Protected Routes */}
          <Route path="dashboard" element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          } />
          <Route path="messages" element={
            <AuthGuard>
              <Messages />
            </AuthGuard>
          } />
          <Route path="profile" element={<Profile />} />
          <Route path="upload" element={
            <AuthGuard>
              <PostGig />
            </AuthGuard>
          } />
        </Route>

        {/* Fallback for deep links if guest */}
        <Route path="*" element={user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;
