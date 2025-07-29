export interface Cat {
  id: string;
  name: string;
  breed: string;
  age: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  personality: string[];
  isAdopted: boolean;
  isFeatured: boolean;
  gender: 'male' | 'female';
  size: 'small' | 'medium' | 'large';
  color: string;
  vaccinated: boolean;
  neutered: boolean;
}

export interface CartItem {
  cat: Cat;
  quantity: number;
  addedAt: Date;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (cat: Cat) => void;
  removeFromCart: (catId: string) => void;
  updateQuantity: (catId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  status: 'pending' | 'confirmed' | 'processing' | 'adopted';
  createdAt: Date;
} 