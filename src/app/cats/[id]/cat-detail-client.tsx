'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/cart-context';
import { useUserPath } from '@/components/userpath-provider';
import { Cat } from '@/lib/types';
import { 
  FaHeart, 
  FaShare, 
  FaArrowLeft, 
  FaCheckCircle, 
  FaTimesCircle,
  FaVenus,
  FaMars,
  FaRuler,
  FaPalette,
  FaSyringe,
  FaCut
} from 'react-icons/fa';

interface CatDetailClientProps {
  cat: Cat;
}

export default function CatDetailClient({ cat }: CatDetailClientProps) {
  const { addToCart } = useCart();
  const { trackEvent } = useUserPath();
  const [imageLoading, setImageLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleAdopt = () => {
    if (cat.isAdopted) return;
    
    addToCart(cat);
    trackEvent('cat_detail_adopt', {
      cat_id: cat.id,
      cat_name: cat.name,
      cat_breed: cat.breed,
      cat_price: cat.price
    });
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    trackEvent('cat_favorited', {
      cat_id: cat?.id,
      cat_name: cat?.name,
      favorited: !isFavorited
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Meet ${cat?.name} - Available for Adoption`,
          text: `${cat?.name} is a ${cat?.age} ${cat?.breed} looking for a loving home!`,
          url: window.location.href,
        });
        trackEvent('cat_shared', { cat_id: cat?.id, method: 'native' });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      trackEvent('cat_shared', { cat_id: cat?.id, method: 'clipboard' });
      // You could show a toast notification here
    }
  };

  return (
    <div className="bg-gray-50/90 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/cats"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8 btn-ghost"
        >
          <FaArrowLeft className="text-sm" />
          <span>Back to All Cats</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="relative aspect-square card overflow-hidden">
              {imageLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="text-gray-400">Loading...</div>
                </div>
              )}
              <Image
                src={cat.image}
                alt={cat.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                priority
                onLoad={() => setImageLoading(false)}
              />
              {cat.isAdopted && (
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                  <div className="bg-red-500 text-white px-8 py-4 rounded-3xl font-semibold text-xl">
                    Already Adopted
                  </div>
                </div>
              )}
              {cat.originalPrice && !cat.isAdopted && (
                <div className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-2xl font-semibold shadow-soft">
                  Sale!
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleFavorite}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 rounded-2xl font-medium transition-all duration-200 ${
                  isFavorited
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-soft hover:shadow-soft-lg'
                }`}
              >
                <FaHeart className={isFavorited ? 'fill-current' : ''} />
                <span>{isFavorited ? 'Favorited' : 'Add to Favorites'}</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center space-x-2 px-6 py-4 bg-white text-gray-600 hover:bg-gray-50 rounded-2xl font-medium transition-all duration-200 shadow-soft hover:shadow-soft-lg"
              >
                <FaShare />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h1 className="heading-font text-5xl font-bold text-gray-900">
                  {cat.name}
                </h1>
                <div className="text-3xl text-gray-500">
                  {cat.gender === 'male' ? <FaMars /> : <FaVenus />}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xl text-gray-600">{cat.breed}</span>
                <span className="text-gray-400">•</span>
                <span className="text-xl text-gray-600">{cat.age}</span>
              </div>
            </div>

            {/* Personality Traits */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Personality</h3>
              <div className="flex flex-wrap gap-3">
                {cat.personality.map((trait) => (
                  <span
                    key={trait}
                    className="bg-orange-100 text-orange-700 px-4 py-2 rounded-2xl font-medium"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">About {cat.name}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {cat.description} {cat.name} is a wonderful {cat.gender === 'male' ? 'boy' : 'girl'} who would make a perfect addition to any loving family.
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="card p-6 text-center space-y-3">
                <FaRuler className="text-2xl text-orange-500 mx-auto" />
                <div>
                  <div className="font-semibold text-gray-900">Size</div>
                  <div className="text-gray-600 capitalize">{cat.size}</div>
                </div>
              </div>
              <div className="card p-6 text-center space-y-3">
                <FaPalette className="text-2xl text-orange-500 mx-auto" />
                <div>
                  <div className="font-semibold text-gray-900">Color</div>
                  <div className="text-gray-600">{cat.color}</div>
                </div>
              </div>
              <div className="card p-6 text-center space-y-3">
                <FaSyringe className="text-2xl text-orange-500 mx-auto" />
                <div>
                  <div className="font-semibold text-gray-900">Vaccinated</div>
                  <div className="flex items-center justify-center space-x-1">
                    {cat.vaccinated ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    <span className={cat.vaccinated ? 'text-green-600' : 'text-red-600'}>
                      {cat.vaccinated ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="card p-6 text-center space-y-3">
                <FaCut className="text-2xl text-orange-500 mx-auto" />
                <div>
                  <div className="font-semibold text-gray-900">Spayed/Neutered</div>
                  <div className="flex items-center justify-center space-x-1">
                    {cat.neutered ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                    <span className={cat.neutered ? 'text-green-600' : 'text-red-600'}>
                      {cat.neutered ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing and Adoption */}
            <div className="card p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    ${cat.price}
                  </div>
                  {cat.originalPrice && (
                    <div className="text-lg text-gray-500 line-through">
                      ${cat.originalPrice}
                    </div>
                  )}
                  <div className="text-sm text-gray-600 mt-1">
                    Adoption fee includes initial vet care
                  </div>
                </div>
                <button
                  onClick={handleAdopt}
                  disabled={cat.isAdopted}
                  className={`px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-200 transform ${
                    cat.isAdopted
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'btn-primary hover:scale-105'
                  }`}
                >
                  {cat.isAdopted ? 'Already Adopted' : 'Add to Cart'}
                </button>
              </div>
              
              {!cat.isAdopted && (
                <div className="text-sm text-gray-600 bg-orange-50 p-4 rounded-2xl">
                  <strong>Ready to adopt?</strong> Add {cat.name} to your cart to begin the adoption process. 
                  We'll guide you through each step to ensure the perfect match!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related/Similar Cats could go here */}
        <div className="mt-20 text-center">
          <Link
            href="/cats"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <span>Browse More Cats</span>
            <FaArrowLeft className="rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
}