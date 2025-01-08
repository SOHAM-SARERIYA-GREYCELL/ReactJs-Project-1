import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'
import FormPage from './Pages/FormPage';
import { Provider } from 'react-redux';
import store from './User/store'
import FormPageWrapper from './Pages/FormPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: "/form",
    element: <FormPage />
  },
  {
    path: '/form/:id',
    element: <FormPageWrapper />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)