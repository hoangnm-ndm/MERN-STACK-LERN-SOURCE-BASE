import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from '@/app/providers';
import { router } from '@/app/router';
import './index.css';

/**
 * Điểm vào duy nhất. File này chỉ gắn app vào DOM — không logic, không provider
 * (đã có providers.jsx), không route (đã có router).
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
);
