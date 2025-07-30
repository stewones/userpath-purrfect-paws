const fs = require('fs');
const path = require('path');

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
  'Shadow', 'Princess', 'Ginger', 'Whiskers', 'Patches', 'Snowball',
  'Oreo', 'Garfield', 'Nala', 'Salem', 'Boots', 'Sassy', 'Tigger', 'Peanut',
  'Storm', 'Midnight', 'Honey', 'Jasper', 'Ruby', 'Chester', 'Misty', 'Bandit'
];

const COLORS = [
  'Orange Tabby', 'Black', 'White', 'Gray', 'Calico', 'Tortoiseshell',
  'Tuxedo', 'Brown Tabby', 'Silver', 'Cream', 'Blue', 'Seal Point'
];

// Generate deterministic cat data using a seed
function generateDeterministicCatData(id, imageUrl, breedData, seed) {
  // Use seed to make deterministic "random" choices
  const rand1 = (seed * 9301 + 49297) % 233280 / 233280;
  const rand2 = (seed * 9307 + 49299) % 233280 / 233280;
  const rand3 = (seed * 9311 + 49301) % 233280 / 233280;
  const rand4 = (seed * 9313 + 49303) % 233280 / 233280;
  const rand5 = (seed * 9317 + 49307) % 233280 / 233280;
  
  const isOnSale = rand1 < 0.25; // 25% chance of sale
  const priceVariation = (rand2 - 0.5) * 0.4; // ±20%
  
  let age;
  if (rand3 < 0.25) age = 'Kitten (8-16 weeks)';
  else if (rand3 < 0.5) age = 'Young (4-12 months)';
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
    originalPrice: isOnSale ? Math.round(price * 1.3 / 50) * 50 : undefined,
    image: imageUrl,
    description: breedData.description,
    personality: breedData.personality,
    isAdopted: rand5 < 0.08, // 8% chance of being adopted
    isFeatured: rand1 < 0.15, // 15% chance of being featured
    gender: rand2 < 0.5 ? 'male' : 'female',
    size: rand3 < 0.3 ? 'small' : rand3 < 0.7 ? 'medium' : 'large',
    color: COLORS[colorIndex],
    vaccinated: rand1 > 0.1, // 90% vaccinated
    neutered: rand2 > 0.2 // 80% neutered
  };
}

// Fetch cats from The Cat API and generate fallback data
async function generateCatData(limit = 48) {
  const cats = [];
  
  try {
    console.log('Fetching cat images from The Cat API...');
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}&has_breeds=1`);
    
    if (response.ok) {
      const catImages = await response.json();
      console.log(`Successfully fetched ${catImages.length} cat images`);
      
      catImages.forEach((catImage, index) => {
        const breedData = CAT_BREEDS[index % CAT_BREEDS.length];
        const cat = generateDeterministicCatData(catImage.id, catImage.url, breedData, index + 1);
        cats.push(cat);
      });
    } else {
      throw new Error(`API responded with status: ${response.status}`);
    }
  } catch (error) {
    console.warn('Failed to fetch from Cat API, generating mock data:', error.message);
    
    // Generate mock data as fallback
    for (let i = 0; i < limit; i++) {
      const breedData = CAT_BREEDS[i % CAT_BREEDS.length];
      const cat = generateDeterministicCatData(
        `cat-${i + 1}`,
        `https://cataas.com/cat?width=400&height=400&t=${i + 1}`,
        breedData,
        i + 1
      );
      cats.push(cat);
    }
  }
  
  return cats;
}

async function main() {
  console.log('🐱 Generating cat data for build time...');
  
  try {
    // Generate cat data
    const cats = await generateCatData(48); // Generate 48 cats
    
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Write cats data to JSON file
    const catsFilePath = path.join(dataDir, 'cats.json');
    fs.writeFileSync(catsFilePath, JSON.stringify(cats, null, 2));
    
    // Generate some stats
    const adoptedCount = cats.filter(cat => cat.isAdopted).length;
    const featuredCount = cats.filter(cat => cat.isFeatured).length;
    const breedCounts = cats.reduce((acc, cat) => {
      acc[cat.breed] = (acc[cat.breed] || 0) + 1;
      return acc;
    }, {});
    
    console.log(`✅ Generated ${cats.length} cats successfully!`);
    console.log(`📊 Stats:`);
    console.log(`   - ${cats.length - adoptedCount} available cats`);
    console.log(`   - ${adoptedCount} adopted cats`);
    console.log(`   - ${featuredCount} featured cats`);
    console.log(`   - Breeds: ${Object.keys(breedCounts).join(', ')}`);
    console.log(`📁 Saved to: ${catsFilePath}`);
    
  } catch (error) {
    console.error('❌ Error generating cat data:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { generateCatData };