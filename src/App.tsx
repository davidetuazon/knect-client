import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import './App.css'
import Cookies from 'js-cookie';
import AuthProvider from './providers/AuthProvider';
import { ACCESS_TOKEN } from './utils/constants';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Account from './pages/Account';
import Messages from './pages/Messages';
import Matches from './pages/Matches';
import Likes from './pages/Likes';
import Profile from './pages/Profile';
import Message from './pages/Message';

function App() {
  return (
    <BrowserRouter>
      <Toaster
      toastOptions={{
        success: {duration: 1250},
        error: {duration: 4000},
        style: {
          background: '#FFFFFF',
          fontFamily: 'Poppins-SemiBold',
          color: '#1F2937',
          width: 'fit-content',
          maxWidth: '500px',
          whiteSpace: 'pre-wrap'
        }
      }}
    />
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={ <Navigate to='/discover' /> } />
          <Route 
            path='/discover'
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route 
            path='/discover/profile/:id'
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route 
            path='/account'
            element={
              <RequireAuth>
                <Account />
              </RequireAuth>
            }
          />
          <Route 
            path='/messages'
            element={
              <RequireAuth>
                <Messages />
              </RequireAuth>
            }
          />
          <Route 
            path='/messages/:id'
            element={
              <RequireAuth>
                <Message />
              </RequireAuth>
            }
          />
          <Route 
            path='/matches'
            element={
              <RequireAuth>
                <Matches />
              </RequireAuth>
            }
          />
          <Route 
            path='/likes'
            element={
              <RequireAuth>
                <Likes />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

function RequireAuth({ children }: { children: React.JSX.Element }) {

  const token = Cookies.get(ACCESS_TOKEN);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children;
}

export default App;