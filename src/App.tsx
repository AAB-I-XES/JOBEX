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
  const { isLoading, user } = useAuth();

  // If we are still checking the session, show the login page as the splash
  // This satisfies the requirement of showing the login page first.
  if (isLoading) {
    return (
      <Suspense fallback={null}>
        <Login isInitializing />
      </Suspense>
    );
  }

  return (
    <Router>
      <Suspense fallback={null}>
        <Routes>
          {/* If user is logged in, redirect away from login */}
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
          {!user && <Route path="*" element={<Navigate to="/login" replace />} />}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
