'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/cart-context';
import { Cat } from '@/lib/types';
import { FaSearch, FaFilter, FaTimes, FaPaw } from 'react-icons/fa';

interface CatsClientProps {
  initialCats: Cat[];
}

export default function CatsClient({ initialCats }: CatsClientProps) {
  const { addToCart } = useCart();
  const [filteredCats, setFilteredCats] = useState<Cat[]>(initialCats);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');
  const [priceSort, setPriceSort] = useState('default');
  const [showAdopted, setShowAdopted] = useState(false);

  // Filter and sort cats whenever filters change
  useEffect(() => {
    let filtered = [...initialCats];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.personality.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Breed filter
    if (selectedBreed !== 'all') {
      filtered = filtered.filter(cat => cat.breed === selectedBreed);
    }

    // Age filter
    if (ageFilter !== 'all') {
      filtered = filtered.filter(cat => {
        if (ageFilter === 'kitten') return cat.age.includes('Kitten');
        if (ageFilter === 'young') return cat.age.includes('Young');
        if (ageFilter === 'adult') return cat.age.includes('Adult');
        if (ageFilter === 'senior') return cat.age.includes('Senior');
        return true;
      });
    }

    // Show/hide adopted cats
    if (!showAdopted) {
      filtered = filtered.filter(cat => !cat.isAdopted);
    }

    // Sort by price
    if (priceSort === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceSort === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredCats(filtered);
  }, [initialCats, searchTerm, selectedBreed, ageFilter, priceSort, showAdopted]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === 'breed') setSelectedBreed(value);
    if (filterType === 'age') setAgeFilter(value);
    if (filterType === 'price') setPriceSort(value);
  };

  const handleQuickAdopt = (cat: Cat, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (cat.isAdopted) {
      return; // Already adopted
    }

    addToCart(cat); // This tracks the add_to_cart event
  };

  const breeds = [...new Set(initialCats.map(cat => cat.breed))].sort();

  const clearFilters = () => {
    handleSearch('');
    setSelectedBreed('all');
    setAgeFilter('all');
    setPriceSort('default');
  };

  return (
    <>
      {/* Search and Filters */}
      <div className="card p-8 mb-12 text-gray-900" data-section="filters">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Search */}
          <div className="lg:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium mb-3">
              <FaSearch className="inline mr-2" />
              Search
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by name, breed, or personality..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-orange-500 focus:border-orange-500 transition-colors"
              data-filter="search"
            />
          </div>

          {/* Breed Filter */}
          <div>
            <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-3">
              <FaFilter className="inline mr-2" />
              Breed
            </label>
            <select
              id="breed"
              value={selectedBreed}
              onChange={(e) => handleFilterChange('breed', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-orange-500 focus:border-orange-500 transition-colors"
              data-filter="breed"
            >
              <option value="all">All Breeds</option>
              {breeds.map(breed => (
                <option key={breed} value={breed}>{breed}</option>
              ))}
            </select>
          </div>

          {/* Age Filter */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-3">
              Age
            </label>
            <select
              id="age"
              value={ageFilter}
              onChange={(e) => handleFilterChange('age', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-orange-500 focus:border-orange-500 transition-colors"
              data-filter="age"
            >
              <option value="all">All Ages</option>
              <option value="kitten">Kittens</option>
              <option value="young">Young</option>
              <option value="adult">Adult</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-3">
              Sort by Price
            </label>
            <select
              id="sort"
              value={priceSort}
              onChange={(e) => handleFilterChange('price', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-orange-500 focus:border-orange-500 transition-colors"
              data-filter="price-sort"
            >
              <option value="default">Default</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showAdopted}
              onChange={(e) => setShowAdopted(e.target.checked)}
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              data-filter="show-adopted"
            />
            <span className="ml-3 text-sm text-gray-700">Show adopted cats</span>
          </label>
          
          {(searchTerm || selectedBreed !== 'all' || ageFilter !== 'all' || priceSort !== 'default') && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors"
              data-action="clear-filters"
            >
              <FaTimes className="text-xs" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center mb-8">
        <p className="text-gray-600 text-lg">
          Showing <span className="font-semibold">{filteredCats.length}</span> of <span className="font-semibold">{initialCats.length}</span> cats
        </p>
      </div>

      {/* Cat Grid */}
      {filteredCats.length === 0 ? (
        /* No Results */
        <div className="text-center py-20">
          <div className="text-6xl mb-6">
            <FaPaw className="mx-auto text-gray-400" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">No cats found</h3>
          <p className="text-gray-600 mb-8 text-lg">Try adjusting your search or filters</p>
          <button
            onClick={clearFilters}
            className="btn-primary"
            data-action="reset-filters"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCats.map((cat) => (
            <Link
              key={cat.id}
              href={`/cats/${cat.id}`}
              className="card-interactive overflow-hidden"
              data-cat-id={cat.id}
              data-cat-name={cat.name}
              data-cat-breed={cat.breed}
              data-cat-price={cat.price}
              data-is-adopted={cat.isAdopted}
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {cat.isAdopted && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-6 py-3 rounded-2xl font-semibold">
                      Adopted
                    </span>
                  </div>
                )}
                {cat.originalPrice && !cat.isAdopted && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-2xl text-sm font-semibold shadow-soft">
                    Sale
                  </div>
                )}
              </div>
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-xl text-gray-900">{cat.name}</h3>
                  <span className="text-sm text-gray-500">{cat.gender === 'male' ? '♂' : '♀'}</span>
                </div>
                
                <p className="text-gray-600 mb-2">{cat.breed}</p>
                <p className="text-gray-500 mb-4">{cat.age}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {cat.personality.slice(0, 2).map((trait) => (
                    <span
                      key={trait}
                      className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
                
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
                    className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 transform ${
                      cat.isAdopted
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-105'
                    }`}
                    data-action="quick-add"
                    data-cat-id={cat.id}
                    data-cat-name={cat.name}
                  >
                    {cat.isAdopted ? 'Adopted' : 'Quick Add'}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}