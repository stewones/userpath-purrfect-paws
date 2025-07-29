'use client';

import Link from 'next/link';
import { FaHeart, FaPaw, FaEnvelope, FaPhone, FaMapMarkerAlt, FaExternalLinkAlt } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <FaPaw className="text-2xl text-orange-400" />
              <span className="text-2xl font-bold">Purrfect Paws</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Connecting loving families with cats in need of forever homes. Every adoption creates a 
              bond that lasts a lifetime.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <FaHeart className="text-orange-400" />
              <span>Made with love for our feline friends</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/cats" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Browse Cats
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-orange-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-300 hover:text-orange-400 transition-colors">
                  Adoption Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <FaPhone className="text-orange-400" />
                <span>(555) PAW-LOVE</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaEnvelope className="text-orange-400" />
                <span>hello@purrfectpaws.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaMapMarkerAlt className="text-orange-400" />
                <span>123 Cat Lane, Pet City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 Purrfect Paws. All rights reserved.
            </div>
            
            {/* UserPath Disclaimer */}
            <div className="text-gray-400 text-sm text-center md:text-right">
              <p className="mb-1">
                The only purpose of this website is to showcase{' '}
                <a 
                  href="https://userpath.co" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-400 hover:text-orange-300 transition-colors inline-flex items-center space-x-1"
                >
                  <span>UserPath</span>
                  <FaExternalLinkAlt className="text-xs" />
                </a>
                {' '}capabilities
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 