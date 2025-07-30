'use client';

import { useCart } from "@/contexts/cart-context";
import { Cat } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface HomeClientProps {
  featuredCats: Cat[];
}

export function HomeClient({ featuredCats }: HomeClientProps) {
  const { addToCart } = useCart();

  const handleQuickAdopt = (cat: Cat, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (cat.isAdopted) {
      return; // UserPath will track the click automatically
    }

    addToCart(cat); // This already tracks the add_to_cart event in the cart context
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {featuredCats.map((cat) => (
        <Link
          key={cat.id}
          href={`/cats/${cat.id}`}
          className="card-interactive overflow-hidden"
        >
          <div className="aspect-square overflow-hidden">
            <Image
              src={cat.image}
              alt={cat.name}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-8">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-xl text-gray-900">{cat.name}</h3>
              <span className="text-sm text-gray-500">{cat.gender === 'male' ? '♂' : '♀'}</span>
            </div>
            <p className="text-gray-600 mb-2">{cat.breed}</p>
            <p className="text-gray-500 mb-6">{cat.age}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900">
                  ${cat.price}
                </span>
                {cat.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${cat.originalPrice}
                  </span>
                )}
              </div>
              <button
                onClick={(e) => handleQuickAdopt(cat, e)}
                disabled={cat.isAdopted}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                  cat.isAdopted
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600 transform hover:scale-105'
                }`}
              >
                {cat.isAdopted ? 'Adopted' : 'Quick Add'}
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}