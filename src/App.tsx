import React, { useState, useEffect } from 'react';
import { useAppState } from './hooks/useAppState';
import { LandingPage } from './components/LandingPage';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { Popup } from './components/Popup';
import { UserRole } from './types';

type View = 'LANDING' | 'LOGIN' | 'REGISTER' | 'DASHBOARD';

export default function App() {
  const { 
    state, 
    login, 
    logout, 
    register, 
    addProduct, 
    approveProduct, 
    approveUser, 
    placeOrder,
    addCustomer,
    recordSale
  } = useAppState();

  const [currentView, setCurrentView] = useState<View>('LANDING');
  const [popup, setPopup] = useState<{ isOpen: boolean; type: 'success' | 'error' | 'info'; message: string }>({
    isOpen: false,
    type: 'info',
    message: '',
  });

  const showPopup = (type: 'success' | 'error' | 'info', message: string) => {
    setPopup({ isOpen: true, type, message });
  };

  const closePopup = () => {
    setPopup(prev => ({ ...prev, isOpen: false }));
  };

  // Sensitive Access Control
  useEffect(() => {
    const sensitiveViews: View[] = ['DASHBOARD'];
    if (sensitiveViews.includes(currentView) && !state.currentUser) {
      showPopup('error', 'Please login to continue');
      setCurrentView('LOGIN');
    }
  }, [currentView, state.currentUser]);

  const handleLogin = (u: string, p: string) => {
    const user = login(u, p);
    if (user) {
      showPopup('success', `Welcome back, ${user.fullName}!`);
      setCurrentView('DASHBOARD');
    } else {
      showPopup('error', 'Invalid credentials or account pending approval.');
    }
  };

  const handleRegister = (data: any) => {
    try {
      const newUser = register(data);
      if (newUser.role === 'ENTREPRENEUR') {
        showPopup('info', 'Account created! Please wait for admin approval.');
        setCurrentView('LOGIN');
      } else {
        showPopup('success', 'Account created successfully! You can now login.');
        setCurrentView('LOGIN');
      }
    } catch (error) {
      showPopup('error', 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {currentView === 'LANDING' && (
        <LandingPage 
          onLoginClick={() => setCurrentView('LOGIN')} 
          onCreateAccountClick={() => setCurrentView('REGISTER')} 
        />
      )}

      {(currentView === 'LOGIN' || currentView === 'REGISTER') && (
        <Auth 
          type={currentView === 'LOGIN' ? 'login' : 'register'}
          onBack={() => setCurrentView('LANDING')}
          onLogin={handleLogin}
          onRegister={handleRegister}
          onSwitch={() => setCurrentView(currentView === 'LOGIN' ? 'REGISTER' : 'LOGIN')}
        />
      )}

      {currentView === 'DASHBOARD' && state.currentUser && (
        <Dashboard 
          user={state.currentUser}
          state={state}
          onLogout={() => {
            logout();
            setCurrentView('LANDING');
            showPopup('info', 'Logged out successfully');
          }}
          onApproveUser={(id) => {
            approveUser(id);
            showPopup('success', 'User approved successfully');
          }}
          onApproveProduct={(id) => {
            approveProduct(id);
            showPopup('success', 'Product approved successfully');
          }}
          onAddProduct={(p) => {
            addProduct(p);
            showPopup('info', 'Product submitted for approval');
          }}
          onPlaceOrder={(p) => {
            placeOrder(p);
            showPopup('success', 'Order placed successfully!');
          }}
          onAddCustomer={(c) => {
            addCustomer(c);
          }}
          onRecordSale={(s) => {
            recordSale(s);
          }}
        />
      )}

      <Popup 
        isOpen={popup.isOpen}
        type={popup.type}
        message={popup.message}
        onClose={closePopup}
      />
    </div>
  );
}
