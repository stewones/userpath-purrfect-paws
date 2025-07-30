'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/cart-context';
import { useUserPath } from '@/components/userpath-provider';

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { trackPurchase } = useUserPath();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (catId: string, newQuantity: number) => {
    updateQuantity(catId, newQuantity);
  };

  const handleRemoveItem = (catId: string, catName: string) => {
    removeFromCart(catId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);

    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      
      // Generate order ID for purchase tracking
      const orderId = `PPA-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Track purchase completion using UserPath's native purchase event
      trackPurchase(totalPrice, 'USD', {
        order_id: orderId,
        payment_method: 'demo_simulation',
        customer_type: 'cat_adopter',
        items_count: items.length,
        adoption_type: 'standard',
        cats: items.map(item => ({
          cat_id: item.cat.id,
          cat_name: item.cat.name,
          cat_breed: item.cat.breed,
          quantity: item.quantity,
          price: item.cat.price
        }))
      });
      
      // Clear cart after successful checkout
      clearCart();
      
      // Show success message (in a real app, you'd redirect to a success page)
      alert(`It's great to see you here! You can now check your UserPath dashboard and start asking questions 😉`);
    }, 3000);
  };

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any furry friends to your cart yet.
            </p>
            <Link
              href="/cats"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              data-action="browse-cats"
            >
              Browse Cats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Adoption Cart</h1>
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
            data-action="clear-cart"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.cat.id} className="bg-white rounded-lg shadow-sm p-6" data-cart-item={item.cat.id}>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.cat.image}
                      alt={item.cat.name}
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.cat.name}
                        </h3>
                        <p className="text-gray-600">{item.cat.breed}</p>
                        <p className="text-sm text-gray-500">{item.cat.age}</p>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.cat.personality.slice(0, 3).map((trait) => (
                            <span
                              key={trait}
                              className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs"
                            >
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                          ${item.cat.price}
                        </div>
                        {item.cat.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ${item.cat.originalPrice}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <label htmlFor={`quantity-${item.cat.id}`} className="text-sm text-gray-700">
                          Quantity:
                        </label>
                        <select
                          id={`quantity-${item.cat.id}`}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.cat.id, parseInt(e.target.value))}
                          className="border border-gray-300 rounded px-2 py-1 text-sm text-black"
                          data-action="update-quantity"
                          data-cat-id={item.cat.id}
                        >
                          {[1, 2, 3].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                      
                      <button
                        onClick={() => handleRemoveItem(item.cat.id, item.cat.name)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                        data-action="remove-item"
                        data-cat-id={item.cat.id}
                        data-cat-name={item.cat.name}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 text-gray-900">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24" data-section="order-summary">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.cat.id} className="flex justify-between text-sm">
                    <span>{item.cat.name} x{item.quantity}</span>
                    <span>${(item.cat.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                data-action="checkout"
                data-items-count={items.length}
                data-total-value={totalPrice}
              >
                {isCheckingOut ? 'Processing...' : 'Start Adoption Process'}
              </button>
              
              <p className="text-xs text-gray-500 mt-3 text-center">
                * This is a demo. No real payments will be processed.
              </p>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">1.</span>
                    Application review (24-48 hours)
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">2.</span>
                    Meet & greet with your chosen cat(s)
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">3.</span>
                    Home visit and final approval
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">4.</span>
                    Take your new friend home! 🎉
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 