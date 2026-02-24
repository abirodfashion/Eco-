import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  ShoppingCart, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  Package, 
  CreditCard,
  LogOut,
  Menu as MenuIcon,
  X,
  Plus,
  FileText,
  Settings,
  User as UserIcon,
  Heart,
  Search,
  LayoutDashboard
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { User, UserRole, AppState } from '../types';
import { cn } from '../lib/utils';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface DashboardProps {
  user: User;
  state: AppState;
  onLogout: () => void;
  onApproveUser?: (id: string) => void;
  onApproveProduct?: (id: string) => void;
  onAddProduct?: (p: any) => void;
  onPlaceOrder?: (p: any) => void;
  onAddCustomer?: (c: any) => void;
  onRecordSale?: (s: any) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  state, 
  onLogout, 
  onApproveUser, 
  onApproveProduct,
  onAddProduct,
  onPlaceOrder,
  onAddCustomer,
  onRecordSale
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('dashboard');
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = React.useState(false);
  const [isSellModalOpen, setIsSellModalOpen] = React.useState(false);
  
  const [addCustomerData, setAddCustomerData] = React.useState({
    username: '',
    password: '',
    address: '',
    whatToBuy: 'Milk',
    customProduct: '',
    milkQuantity: 0,
    previousBalance: 0,
    advanceDeposit: 0,
    adminPasswordConfirm: ''
  });

  const [sellData, setSellData] = React.useState({
    customerId: '',
    date: new Date().toISOString().split('T')[0],
    quantity: 0,
    price: 80,
    collected: 0,
    passwordConfirm: ''
  });

  const isAdmin = user.role === 'ADMIN';
  const isEntrepreneur = user.role === 'ENTREPRENEUR';
  const isCustomer = user.role === 'CUSTOMER';

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check admin password confirmation
    // For simplicity, we check against the admin user's password in state
    const adminUser = state.users.find(u => u.role === 'ADMIN');
    if (addCustomerData.adminPasswordConfirm !== adminUser?.password) {
      alert('Invalid Admin Password Confirmation!');
      return;
    }

    onAddCustomer?.({
      fullName: addCustomerData.username, // Using username as full name for now
      username: addCustomerData.username,
      password: addCustomerData.password,
      address: addCustomerData.address,
      whatToBuy: addCustomerData.whatToBuy === 'Others' ? addCustomerData.customProduct : addCustomerData.whatToBuy,
      milkQuantity: addCustomerData.whatToBuy === 'Milk' ? addCustomerData.milkQuantity : undefined,
      previousBalance: addCustomerData.previousBalance,
      advanceDeposit: addCustomerData.advanceDeposit,
      role: 'CUSTOMER',
      status: 'APPROVED'
    });

    setIsAddCustomerModalOpen(false);
    setAddCustomerData({
      username: '',
      password: '',
      address: '',
      whatToBuy: 'Milk',
      customProduct: '',
      milkQuantity: 0,
      previousBalance: 0,
      advanceDeposit: 0,
      adminPasswordConfirm: ''
    });
    alert('Customer added successfully!');
  };

  const selectedCustomerForSale = state.users.find(u => u.id === sellData.customerId);
  const todayTotal = sellData.quantity * sellData.price;
  const previousBalance = selectedCustomerForSale?.previousBalance || 0;
  const finalBalance = todayTotal + previousBalance - sellData.collected;

  const handleRecordSale = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sellData.customerId) {
      alert('Please select a customer');
      return;
    }

    // Verify password (entrepreneur or admin)
    if (sellData.passwordConfirm !== user.password) {
      alert('Invalid Password Confirmation!');
      return;
    }

    onRecordSale?.({
      customerId: sellData.customerId,
      date: sellData.date,
      quantity: sellData.quantity,
      price: sellData.price,
      collected: sellData.collected,
      totalPrice: todayTotal,
      finalBalance: finalBalance,
      productName: 'Milk Sale' // Defaulting to milk for this UI
    });

    setIsSellModalOpen(false);
    setSellData({
      customerId: '',
      date: new Date().toISOString().split('T')[0],
      quantity: 0,
      price: 80,
      collected: 0,
      passwordConfirm: ''
    });
    alert('Sale recorded successfully!');
  };

  const stats = React.useMemo(() => {
    if (isAdmin) {
      return [
        { label: 'Total Users', value: state.users.length, icon: Users, color: 'bg-blue-500' },
        { label: 'Total Orders', value: state.orders.length, icon: ShoppingCart, color: 'bg-emerald-500' },
        { label: 'Transactions', value: state.transactions.length, icon: TrendingUp, color: 'bg-amber-500' },
        { label: 'Approval %', value: '85%', icon: CheckCircle, color: 'bg-purple-500' },
      ];
    }
    if (isEntrepreneur) {
      const myProducts = state.products.filter(p => p.entrepreneurId === user.id);
      const myOrders = state.orders.filter(o => myProducts.some(p => p.id === o.productId));
      return [
        { label: 'My Orders', value: myOrders.length, icon: ShoppingCart, color: 'bg-emerald-500' },
        { label: 'Transactions', value: 0, icon: TrendingUp, color: 'bg-amber-500' },
        { label: 'Approval %', value: '92%', icon: CheckCircle, color: 'bg-purple-500' },
      ];
    }
    return [
      { label: 'Order History', value: state.orders.filter(o => o.customerId === user.id).length, icon: Clock, color: 'bg-blue-500' },
      { label: 'Spending', value: `$${state.orders.filter(o => o.customerId === user.id).reduce((acc, o) => acc + o.price, 0)}`, icon: CreditCard, color: 'bg-emerald-500' },
      { label: 'Activity %', value: '78%', icon: TrendingUp, color: 'bg-amber-500' },
    ];
  }, [isAdmin, isEntrepreneur, isCustomer, state, user.id]);

  const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 900 },
  ];

  const generateReport = (type: string) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Eco Dairy Farm Report', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Report Type: ${type}`, 20, 35);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 42);

    let data: any[] = [];
    let headers: string[] = [];

    if (type === 'Users') {
      headers = ['Name', 'Role', 'Status', 'Joined'];
      data = state.users.map(u => [u.fullName, u.role, u.status, new Date(u.createdAt).toLocaleDateString()]);
    } else if (type === 'Orders') {
      headers = ['Order ID', 'Product', 'Price', 'Status'];
      data = state.orders.map(o => [o.id, o.productName, `$${o.price}`, o.status]);
    }

    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 50,
    });

    doc.save(`Eco_Dairy_Farm_${type}_Report.pdf`);
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ...(isAdmin ? [
      { id: 'pending-approvals', label: 'Pending Approvals', icon: Clock },
      { id: 'user-management', label: 'User Management', icon: Users },
      { id: 'order-management', label: 'Order Management', icon: ShoppingCart },
      { id: 'reports', label: 'Reports', icon: FileText },
      { id: 'settings', label: 'Settings', icon: Settings },
    ] : []),
    ...(isEntrepreneur ? [
      { id: 'my-orders', label: 'My Orders', icon: ShoppingCart },
      { id: 'add-product', label: 'Add Product', icon: Plus },
      { id: 'transactions', label: 'Transactions', icon: CreditCard },
      { id: 'pending-status', label: 'Pending Status', icon: Clock },
      { id: 'profile', label: 'Profile', icon: UserIcon },
    ] : []),
    ...(isCustomer ? [
      { id: 'browse-products', label: 'Browse Products', icon: Search },
      { id: 'my-orders', label: 'My Orders', icon: ShoppingCart },
      { id: 'transactions', label: 'Transactions', icon: CreditCard },
      { id: 'wishlist', label: 'Wishlist', icon: Heart },
      { id: 'profile', label: 'Profile', icon: UserIcon },
    ] : []),
    { id: 'logout', label: 'Logout', icon: LogOut, onClick: onLogout },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar / Hamburger Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed top-0 left-0 h-full w-72 bg-farm-green text-white z-50 p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-serif italic">Eco Dairy</h2>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.onClick) item.onClick();
                      else {
                        setActiveSection(item.id);
                        setIsMenuOpen(false);
                      }
                    }}
                    className={cn(
                      "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all",
                      activeSection === item.id ? "bg-white/20 font-bold" : "hover:bg-white/10"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              <MenuIcon className="w-6 h-6 text-slate-600" />
            </button>
            <img src="https://scontent.fspd3-1.fna.fbcdn.net/v/t39.30808-6/636856053_122093875569285093_6442118386641895876_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=LU_Bs78Q-WsQ7kNvwFvu4Fy&_nc_oc=Adlm0RhoFOG5k10IPSh3nsnqb7EEW6cmcI8NVZ8PBQRKUpmwpA7YCFUL4kRyqjxf7qc&_nc_zt=23&_nc_ht=scontent.fspd3-1.fna&_nc_gid=8ywDWztAeDizUAKZZaMxgA&oh=00_AftpN_WSbQgLu7y3yCT8cx-NK4_XES9YDtWbfqbcdrmixg&oe=69A1E181" alt="Logo" className="w-8 h-8 object-contain hidden sm:block" />
            <h1 className="text-lg md:text-xl font-bold text-slate-800 capitalize">
              {activeSection.replace('-', ' ')}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {(isAdmin || isEntrepreneur) && (
              <div className="hidden md:flex items-center gap-2">
                <button 
                  onClick={() => setIsSellModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-all shadow-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Sell
                </button>
                <button 
                  onClick={() => setIsAddCustomerModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-farm-green text-white rounded-xl font-bold hover:bg-farm-green/90 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Customer
                </button>
              </div>
            )}
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-900">{user.fullName}</p>
              <p className="text-xs text-slate-500">{user.role}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-farm-green flex items-center justify-center text-white font-bold">
              {user.fullName[0]}
            </div>
          </div>
        </header>

        <main className="p-6 overflow-y-auto">
          {activeSection === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4"
                  >
                    <div className={cn("p-4 rounded-xl text-white", stat.color)}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                      <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold mb-6">Performance Overview</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#2D5A27" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                  <h3 className="text-lg font-bold mb-6">Growth Trends</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#88B04B" strokeWidth={3} dot={{ r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'pending-approvals' && isAdmin && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-lg font-bold">Pending Entrepreneurs</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-sm">
                      <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Mobile</th>
                        <th className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {state.users.filter(u => u.role === 'ENTREPRENEUR' && u.status === 'PENDING').map(u => (
                        <tr key={u.id}>
                          <td className="px-6 py-4 font-medium">{u.fullName}</td>
                          <td className="px-6 py-4">{u.email}</td>
                          <td className="px-6 py-4">{u.mobile}</td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => onApproveUser?.(u.id)}
                              className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700"
                            >
                              Approve
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-lg font-bold">Pending Products</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-sm">
                      <tr>
                        <th className="px-6 py-4">Product</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Entrepreneur</th>
                        <th className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {state.products.filter(p => p.status === 'PENDING').map(p => (
                        <tr key={p.id}>
                          <td className="px-6 py-4 font-medium">{p.name}</td>
                          <td className="px-6 py-4">${p.price}</td>
                          <td className="px-6 py-4">{state.users.find(u => u.id === p.entrepreneurId)?.fullName}</td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => onApproveProduct?.(p.id)}
                              className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700"
                            >
                              Approve
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'reports' && isAdmin && (
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold mb-6">Generate Reports</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button 
                    onClick={() => generateReport('Users')}
                    className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-2xl hover:border-farm-green hover:bg-farm-light transition-all group"
                  >
                    <Users className="w-12 h-12 text-slate-400 group-hover:text-farm-green mb-4" />
                    <span className="font-bold text-slate-600 group-hover:text-farm-green">User Report</span>
                  </button>
                  <button 
                    onClick={() => generateReport('Orders')}
                    className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-2xl hover:border-farm-green hover:bg-farm-light transition-all group"
                  >
                    <ShoppingCart className="w-12 h-12 text-slate-400 group-hover:text-farm-green mb-4" />
                    <span className="font-bold text-slate-600 group-hover:text-farm-green">Order Report</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'browse-products' && isCustomer && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {state.products.filter(p => p.status === 'APPROVED').map(product => (
                <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden card-hover">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                    <p className="text-slate-500 text-sm mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-farm-green">${product.price}</span>
                      <button 
                        onClick={() => onPlaceOrder?.(product)}
                        className="glossy-button"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {state.products.filter(p => p.status === 'APPROVED').length === 0 && (
                <div className="col-span-full text-center py-20">
                  <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-400">No products available yet</h3>
                </div>
              )}
            </div>
          )}

          {activeSection === 'add-product' && isEntrepreneur && (
            <div className="max-w-xl mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold mb-6">Add New Product</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  onAddProduct?.({
                    name: formData.get('name'),
                    price: Number(formData.get('price')),
                    description: formData.get('description'),
                    image: `https://picsum.photos/seed/${Math.random()}/400/300`,
                  });
                  (e.target as HTMLFormElement).reset();
                }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                    <input name="name" required className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-farm-green outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Price ($)</label>
                    <input name="price" type="number" required className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-farm-green outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                    <textarea name="description" required rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-farm-green outline-none" />
                  </div>
                  <button type="submit" className="w-full glossy-button py-3">Submit for Approval</button>
                </form>
              </div>
            </div>
          )}

          {activeSection === 'my-orders' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-lg font-bold">Order History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-sm">
                    <tr>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Price</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {state.orders.filter(o => isCustomer ? o.customerId === user.id : true).map(o => (
                      <tr key={o.id}>
                        <td className="px-6 py-4 font-mono text-xs">{o.id}</td>
                        <td className="px-6 py-4 font-medium">{o.productName}</td>
                        <td className="px-6 py-4">${o.price}</td>
                        <td className="px-6 py-4 text-sm">{new Date(o.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-xs font-bold",
                            o.status === 'PENDING' ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                          )}>
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>

        {isCustomer && (
          <footer className="bg-white border-t border-slate-200 p-6 text-center text-slate-500 text-sm">
            <p>&copy; 2026 Eco Dairy Farm. All rights reserved.</p>
          </footer>
        )}
      </div>
      {/* Add Customer Modal */}
      <AnimatePresence>
        {isAddCustomerModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddCustomerModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-serif font-bold text-slate-900">Add New Customer</h3>
                  <button onClick={() => setIsAddCustomerModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>

                <form onSubmit={handleAddCustomer} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Username</label>
                      <input 
                        required 
                        value={addCustomerData.username}
                        onChange={e => setAddCustomerData(prev => ({ ...prev, username: e.target.value }))}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-farm-green outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                      <input 
                        type="password"
                        required 
                        value={addCustomerData.password}
                        onChange={e => setAddCustomerData(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-farm-green outline-none" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Address</label>
                    <textarea 
                      required 
                      value={addCustomerData.address}
                      onChange={e => setAddCustomerData(prev => ({ ...prev, address: e.target.value }))}
                      rows={2}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-farm-green outline-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">What to buy</label>
                    <select 
                      value={addCustomerData.whatToBuy}
                      onChange={e => setAddCustomerData(prev => ({ ...prev, whatToBuy: e.target.value }))}
                      className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-farm-green outline-none"
                    >
                      <option value="Milk">Milk (দুধ)</option>
                      <option value="Sweets">Sweets (মিষ্টি)</option>
                      <option value="Cow">Cow (গরু)</option>
                      <option value="Goat">Goat (ছাগল)</option>
                      <option value="Others">Others (অন্যান্য)</option>
                    </select>
                  </div>

                  {addCustomerData.whatToBuy === 'Others' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Custom Product Name</label>
                      <input 
                        required 
                        value={addCustomerData.customProduct}
                        onChange={e => setAddCustomerData(prev => ({ ...prev, customProduct: e.target.value }))}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-farm-green outline-none" 
                      />
                    </motion.div>
                  )}

                  {addCustomerData.whatToBuy === 'Milk' && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Milk Quantity (kg)</label>
                      <input 
                        type="number"
                        required 
                        value={addCustomerData.milkQuantity}
                        onChange={e => setAddCustomerData(prev => ({ ...prev, milkQuantity: Number(e.target.value) }))}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-farm-green outline-none" 
                      />
                    </motion.div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Previous Balance (আগের বাকি)</label>
                      <input 
                        type="number"
                        value={addCustomerData.previousBalance}
                        onChange={e => setAddCustomerData(prev => ({ ...prev, previousBalance: Number(e.target.value) }))}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-farm-green outline-none" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Advance Deposit (অগ্রিম জামানত)</label>
                      <input 
                        type="number"
                        value={addCustomerData.advanceDeposit}
                        onChange={e => setAddCustomerData(prev => ({ ...prev, advanceDeposit: Number(e.target.value) }))}
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-farm-green outline-none" 
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <label className="block text-sm font-bold text-red-600 mb-1">Admin Password Confirmation</label>
                    <input 
                      type="password"
                      required 
                      placeholder="Enter Admin Password"
                      value={addCustomerData.adminPasswordConfirm}
                      onChange={e => setAddCustomerData(prev => ({ ...prev, adminPasswordConfirm: e.target.value }))}
                      className="w-full px-4 py-2 rounded-xl border border-red-200 focus:ring-2 focus:ring-red-500 outline-none" 
                    />
                  </div>

                  <button type="submit" className="w-full glossy-button py-4 text-lg font-bold mt-4">
                    Confirm Add Customer
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sell Modal */}
      <AnimatePresence>
        {isSellModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSellModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">নতুন সেল এন্ট্রি</h3>
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                      {selectedCustomerForSale ? selectedCustomerForSale.fullName : 'CUSTOMER USER'} - এর জন্য সেল এন্ট্রি
                    </p>
                  </div>
                </div>

                <form onSubmit={handleRecordSale} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-500 mb-2">কাস্টমার সিলেক্ট করুন</label>
                    <select 
                      required
                      value={sellData.customerId}
                      onChange={e => setSellData(prev => ({ ...prev, customerId: e.target.value }))}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700"
                    >
                      <option value="">কাস্টমার লিস্ট</option>
                      {state.users.filter(u => u.role === 'CUSTOMER').map(u => (
                        <option key={u.id} value={u.id}>{u.fullName} ({u.mobile})</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-500 mb-2">তারিখ</label>
                      <input 
                        type="date"
                        required 
                        value={sellData.date}
                        onChange={e => setSellData(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-500 mb-2">পরিমাণ (কেজি)</label>
                      <input 
                        type="number"
                        required 
                        value={sellData.quantity}
                        onChange={e => setSellData(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-500 mb-2">দাম (৳)</label>
                      <input 
                        type="number"
                        required 
                        value={sellData.price}
                        onChange={e => setSellData(prev => ({ ...prev, price: Number(e.target.value) }))}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-500 mb-2">আদায় (৳)</label>
                      <input 
                        type="number"
                        required 
                        value={sellData.collected}
                        onChange={e => setSellData(prev => ({ ...prev, collected: Number(e.target.value) }))}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700" 
                      />
                    </div>
                  </div>

                  <div className="bg-slate-50/50 rounded-[2rem] p-8 space-y-4 border border-slate-100">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-bold">আজকের মোট:</span>
                      <span className="text-xl font-bold text-slate-700">৳ {todayTotal}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-bold">আগের জমা:</span>
                      <span className="text-xl font-bold text-slate-700">৳ {previousBalance}</span>
                    </div>
                    <div className="h-px bg-slate-200 w-full my-2" />
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-600 font-bold text-lg">চূড়ান্ত বাকি:</span>
                      <span className="text-2xl font-bold text-red-500">৳ {finalBalance}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <label className="block text-sm font-bold text-slate-500 mb-2">পাসওয়ার্ড কনফার্ম করুন</label>
                    <input 
                      type="password"
                      required 
                      placeholder="আপনার পাসওয়ার্ড দিন"
                      value={sellData.passwordConfirm}
                      onChange={e => setSellData(prev => ({ ...prev, passwordConfirm: e.target.value }))}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-slate-700" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => setIsSellModalOpen(false)}
                      className="py-4 rounded-2xl bg-slate-100 text-slate-400 font-bold hover:bg-slate-200 transition-all"
                    >
                      বাতিল
                    </button>
                    <button 
                      type="submit" 
                      className="py-4 rounded-2xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
                    >
                      SALE CONFIRM
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
