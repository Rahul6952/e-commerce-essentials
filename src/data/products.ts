import { Product } from '@/contexts/CartContext';

export const products: Product[] = [
  {
    id: '1',
    name: 'Merino Wool Sweater',
    price: 128,
    image: '/products/sweater.jpg',
    category: 'Tops',
    description: 'Luxuriously soft merino wool sweater with a relaxed fit. Perfect for layering or wearing on its own during cooler months.'
  },
  {
    id: '2',
    name: 'Linen Blend Trousers',
    price: 98,
    image: '/products/trousers.jpg',
    category: 'Bottoms',
    description: 'Breathable linen-blend trousers with a tailored silhouette. Features a comfortable elastic waistband and side pockets.'
  },
  {
    id: '3',
    name: 'Cashmere Scarf',
    price: 185,
    image: '/products/scarf.jpg',
    category: 'Accessories',
    description: 'Ultra-soft cashmere scarf in a timeless design. Generously sized for multiple styling options.'
  },
  {
    id: '4',
    name: 'Organic Cotton Tee',
    price: 45,
    image: '/products/tee.jpg',
    category: 'Tops',
    description: 'Essential organic cotton t-shirt with a classic crew neck. Sustainably made with premium materials.'
  },
  {
    id: '5',
    name: 'Leather Weekender Bag',
    price: 295,
    image: '/products/bag.jpg',
    category: 'Accessories',
    description: 'Handcrafted full-grain leather weekender bag. Spacious interior with multiple compartments for organized travel.'
  },
  {
    id: '6',
    name: 'Silk Blend Blouse',
    price: 145,
    image: '/products/blouse.jpg',
    category: 'Tops',
    description: 'Elegant silk-blend blouse with a relaxed fit. Features mother-of-pearl buttons and a subtle sheen.'
  },
  {
    id: '7',
    name: 'Wool Coat',
    price: 425,
    image: '/products/coat.jpg',
    category: 'Outerwear',
    description: 'Timeless wool coat with a refined silhouette. Fully lined with premium Italian fabric.'
  },
  {
    id: '8',
    name: 'Canvas Sneakers',
    price: 89,
    image: '/products/sneakers.jpg',
    category: 'Footwear',
    description: 'Minimalist canvas sneakers with a vulcanized rubber sole. Comfortable and versatile for everyday wear.'
  }
];

export const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Accessories', 'Footwear'];
