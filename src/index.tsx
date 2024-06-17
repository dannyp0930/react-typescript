import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';
import { CookiesProvider } from 'react-cookie';
import { RouterProvider } from 'react-router-dom';
import router from '@/router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
    </ApolloProvider>
  </StrictMode>,
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}
