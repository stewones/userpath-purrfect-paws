import { Cat } from './types';

// Cat breed data with pricing and descriptions
const CAT_BREEDS = [
  {
    breed: 'British Shorthair',
    basePrice: 850,
    personality: ['Calm', 'Independent', 'Affectionate'],
    description: 'A sturdy, dense-coated British breed with a notably broad face and copper-colored eyes.'
  },
  {
    breed: 'Maine Coon',
    basePrice: 1200,
    personality: ['Gentle', 'Playful', 'Intelligent'],
    description: 'Large, rugged cats with long, flowing coats and bushy tails.'
  },
  {
    breed: 'Persian',
    basePrice: 950,
    personality: ['Sweet', 'Gentle', 'Quiet'],
    description: 'Known for their long, luxurious coats and sweet personalities.'
  },
  {
    breed: 'Siamese',
    basePrice: 750,
    personality: ['Vocal', 'Social', 'Intelligent'],
    description: 'Elegant cats with striking color points and bright blue eyes.'
  },
  {
    breed: 'Ragdoll',
    basePrice: 900,
    personality: ['Docile', 'Placid', 'Affectionate'],
    description: 'Large, semi-long haired cats with captivating blue eyes.'
  },
  {
    breed: 'Scottish Fold',
    basePrice: 800,
    personality: ['Sweet', 'Charming', 'Adaptable'],
    description: 'Known for their unique folded ears and round faces.'
  },
  {
    breed: 'Bengal',
    basePrice: 1100,
    personality: ['Active', 'Intelligent', 'Curious'],
    description: 'Wild-looking cats with beautiful spotted or marbled coats.'
  },
  {
    breed: 'Russian Blue',
    basePrice: 700,
    personality: ['Reserved', 'Intelligent', 'Loyal'],
    description: 'Elegant cats with silvery-blue coats and bright green eyes.'
  }
];

const CAT_NAMES = [
  'Luna', 'Oliver', 'Bella', 'Charlie', 'Lucy', 'Max', 'Lily', 'Simba',
  'Milo', 'Chloe', 'Tiger', 'Sophie', 'Jack', 'Molly', 'Leo', 'Coco',
  'Oscar', 'Daisy', 'Toby', 'Rosie', 'Felix', 'Poppy', 'Smokey', 'Mittens',
  'Shadow', 'Princess', 'Ginger', 'Whiskers', 'Patches', 'Snowball'
];

const COLORS = [
  'Orange Tabby', 'Black', 'White', 'Gray', 'Calico', 'Tortoiseshell',
  'Tuxedo', 'Brown Tabby', 'Silver', 'Cream', 'Blue', 'Seal Point'
];

// Generate random cat data
function generateCatData(id: string, imageUrl: string, breedData: typeof CAT_BREEDS[0]): Cat {
  const isOnSale = Math.random() < 0.3;
  const ageVariation = Math.random();
  const priceVariation = (Math.random() - 0.5) * 0.4; // ±20%
  
  let age: string;
  if (ageVariation < 0.3) age = 'Kitten (8-16 weeks)';
  else if (ageVariation < 0.6) age = 'Young (4-12 months)';
  else if (ageVariation < 0.8) age = 'Adult (1-7 years)';
  else age = 'Senior (7+ years)';

  const basePrice = breedData.basePrice + (breedData.basePrice * priceVariation);
  const price = Math.round(basePrice / 50) * 50; // Round to nearest $50
  
  return {
    id,
    name: CAT_NAMES[Math.floor(Math.random() * CAT_NAMES.length)],
    breed: breedData.breed,
    age,
    price,
    originalPrice: isOnSale ? Math.round(price * 1.2 / 50) * 50 : undefined,
    image: imageUrl,
    description: breedData.description,
    personality: breedData.personality,
    isAdopted: Math.random() < 0.1, // 10% chance of being adopted
    isFeatured: Math.random() < 0.2, // 20% chance of being featured
    gender: Math.random() < 0.5 ? 'male' : 'female',
    size: Math.random() < 0.3 ? 'small' : Math.random() < 0.7 ? 'medium' : 'large',
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    vaccinated: Math.random() < 0.9, // 90% vaccinated
    neutered: Math.random() < 0.8 // 80% neutered
  };
}

// Fetch cats from The Cat API
export async function fetchCats(limit: number = 20): Promise<Cat[]> {
  try {
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}&has_breeds=1`);
    if (!response.ok) {
      throw new Error('Failed to fetch cats');
    }
    
    const catImages = await response.json();
    
    return catImages.map((catImage: any, index: number) => {
      const breedData = CAT_BREEDS[index % CAT_BREEDS.length];
      return generateCatData(catImage.id, catImage.url, breedData);
    });
  } catch (error) {
    console.error('Error fetching cats:', error);
    // Return mock data if API fails
    return generateMockCats(limit);
  }
}

// Generate mock cats for development/fallback
function generateMockCats(count: number): Cat[] {
  return Array.from({ length: count }, (_, index) => {
    const breedData = CAT_BREEDS[index % CAT_BREEDS.length];
    return generateCatData(
      `mock-${index}`,
      `https://cataas.com/cat?width=400&height=300&t=${index}`,
      breedData
    );
  });
}

// Fetch featured cats - using stable mock data to prevent infinite reloading
export async function fetchFeaturedCats(): Promise<Cat[]> {
  // Use deterministic featured cats to prevent constant reloading
  const featuredCatsData = [
    {
      id: 'featured-1',
      image: 'https://cataas.com/cat?width=400&height=300&t=1',
      breedIndex: 0, // British Shorthair
      seed: 1
    },
    {
      id: 'featured-2', 
      image: 'https://cataas.com/cat?width=400&height=300&t=2',
      breedIndex: 1, // Maine Coon
      seed: 2
    },
    {
      id: 'featured-3',
      image: 'https://cataas.com/cat?width=400&height=300&t=3', 
      breedIndex: 4, // Ragdoll
      seed: 3
    },
    {
      id: 'featured-4',
      image: 'https://cataas.com/cat?width=400&height=300&t=4',
      breedIndex: 6, // Bengal
      seed: 4
    }
  ];

  return featuredCatsData.map(data => {
    const breedData = CAT_BREEDS[data.breedIndex];
    return generateDeterministicCatData(data.id, data.image, breedData, data.seed, true);
  });
}

// Generate deterministic cat data using a seed to prevent randomness
function generateDeterministicCatData(id: string, imageUrl: string, breedData: typeof CAT_BREEDS[0], seed: number, isFeatured: boolean = false): Cat {
  // Use seed to make deterministic "random" choices
  const rand1 = (seed * 9301 + 49297) % 233280 / 233280;
  const rand2 = (seed * 9307 + 49299) % 233280 / 233280;
  const rand3 = (seed * 9311 + 49301) % 233280 / 233280;
  const rand4 = (seed * 9313 + 49303) % 233280 / 233280;
  
  const isOnSale = rand1 < 0.3;
  const priceVariation = (rand2 - 0.5) * 0.4; // ±20%
  
  let age: string;
  if (rand3 < 0.3) age = 'Kitten (8-16 weeks)';
  else if (rand3 < 0.6) age = 'Young (4-12 months)';
  else if (rand3 < 0.8) age = 'Adult (1-7 years)';
  else age = 'Senior (7+ years)';

  const basePrice = breedData.basePrice + (breedData.basePrice * priceVariation);
  const price = Math.round(basePrice / 50) * 50; // Round to nearest $50
  
  const nameIndex = Math.floor(rand4 * CAT_NAMES.length);
  const colorIndex = Math.floor(rand1 * COLORS.length);
  
  return {
    id,
    name: CAT_NAMES[nameIndex],
    breed: breedData.breed,
    age,
    price,
    originalPrice: isOnSale ? Math.round(price * 1.2 / 50) * 50 : undefined,
    image: imageUrl,
    description: breedData.description,
    personality: breedData.personality,
    isAdopted: false, // Featured cats are always available
    isFeatured,
    gender: rand2 < 0.5 ? 'male' : 'female',
    size: rand3 < 0.3 ? 'small' : rand3 < 0.7 ? 'medium' : 'large',
    color: COLORS[colorIndex],
    vaccinated: rand1 > 0.1, // 90% vaccinated
    neutered: rand2 > 0.2 // 80% neutered
  };
}

// Fetch single cat by ID
export async function fetchCatById(id: string): Promise<Cat | null> {
  try {
    const response = await fetch(`https://api.thecatapi.com/v1/images/${id}`);
    if (!response.ok) {
      return null;
    }
    
    const catImage = await response.json();
    const breedData = CAT_BREEDS[Math.floor(Math.random() * CAT_BREEDS.length)];
    
    return generateCatData(catImage.id, catImage.url, breedData);
  } catch (error) {
    console.error('Error fetching cat:', error);
    return null;
  }
} 