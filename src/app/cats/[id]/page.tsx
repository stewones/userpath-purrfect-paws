import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Cat } from '@/lib/types';
import CatDetailClient from './cat-detail-client';

// Server-side function to get cat by ID
async function getCatById(id: string): Promise<Cat | null> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'cats.json');
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const cats: Cat[] = JSON.parse(fileContents);
    
    return cats.find(cat => cat.id === id) || null;
  } catch (error) {
    console.error('Error loading cat:', error);
    return null;
  }
}

export default async function CatDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cat = await getCatById(id);
  
  if (!cat) {
    notFound();
  }

  return <CatDetailClient cat={cat} />;
} 