import React, { ReactElement } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({
  children
}) => {
  const isAuthenticated = false// !!localStorage.getItem('jwtToken');

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
  return <>{children}</>;
};

export default ProtectedRoutes;