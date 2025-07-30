import { Cat } from '@/lib/types';
import { fetchCats } from '@/lib/cat-api';
import { CatsClient } from './cats-client';

export default async function CatsPage() {
  let cats: Cat[] = [];
  let error: string | null = null;

  try {
    cats = await fetchCats(24);
  } catch (e) {
    console.error('Error loading cats:', e);
    error = 'Failed to load cats. Please try again later.';
  }

  if (error) {
    return (
      <div className="bg-gray-50/90 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-20">
            <h1 className="heading-font text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Find Your Perfect Companion
            </h1>
            <p className="text-xl text-red-600 mb-8">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50/90 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="heading-font text-5xl md:text-6xl font-bold text-gray-900 text-balance">
            Find Your Perfect Companion
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our adorable cats and kittens looking for loving homes
          </p>
        </div>

        {/* Client Component with all the interactive features */}
        <CatsClient initialCats={cats} />
      </div>
    </div>
  );
} 