//index.jsx
import { AuthProvider } from "react-oidc-context";
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

const cognitoAuthConfig = {
  authority: import.meta.env.VITE_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_REDIRECT_URI,
  response_type: "code",
  scope: "email openid phone",
};

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider {...cognitoAuthConfig}>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);