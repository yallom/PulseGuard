import React, { Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd';
import ptPT from 'antd/locale/pt_PT';
import { AnimatePresence } from 'framer-motion';
import './index.css'

import NotFoundPage from './pages/userView/Desktop/NotFoundPage.tsx';

const queryClient = new QueryClient();

const App = lazy(() => import('./App.tsx'));
const HomePageMobile = lazy(() => import('./pages/userView/Mobile/HomePage.tsx'));
const HomePageDesktop = lazy(() => import('./pages/userView/Desktop/HomePage.tsx'));
const Logo = lazy(() => import('./pages/userView/Desktop/Logo.tsx'));
const NavBar = lazy(() => import('./pages/userView/Desktop/components/NavBar.tsx'));

const RootRedirect = () => {
  //const isAuthenticated = sessionStorage.getItem('authToken'); É PRECISO ADICIONAR AUTENTICAÇÃO REAL
  //const { role: userRole, loading } = useUserRole();

  const isAuthenticated = true; // Simulação de autenticação
  const userRole : string = 'doctor';
  const loading = false;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green"></div>
      </div>
    );
  }

  if (!userRole) {
    sessionStorage.clear();
    return <Navigate to="/login" replace />;
  }
  
  // Redirecionar baseado na role
  switch (userRole) {
    case 'doctor':
      return <Navigate to="/desktop/homepage" replace />;
    case 'user':
      return <Navigate to="/desktop/homepage" replace />;
    default:
      return <Navigate to="/desktop/homepage" replace />;
  }
};

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <NotFoundPage />,
    ErrorBoundary: NotFoundPage,
    children: [
      { 
        element: <NavBar />,
        children: [
          {
            path: '/',
            element: <RootRedirect />
          },
          {
            path: 'desktop',
            element: <Outlet />,
            children: [
              {
                path: 'homepage',
                element: <HomePageDesktop />
              }
            ]
          },
          {
            path: 'mobile',
            element: <Outlet />,
            children: [
              {
                path: 'homepage',
                element: <HomePageMobile />
              }
            ]
          },
          {
            path: '/logo',
            element: <Logo />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        locale={ptPT}
        theme={{
          token: {
            colorPrimary: "#3c653c", 
          },
        }}
      >
          <AnimatePresence>
            <Suspense fallback={<NotFoundPage />}>
              <RouterProvider router={router} />
            </Suspense>
          </AnimatePresence>
      </ConfigProvider>
    </QueryClientProvider>
  </React.StrictMode>
)