import type { Product, User, Order } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  return image ? { url: image.imageUrl, hint: image.imageHint } : { url: '', hint: '' };
};

export const products: Product[] = [
  {
    id: 'prod_1',
    name: 'AeroGlide Runners',
    description: 'Lightweight and responsive running shoes designed for speed and comfort. Features a breathable mesh upper and cushioned midsole.',
    price: 120.00,
    imageUrl: getImage('running-shoes-1').url,
    imageHint: getImage('running-shoes-1').hint,
    category: 'Apparel',
    sport: 'Running',
    brand: 'Nike',
    popularity: 92,
    stock: 50,
  },
  {
    id: 'prod_2',
    name: 'Pro-Court Basketball',
    description: 'Official size and weight basketball with a durable composite leather cover, suitable for both indoor and outdoor courts.',
    price: 29.99,
    imageUrl: getImage('basketball-1').url,
    imageHint: getImage('basketball-1').hint,
    category: 'Equipment',
    sport: 'Basketball',
    brand: 'Adidas',
    popularity: 88,
    stock: 120,
  },
  {
    id: 'prod_3',
    name: 'Victory Soccer Jersey',
    description: 'A replica jersey of your favorite team, made with moisture-wicking fabric to keep you cool and dry on the field.',
    price: 90.00,
    imageUrl: getImage('soccer-jersey-1').url,
    imageHint: getImage('soccer-jersey-1').hint,
    category: 'Apparel',
    sport: 'Soccer',
    brand: 'Puma',
    popularity: 85,
    stock: 80,
  },
  {
    id: 'prod_4',
    name: 'Graphite Pro Tennis Racket',
    description: 'A powerful and precise tennis racket for intermediate to advanced players. Features a graphite frame for stability.',
    price: 150.00,
    imageUrl: getImage('tennis-racket-1').url,
    imageHint: getImage('tennis-racket-1').hint,
    category: 'Equipment',
    sport: 'Tennis',
    brand: 'Under Armour',
    popularity: 78,
    stock: 40,
  },
  {
    id: 'prod_5',
    name: 'ZenFlow Yoga Mat',
    description: 'Extra-thick, non-slip yoga mat providing superior cushioning and support for your joints during any yoga or fitness routine.',
    price: 35.00,
    imageUrl: getImage('yoga-mat-1').url,
    imageHint: getImage('yoga-mat-1').hint,
    category: 'Equipment',
    sport: 'Fitness',
    brand: 'New Balance',
    popularity: 95,
    stock: 200,
  },
  {
    id: 'prod_6',
    name: 'PaceSetter Running Shorts',
    description: 'Men\'s 7" running shorts with a built-in liner and sweat-wicking technology. Perfect for long runs and intense workouts.',
    price: 45.00,
    imageUrl: getImage('running-shorts-1').url,
    imageHint: getImage('running-shorts-1').hint,
    category: 'Apparel',
    sport: 'Running',
    brand: 'Adidas',
    popularity: 82,
    stock: 150,
  },
  {
    id: 'prod_7',
    name: 'SlamDunk Hoop System',
    description: 'Adjustable height basketball hoop with a polycarbonate backboard for professional-level performance in your driveway.',
    price: 399.99,
    imageUrl: getImage('basketball-hoop-1').url,
    imageHint: getImage('basketball-hoop-1').hint,
    category: 'Equipment',
    sport: 'Basketball',
    brand: 'Nike',
    popularity: 70,
    stock: 20,
  },
  {
    id: 'prod_8',
    name: 'Champion Match Soccer Ball',
    description: 'FIFA quality certified match ball with thermal-bonded seamless surface for a more predictable trajectory and better touch.',
    price: 160.00,
    imageUrl: getImage('soccer-ball-1').url,
    imageHint: getImage('soccer-ball-1').hint,
    category: 'Equipment',
    sport: 'Soccer',
    brand: 'Adidas',
    popularity: 89,
    stock: 60,
  },
  {
    id: 'prod_9',
    name: 'Championship Tennis Balls',
    description: 'A can of 3 extra-duty tennis balls, ideal for hard court play. Pressurized for consistent bounce and performance.',
    price: 4.99,
    imageUrl: getImage('tennis-balls-1').url,
    imageHint: getImage('tennis-balls-1').hint,
    category: 'Equipment',
    sport: 'Tennis',
    brand: 'Puma',
    popularity: 98,
    stock: 500,
  },
  {
    id: 'prod_10',
    name: 'FlexiFit Adjustable Dumbbells',
    description: 'Replaces an entire rack of weights. Easily adjust from 5 to 52.5 lbs with the turn of a dial. Sold as a pair.',
    price: 349.00,
    imageUrl: getImage('dumbbells-1').url,
    imageHint: getImage('dumbbells-1').hint,
    category: 'Equipment',
    sport: 'Fitness',
    brand: 'Under Armour',
    popularity: 91,
    stock: 30,
  },
  {
    id: 'prod_11',
    name: 'Pulse GPS Watch',
    description: 'Track your runs, rides, and workouts with this advanced GPS watch. Features heart rate monitoring and smart notifications.',
    price: 250.00,
    imageUrl: getImage('sports-watch-1').url,
    imageHint: getImage('sports-watch-1').hint,
    category: 'Accessories',
    sport: 'Running',
    brand: 'New Balance',
    popularity: 87,
    stock: 75,
  },
  {
    id: 'prod_12',
    name: 'HydroFlow Water Bottle',
    description: '24oz insulated stainless steel water bottle that keeps drinks cold for up to 24 hours. Leak-proof and BPA-free.',
    price: 25.00,
    imageUrl: getImage('water-bottle-1').url,
    imageHint: getImage('water-bottle-1').hint,
    category: 'Accessories',
    sport: 'Fitness',
    brand: 'Nike',
    popularity: 99,
    stock: 300,
  },
];

export const users: User[] = [
  {
    id: 'user_1',
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    isAdmin: false,
    purchaseHistory: ['prod_1', 'prod_6', 'prod_12'],
    addresses: [
      {
        id: 'addr_1',
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        country: 'USA'
      }
    ],
    paymentMethods: [
      {
        id: 'pm_1',
        type: 'Credit Card',
        provider: 'Visa',
        last4: '4242',
        isDefault: true
      }
    ]
  },
  {
    id: 'user_2',
    name: 'Admin User',
    email: 'admin@example.com',
    isAdmin: true,
    purchaseHistory: [],
    addresses: [
      {
        id: 'addr_2',
        street: '456 Admin Ave',
        city: 'Mgmt City',
        state: 'NY',
        zip: '54321',
        country: 'USA'
      }
    ],
    paymentMethods: []
  }
];

export const orders: Order[] = [
    {
        id: 'order_1',
        userId: 'user_1',
        customerName: 'Alex Johnson',
        items: [
            { product: products[0], quantity: 1 },
            { product: products[5], quantity: 2 },
        ],
        total: 210.00,
        status: 'Delivered',
        date: '2023-10-15T10:00:00Z',
        shippingAddress: users[0].addresses[0]
    },
    {
        id: 'order_2',
        userId: 'user_1',
        customerName: 'Alex Johnson',
        items: [
            { product: products[11], quantity: 1 },
        ],
        total: 25.00,
        status: 'Shipped',
        date: '2023-10-28T14:30:00Z',
        shippingAddress: users[0].addresses[0]
    },
    {
        id: 'order_3',
        userId: 'user_temp_123',
        customerName: 'Sam Lee',
        items: [
            { product: products[1], quantity: 1 },
            { product: products[6], quantity: 1 },
        ],
        total: 429.98,
        status: 'Processing',
        date: '2023-11-01T09:05:00Z',
        shippingAddress: {
            id: 'addr_3',
            street: '789 Guest Rd',
            city: 'Visitorville',
            state: 'TX',
            zip: '67890',
            country: 'USA'
        }
    }
];
