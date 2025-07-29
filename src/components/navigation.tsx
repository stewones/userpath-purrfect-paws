'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/contexts/cart-context';
import { FaPaw, FaSearch, FaShoppingCart, FaBars } from 'react-icons/fa';

export function Navigation() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/cats', label: 'Our Cats' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  // UserPath automatically tracks clicks, only need custom cart context for badge updates

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-soft border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-3 font-bold text-xl text-gray-900 hover:text-gray-700 transition-colors group"
            >
              <div className="p-2 bg-orange-100 rounded-2xl group-hover:bg-orange-200 transition-colors">
                <FaPaw className="text-xl text-orange-500" />
              </div>
              <span className="heading-font text-2xl">Purrfect Paws</span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-2 items-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-orange-100 text-orange-700 shadow-soft'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {/* Search Icon */}
            <button 
              className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-2xl transition-all duration-200"
            >
              <FaSearch className="w-5 h-5" />
            </button>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-2xl transition-all duration-200"
            >
              <FaShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold shadow-soft">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-2xl transition-all duration-200">
              <FaBars className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile menu (hidden by default) */}
        <div className="md:hidden border-t border-gray-100 py-6">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-6 py-3 rounded-2xl text-base font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? 'bg-orange-100 text-orange-700 shadow-soft'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 