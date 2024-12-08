import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Wallet, ArrowDownCircle, ArrowUpCircle, LayoutList, BarChart, Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: '/deposit', icon: ArrowDownCircle, text: 'Deposit Uang Brangkas' },
    { to: '/withdraw', icon: ArrowUpCircle, text: 'Withdraw Uang Brangkas' },
    { to: '/transactions', icon: LayoutList, text: 'Brangkas Trans' },
    { to: '/analytics', icon: BarChart, text: 'Grafik Pemasukkan dan Pengeluaran' },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 right-4 z-50 bg-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-transform duration-300
        lg:translate-x-0 lg:w-64
        ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Wallet className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-xl text-gray-800">Brangkas Trans Kota Kita</span>
          </div>
        </div>
        <nav className="p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg transition-colors mb-2
                ${isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{item.text}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;