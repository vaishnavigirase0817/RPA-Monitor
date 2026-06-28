import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import PageLoader from './components/ui/PageLoader';

// Lazy loaded routes for code splitting and performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Processes = lazy(() => import('./pages/Processes'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Bots = lazy(() => import('./pages/Bots'));
const Settings = lazy(() => import('./pages/Settings'));
const Logs = lazy(() => import('./pages/Logs'));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route 
            index 
            element={
              <Suspense fallback={<PageLoader />}>
                <Dashboard />
              </Suspense>
            } 
          />
          <Route 
            path="/processes" 
            element={
              <Suspense fallback={<PageLoader />}>
                <Processes />
              </Suspense>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <Suspense fallback={<PageLoader />}>
                <Analytics />
              </Suspense>
            } 
          />
          <Route 
            path="/bots" 
            element={
              <Suspense fallback={<PageLoader />}>
                <Bots />
              </Suspense>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <Suspense fallback={<PageLoader />}>
                <Settings />
              </Suspense>
            } 
          />
          <Route 
            path="/logs" 
            element={
              <Suspense fallback={<PageLoader />}>
                <Logs />
              </Suspense>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
