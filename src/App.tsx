import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { useAuth } from './hooks/api/useAuth';
import AuthGuard from './components/common/AuthGuard';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Messages = lazy(() => import('./pages/Messages'));
const Profile = lazy(() => import('./pages/Profile'));
const GigDetails = lazy(() => import('./pages/GigDetails'));
const PostGig = lazy(() => import('./pages/PostGig'));
const Login = lazy(() => import('./pages/Login'));
const Notifications = lazy(() => import('./pages/Notifications'));
const CategoryResults = lazy(() => import('./pages/CategoryResults'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const PublicProfile = lazy(() => import('./pages/PublicProfile'));
const GigImmersiveView = lazy(() => import('./pages/GigImmersiveView'));
const StoryImmersiveView = lazy(() => import('./components/story/StoryImmersiveView'));
import Settings from './pages/Settings';
import SavedGigs from './pages/SavedGigs';
import TransactionHistory from './pages/TransactionHistory';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
};

const AppContent: React.FC = () => {
  const { isLoading, user } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    console.log('[Router] Current Path:', location.pathname);
  }, [location]);

  // Wait for auth rehydration before rendering routes to avoid login flash.
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant opacity-70">
            Restoring session
          </p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    }>
      <Routes>
        {/* If user is logged in, redirect away from login automatically */}
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
        
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="explore/:categoryName" element={<CategoryResults />} />
          <Route path="search" element={<SearchResults />} />
          <Route path="gig/:id" element={<GigDetails />} />
          <Route path="gig/view/:id" element={<GigImmersiveView />} />
          <Route path="story/:userId" element={<StoryImmersiveView />} />
          <Route path="profile/:userId" element={<PublicProfile />} />
          
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
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="saved" element={
            <AuthGuard>
              <SavedGigs />
            </AuthGuard>
          } />
          <Route path="history" element={
            <AuthGuard>
              <TransactionHistory />
            </AuthGuard>
          } />
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
