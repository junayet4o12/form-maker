import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import MyRouts from './MyRouts/MyRouts';
import AuthProviders from './AuthProviders/AuthProviders';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <AuthProviders>
        <Toaster />
        <RouterProvider router={MyRouts} />

      </AuthProviders>
    </React.StrictMode>
  </QueryClientProvider>,
)
