import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Home from '@/pages/home';
import Article from '@/pages/article';
import NotFound from '@/pages/404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: '/',
        title: 'home',
        element: <Home />,
      },
      {
        path: '/article',
        element: <Article />,
      },
    ],
  },
]);

export default router;
