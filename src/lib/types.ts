export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  category: 'Apparel' | 'Equipment' | 'Accessories';
  sport: 'Running' | 'Basketball' | 'Soccer' | 'Tennis' | 'Fitness';
  brand: 'Nike' | 'Adidas' | 'Puma' | 'Under Armour' | 'New Balance';
  popularity: number; // e.g., 1-100
  stock: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  userId: string;
  customerName: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  shippingAddress: Address;
};

export type User = {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  purchaseHistory: string[]; // array of product IDs
  addresses: Address[];
  paymentMethods: PaymentMethod[];
};

export type Address = {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type PaymentMethod = {
  id:string;
  type: 'Credit Card' | 'PayPal';
  last4?: string;
  provider?: string;
  email?: string;
  isDefault: boolean;
};
