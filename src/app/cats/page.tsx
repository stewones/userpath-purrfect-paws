import fs from 'fs';
import path from 'path';
import { Cat } from '@/lib/types';
import CatsClient from '@/components/cats-client';

// Server-side function to load cats from JSON
async function getCats(): Promise<Cat[]> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'cats.json');
    
    // Check if file exists, if not generate some fallback data
    if (!fs.existsSync(filePath)) {
      console.warn('cats.json not found, creating fallback data');
      // Create fallback data
      return [];
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const cats: Cat[] = JSON.parse(fileContents);
    return cats;
  } catch (error) {
    console.error('Error loading cats:', error);
    return [];
  }
}

export default async function CatsPage() {
  const cats = await getCats();

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

        {/* Client Component with Interactive Features */}
        <CatsClient initialCats={cats} />
      </div>
    </div>
  );
} 