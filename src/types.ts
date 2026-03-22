export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Silk Evening Gown',
    price: 299,
    description: 'A stunning midnight blue silk gown with a tailored fit and elegant drape.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800',
    category: 'Apparel'
  },
  {
    id: '2',
    name: 'Leather Chelsea Boots',
    price: 185,
    description: 'Handcrafted Italian leather boots with a durable sole and classic silhouette.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    category: 'Footwear'
  },
  {
    id: '3',
    name: 'Minimalist Gold Watch',
    price: 450,
    description: '18k gold plated timepiece with a sapphire crystal face and leather strap.',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories'
  },
  {
    id: '4',
    name: 'Cashmere Oversized Sweater',
    price: 210,
    description: 'Ultra-soft Mongolian cashmere sweater in a neutral oatmeal tone.',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800',
    category: 'Apparel'
  },
  {
    id: '5',
    name: 'Structured Tote Bag',
    price: 320,
    description: 'Pebbled leather tote with multiple compartments and gold hardware.',
    image: 'https://images.unsplash.com/photo-1584917033904-493bb3c3cc0a?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories'
  },
  {
    id: '6',
    name: 'Linen Summer Blazer',
    price: 175,
    description: 'Breathable linen blend blazer perfect for warm evening events.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    category: 'Apparel'
  }
];
