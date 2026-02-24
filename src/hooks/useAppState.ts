import React, { useState, useEffect } from 'react';
import { User, Product, Order, Transaction, AppState } from '../types';

const STORAGE_KEY = 'eco_dairy_farm_state';

const INITIAL_STATE: AppState = {
  users: [
    {
      id: 'admin-1',
      fullName: 'RAFEE NAHEYAN',
      mobile: '01590018360',
      whatsApp: '01590018360',
      email: 'rafeenaheyan@gmail.com',
      username: 'admin',
      password: 'password',
      role: 'ADMIN',
      status: 'APPROVED',
      createdAt: new Date().toISOString(),
    }
  ],
  products: [],
  orders: [],
  transactions: [],
  currentUser: null,
};

export function useAppState() {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      if (e instanceof Error && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
        console.warn('LocalStorage quota exceeded in useAppState. Attempting to slim state...');
        
        // Try clearing other non-essential keys first
        localStorage.removeItem('eco_gallery');
        localStorage.removeItem('eco_notifications');
        
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (retryError) {
          console.error('LocalStorage still full. Stripping photos from state...');
          // Last resort: strip photos from users in the state being saved
          const slimState = {
            ...state,
            users: state.users.map(u => ({ ...u, nidFront: undefined, nidBack: undefined })),
            products: state.products.map(p => ({ ...p, image: '' }))
          };
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(slimState));
            console.warn('Saved slimmed state (no photos) to stay within quota.');
          } catch (finalError) {
            console.error('Failed to save even slimmed state.', finalError);
          }
        }
      }
    }
  }, [state]);

  const login = (username: string, password: string): User | null => {
    const user = state.users.find(u => u.username === username && u.password === password);
    if (user) {
      if (user.status !== 'APPROVED') return null;
      setState(prev => ({ ...prev, currentUser: user }));
      return user;
    }
    return null;
  };

  const logout = () => {
    setState(prev => ({ ...prev, currentUser: null }));
  };

  const register = (userData: Partial<User>) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      fullName: userData.fullName || '',
      mobile: userData.mobile || '',
      whatsApp: userData.whatsApp || '',
      email: userData.email || '',
      username: userData.username || '',
      password: userData.password || '',
      role: userData.role || 'CUSTOMER',
      nidFront: userData.nidFront,
      nidBack: userData.nidBack,
      status: userData.role === 'ADMIN' ? 'APPROVED' : (userData.role === 'ENTREPRENEUR' ? 'PENDING' : 'APPROVED'),
      createdAt: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      users: [...prev.users, newUser]
    }));
    return newUser;
  };

  const addProduct = (productData: Partial<Product>) => {
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: productData.name || '',
      price: productData.price || 0,
      description: productData.description || '',
      image: productData.image || '',
      entrepreneurId: state.currentUser?.id || '',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    setState(prev => ({ ...prev, products: [...prev.products, newProduct] }));
  };

  const approveProduct = (productId: string) => {
    setState(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === productId ? { ...p, status: 'APPROVED' } : p)
    }));
  };

  const approveUser = (userId: string) => {
    setState(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === userId ? { ...u, status: 'APPROVED' } : u)
    }));
  };

  const placeOrder = (product: Product) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      customerId: state.currentUser?.id || '',
      productId: product.id,
      productName: product.name,
      price: product.price,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    setState(prev => ({ ...prev, orders: [...prev.orders, newOrder] }));
  };

  const addCustomer = (customerData: Partial<User>) => {
    const newCustomer: User = {
      id: Math.random().toString(36).substr(2, 9),
      fullName: customerData.fullName || '',
      mobile: customerData.mobile || '',
      whatsApp: customerData.whatsApp || '',
      email: customerData.email || '',
      username: customerData.username || '',
      password: customerData.password || '',
      role: 'CUSTOMER',
      address: customerData.address,
      whatToBuy: customerData.whatToBuy,
      milkQuantity: customerData.milkQuantity,
      previousBalance: customerData.previousBalance,
      advanceDeposit: customerData.advanceDeposit,
      status: 'APPROVED',
      createdAt: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      users: [...prev.users, newCustomer]
    }));
    return newCustomer;
  };

  const recordSale = (saleData: any) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      customerId: saleData.customerId,
      productId: 'sale-manual',
      productName: saleData.productName || 'Manual Sale',
      price: saleData.totalPrice,
      status: 'COMPLETED',
      createdAt: saleData.date || new Date().toISOString(),
    };

    // Also update customer balance if needed
    setState(prev => ({
      ...prev,
      orders: [...prev.orders, newOrder],
      users: prev.users.map(u => 
        u.id === saleData.customerId 
          ? { ...u, previousBalance: (u.previousBalance || 0) + saleData.finalBalance - (u.previousBalance || 0) } 
          : u
      )
    }));
  };

  return {
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
  };
}
