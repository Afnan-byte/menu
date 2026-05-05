export const restaurantInfo = {
  name: "Menuwo Kitchen",
  tagline: "Authentic Flavors, Modern Experience",
  logo: "https://api.dicebear.com/7.x/initials/svg?seed=MK&backgroundColor=196f01",
  banner: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200",
  address: "Near High Street, Kochi, Kerala",
  phone: "+91 9876543210",
  whatsapp: "+91 9876543210",
  hours: "11:00 AM - 11:00 PM",
  location: "https://maps.google.com",
  brandColor: "#196f01"
};

export const categories = [
  { id: 'starters', name: 'Starters', icon: null },
  { id: 'mains', name: 'Main Course', icon: null },
  { id: 'beverages', name: 'Beverages', icon: null },
  { id: 'desserts', name: 'Desserts', icon: null }
];

export const menuItems = [
  {
    id: 1,
    name: "Classic Bruschetta",
    price: 240,
    description: "Toasted sourdough topped with vine-ripened tomatoes, garlic, and fresh basil.",
    category: "starters",
    image: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&q=80&w=600",
    isBestSeller: true,
    isVeg: true,
    isSpicy: false,
    isNew: false,
    allergens: ["Gluten"]
  },
  {
    id: 2,
    name: "Truffle Arancini",
    price: 320,
    description: "Crispy risotto balls filled with black truffle and mozzarella, served with aioli.",
    category: "starters",
    image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=600",
    isVeg: true,
    isSpicy: false,
    isNew: true
  },
  {
    id: 3,
    name: "Grilled Salmon",
    price: 850,
    description: "Atlantic salmon served with asparagus and a lemon-butter sauce.",
    category: "mains",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600",
    isBestSeller: true,
    isVeg: false,
    isSpicy: false
  },
  {
    id: 4,
    name: "Spicy Peri-Peri Chicken",
    price: 540,
    description: "Succulent chicken thigh marinated in house-made peri-peri sauce.",
    category: "mains",
    image: "https://images.unsplash.com/photo-1594221708779-94832f4320d1?auto=format&fit=crop&q=80&w=600",
    isVeg: false,
    isSpicy: true,
    isNew: true
  },
  {
    id: 5,
    name: "Fresh Lime Soda",
    price: 120,
    description: "Refreshing citrus soda with mint and a hint of salt.",
    category: "beverages",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600",
    isVeg: true,
    isSpicy: false
  },
  {
    id: 6,
    name: "Tiramisu",
    price: 380,
    description: "Traditional Italian pick-me-up with espresso-soaked ladyfingers.",
    category: "desserts",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=600",
    isBestSeller: true,
    isVeg: true,
    isSpicy: false
  }
];

