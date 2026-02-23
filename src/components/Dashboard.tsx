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
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  state, 
  onLogout, 
  onApproveUser, 
  onApproveProduct,
  onAddProduct,
  onPlaceOrder
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('dashboard');

  const isAdmin = user.role === 'ADMIN';
  const isEntrepreneur = user.role === 'ENTREPRENEUR';
  const isCustomer = user.role === 'CUSTOMER';

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
    </div>
  );
};
