import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Naadu Restaurant database...');

  // 1. Admin Account
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@naadurestaurant.com' },
    update: {},
    create: {
      email: 'admin@naadurestaurant.com',
      name: 'Naadu Admin',
      passwordHash: hashedPassword,
      role: 'superadmin',
    },
  });
  console.log('Admin user ready:', admin.email);

  // 2. Restaurant Settings
  const existingSettings = await prisma.restaurantSettings.findFirst();
  if (!existingSettings) {
    await prisma.restaurantSettings.create({
      data: {
        restaurantName: 'Naadu Restaurant',
        tagline: 'Authentic Coastal Karnataka Flavors & Mangalurean Warmth',
        phone: '070223 73444',
        whatsappNumber: '+917022373444',
        address: '1, 1, S-17, S-17-1143, Kulur Ferry Rd, Chilimbi, BOLOOR, Ladyhill, Mangaluru, Karnataka 575006',
        googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.4795267252277!2d74.82510167584149!3d12.876884616947293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a646c000001%3A0x6b7b252033c4ef!2sLadyhill%2C%20Mangaluru%2C%20Karnataka%20575006!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin',
        googleMapsDirectionsUrl: 'https://maps.google.com/?q=Naadu+Restaurant+Kulur+Ferry+Rd+Chilimbi+BOLOOR+Ladyhill+Mangaluru+Karnataka+575006',
        logoUrl: '/images/logo.png',
        instagram: 'https://instagram.com/naadurestaurant',
        facebook: 'https://facebook.com/naadurestaurant',
        aboutText: 'Rooted in the vibrant coastal city of Mangaluru, Naadu Restaurant celebrates the rich culinary heritage of Tulu Nadu and the Karavali coast. From our fiery Ghee Roasts and delicate, lace-like Neer Dosas to our comforting vegetarian feasts, fresh catch delicacies, and dedicated kids menu, we bring friends and families together with authentic hospitality and live sports match screenings.',
        heroImageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80',
        seoTitle: 'Naadu Restaurant — Authentic Mangalurean Dining & Sports Screening',
        seoDescription: 'Taste the best of Coastal Karnataka cuisine in Mangaluru. Vegetarian options, Kids menu, and big-screen live sports screening at Naadu Restaurant, Chilimbi.',
        openingHours: JSON.stringify([
          { day: 'Monday', openTime: '11:30 AM', closeTime: '11:00 PM', isClosed: false },
          { day: 'Tuesday', openTime: '11:30 AM', closeTime: '11:00 PM', isClosed: false },
          { day: 'Wednesday', openTime: '11:30 AM', closeTime: '11:00 PM', isClosed: false },
          { day: 'Thursday', openTime: '11:30 AM', closeTime: '11:00 PM', isClosed: false },
          { day: 'Friday', openTime: '11:30 AM', closeTime: '11:30 PM', isClosed: false },
          { day: 'Saturday', openTime: '11:30 AM', closeTime: '11:30 PM', isClosed: false },
          { day: 'Sunday', openTime: '11:30 AM', closeTime: '11:30 PM', isClosed: false },
        ]),
        highlights: JSON.stringify([
          { icon: 'Leaf', text: 'Vegetarian Friendly' },
          { icon: 'Baby', text: 'Kids Menu Available' },
          { icon: 'Tv', text: 'Live Sports Screening' },
          { icon: 'UtensilsCrossed', text: 'Authentic Coastal Heritage' },
        ]),
        reservationMaxGuests: 20,
        reservationMaxFutureDays: 60,
        reviewSubmissionEnabled: true,
        adsGlobalEnabled: true,
        adsConfig: JSON.stringify({
          testMode: true,
          nativeBannerEnabled: true,
          nativeBannerZoneId: 'naadu_native_01',
          standardBannerEnabled: true,
          standardBannerZoneId: 'naadu_banner_01',
          socialBarEnabled: false,
          socialBarZoneId: '',
          pageTargeting: {
            home: true,
            menu: true,
            about: true,
            gallery: true,
            reviews: true,
            events: true,
            contact: true,
            offers: true,
            reserve: false,
            reserveConfirmation: false,
            foodDetail: false,
            kidsMenu: false,
          },
        }),
      },
    });
    console.log('Restaurant settings initialized.');
  }

  // 3. Menu Categories
  const categoriesData = [
    {
      name: 'Starters & Appetizers',
      slug: 'starters',
      description: 'Fiery roasted bites, coastal tawa fry, and vegetarian crisps to ignite your palate.',
      imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=600&q=80',
      displayOrder: 1,
    },
    {
      name: 'Coastal Karavali Specials',
      slug: 'coastal-specials',
      description: 'Time-honored Mangalorean recipes cooked in rich Kundapur spices and coastal coconut pastes.',
      imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
      displayOrder: 2,
    },
    {
      name: 'Vegetarian Delights',
      slug: 'vegetarian',
      description: 'Wholesome, flavorful vegetarian delicacies inspired by traditional Mangalurean households.',
      imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
      displayOrder: 3,
    },
    {
      name: 'Breads & Rice',
      slug: 'breads-rice',
      description: 'Handmade delicate Neer Dosas, flaky parottas, crispy Kori Rotti, and aromatic rice bowls.',
      imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80',
      displayOrder: 4,
    },
    {
      name: 'Kids Menu',
      slug: 'kids-menu',
      description: 'Mild, wholesome, and fun dishes crafted specially for little foodies.',
      imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80',
      displayOrder: 5,
    },
    {
      name: 'Beverages & Desserts',
      slug: 'beverages-desserts',
      description: 'Refreshing kokum coolers, freshly brewed filter coffee, and sweet coastal payasams.',
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
      displayOrder: 6,
    },
  ];

  const categoryMap = new Map();
  for (const cat of categoriesData) {
    const createdCat = await prisma.menuCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categoryMap.set(cat.slug, createdCat.id);
  }
  console.log('Categories seeded.');

  // 4. Menu Items
  const menuItemsData = [
    {
      name: 'Mangalore Chicken Ghee Roast',
      slug: 'mangalore-chicken-ghee-roast',
      categoryId: categoryMap.get('coastal-specials'),
      shortDescription: 'Tender chicken morsels slow-roasted in pure aromatic ghee and Byadagi chili masala paste.',
      fullDescription: 'An iconic culinary jewel from Kundapur and Mangaluru. Marinated tender chicken is pan-roasted in generous amounts of clarified butter (desi ghee) infused with roasted coriander, cumin, fennel, and fiery Byadagi chilies, finished with curry leaves and crushed peppercorns.',
      price: 360,
      imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
      isVeg: false,
      isAvailable: true,
      isFeatured: true,
      isPopular: true,
      isKidsMenu: false,
      ingredients: 'Chicken, Desi Ghee, Byadagi Chili, Garlic, Tamarind, Fennel, Curry Leaves',
      allergenInfo: 'Contains Dairy (Ghee). Nut-free.',
      tags: 'Spicy, Signature, Traditional',
    },
    {
      name: 'Paneer Kundapur Ghee Roast',
      slug: 'paneer-kundapur-ghee-roast',
      categoryId: categoryMap.get('vegetarian'),
      shortDescription: 'Soft cottage cheese cubes tossed in spicy roasted chili-ghee masala with curry leaves.',
      fullDescription: 'A rich vegetarian rendition of the coastal classic. Fresh, melt-in-the-mouth paneer is simmered in our house-ground Kundapur masala paste with clarified butter, offering the ultimate balance of tangy, spicy, and buttery richness.',
      price: 290,
      imageUrl: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      isAvailable: true,
      isFeatured: true,
      isPopular: true,
      isKidsMenu: false,
      ingredients: 'Fresh Paneer, Desi Ghee, Red Chilies, Fenugreek, Tamarind, Garlic',
      allergenInfo: 'Contains Dairy (Milk, Ghee).',
      tags: 'Vegetarian, Best Seller, Rich',
    },
    {
      name: 'Neer Dosa (Set of 3)',
      slug: 'neer-dosa',
      categoryId: categoryMap.get('breads-rice'),
      shortDescription: 'Delicate, lace-thin steamed rice crepes served with coconut chutney & coastal sambar.',
      fullDescription: 'Literally translating to "water dosa" in Tulu, these ethereal, feather-soft crepes are made from a delicate batter of ground soaked rice and grated fresh coconut. Steamed to perfection, they pair exquisitely with both spicy curries and sweetened coconut jaggery milk.',
      price: 110,
      imageUrl: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      isAvailable: true,
      isFeatured: true,
      isPopular: true,
      isKidsMenu: false,
      ingredients: 'Jeera Rice, Fresh Grated Coconut, Himalayan Rock Salt, Water',
      allergenInfo: 'Gluten-Free. Vegan.',
      tags: 'Traditional, Gluten-Free, Must Try',
    },
    {
      name: 'Kori Rotti with Coastal Chicken Curry',
      slug: 'kori-rotti-chicken-curry',
      categoryId: categoryMap.get('coastal-specials'),
      shortDescription: 'Crispy wafer-thin beaten rice sheets soaked in aromatic, coconut-rich coastal chicken curry.',
      fullDescription: 'The defining comfort meal of Bunt households in Tulu Nadu. Crisp sun-dried rice wafers (Rotti) are plated dry and drenched in piping-hot, spiced coconut chicken gravy right at your table, creating a heavenly textural contrast.',
      price: 330,
      imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      isVeg: false,
      isAvailable: true,
      isFeatured: true,
      isPopular: false,
      isKidsMenu: false,
      ingredients: 'Boiled Rice Sheets, Free-range Chicken, Fresh Coconut Paste, Marinated Spices',
      allergenInfo: 'Gluten-Free.',
      tags: 'Authentic Heritage, Specialty',
    },
    {
      name: 'Anjal (Seer Fish) Tawa Fry',
      slug: 'anjal-seer-fish-tawa-fry',
      categoryId: categoryMap.get('starters'),
      shortDescription: 'Fresh local Seer fish steak marinated in spicy red masala and pan-fried on cast iron with rava crust.',
      fullDescription: 'Sourced daily from the local Mangaluru fish docks. Prime thick cut of Kingfish (Anjal) coated in tangy lemon-chili paste, lightly dusted with semolina (rava), and shallow-fried to crispy golden perfection on a cast-iron tawa.',
      price: 490,
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      isVeg: false,
      isAvailable: true,
      isFeatured: true,
      isPopular: true,
      isKidsMenu: false,
      ingredients: 'Fresh Anjal (Seer Fish), Chili Paste, Lime, Rava, Coconut Oil',
      allergenInfo: 'Contains Fish. Semolina coating (Wheat).',
      tags: 'Fresh Catch, Coastal Pride',
    },
    {
      name: 'Prawns Sukka (Yetti Ajadina)',
      slug: 'prawns-sukka',
      categoryId: categoryMap.get('starters'),
      shortDescription: 'Juicy coastal prawns tossed in dry roasted coconut flakes, garlic, and cracked pepper.',
      fullDescription: 'A celebratory Karavali preparation where tender local prawns are dry-tossed with freshly grated coconut roasted to deep amber, infused with shallots, curry leaves, and pounded roasted spices.',
      price: 420,
      imageUrl: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80',
      isVeg: false,
      isAvailable: true,
      isFeatured: false,
      isPopular: true,
      isKidsMenu: false,
      ingredients: 'Fresh Prawns, Roasted Coconut, Shallots, Tamarind, Crushed Black Pepper',
      allergenInfo: 'Contains Shellfish (Crustacean).',
      tags: 'Dry Starter, Coastal Favorite',
    },
    {
      name: 'Mangalore Buns (2 Pcs)',
      slug: 'mangalore-buns',
      categoryId: categoryMap.get('breads-rice'),
      shortDescription: 'Sweet, fluffy fried banana flatbreads served with spicy coconut chutney & vegetable kurma.',
      fullDescription: 'A cherished coastal Karnataka breakfast and tea-time specialty. Slightly sweet, golden-puffed puris made with ripe bananas, mild yogurt, and flour fermented overnight.',
      price: 90,
      imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      isAvailable: true,
      isFeatured: false,
      isPopular: true,
      isKidsMenu: false,
      ingredients: 'Ripe Bananas, Flour, Yogurt, Cumin, Sugar, Salt',
      allergenInfo: 'Contains Wheat, Dairy.',
      tags: 'Breakfast, Sweet & Savory',
    },
    {
      name: 'Dal Tadka & Ghee Jeera Rice',
      slug: 'dal-tadka-jeera-rice',
      categoryId: categoryMap.get('vegetarian'),
      shortDescription: 'Creamy yellow lentils tempered with garlic and cumin, paired with aromatic long-grain jeera rice.',
      fullDescription: 'Wholesome comfort on a plate. Yellow toor and moong lentils cooked to silky consistency, tempered with ghee, sizzled cumin, crushed garlic, and dried red chilies, served with fragrant Basmati rice.',
      price: 230,
      imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      isAvailable: true,
      isFeatured: false,
      isPopular: false,
      isKidsMenu: false,
      ingredients: 'Toor Dal, Moong Dal, Basmati Rice, Cumin, Ghee, Garlic',
      allergenInfo: 'Contains Dairy (Ghee).',
      tags: 'Comfort Food, Vegetarian',
    },
    {
      name: 'Kids Crispy Chicken Tenders & Fries',
      slug: 'kids-crispy-chicken-tenders',
      categoryId: categoryMap.get('kids-menu'),
      shortDescription: 'Mildly seasoned golden-fried chicken tenders served with crinkle-cut fries and mild cheese dip.',
      fullDescription: 'Specially crafted for young diners. Non-spicy, tender chicken breast strips in a crunchy panko coating, fried to order and served with lightly salted french fries and tomato dip.',
      price: 190,
      imageUrl: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
      isVeg: false,
      isAvailable: true,
      isFeatured: false,
      isPopular: true,
      isKidsMenu: true,
      ingredients: 'Chicken Breast, Panko Crumbs, Potato Fries, Mild Spices, Cheese Dip',
      allergenInfo: 'Contains Wheat, Egg, Dairy.',
      tags: 'Kids Favorite, Non-Spicy',
    },
    {
      name: 'Kids Cheesy Cone Dosa',
      slug: 'kids-cheesy-cone-dosa',
      categoryId: categoryMap.get('kids-menu'),
      shortDescription: 'Fun crispy cone dosa packed with melted mild mozzarella cheese and sweet corn.',
      fullDescription: 'Crispy golden crepe shaped into a fun party hat cone, filled with gentle melted cheese and sweet American corn kernels. Served with mild coconut chutney.',
      price: 140,
      imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      isAvailable: true,
      isFeatured: false,
      isPopular: true,
      isKidsMenu: true,
      ingredients: 'Rice Batter, Mozzarella Cheese, Sweet Corn, Butter',
      allergenInfo: 'Contains Dairy.',
      tags: 'Kids Special, Cheesy Fun',
    },
    {
      name: 'Tender Coconut Payasam (Elaneer Payasa)',
      slug: 'tender-coconut-payasam',
      categoryId: categoryMap.get('beverages-desserts'),
      shortDescription: 'Chilled dessert of fresh tender coconut pulp, coconut milk, and cardamom with roasted cashews.',
      fullDescription: 'A refreshing, heavenly coastal dessert. Fresh malai (flesh) of young tender coconuts folded into thickened coconut milk and sweetened condensed milk, gently perfumed with green cardamom and garnished with golden ghee-roasted cashews.',
      price: 140,
      imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      isAvailable: true,
      isFeatured: true,
      isPopular: true,
      isKidsMenu: false,
      ingredients: 'Tender Coconut Flesh, Coconut Milk, Milk Cream, Cardamom, Cashews',
      allergenInfo: 'Contains Tree Nuts (Cashews), Dairy.',
      tags: 'Dessert, Signature, Chilled',
    },
    {
      name: 'Traditional Mangalorean Filter Coffee',
      slug: 'mangalorean-filter-coffee',
      categoryId: categoryMap.get('beverages-desserts'),
      shortDescription: 'Slow-brewed dark roast coffee decoction frothed with rich hot milk and raw sugar.',
      fullDescription: 'Authentic South Indian filter coffee brewed from roasted Chikmagalur coffee beans and roasted chicory. Served piping hot in traditional brass davarah and tumbler.',
      price: 60,
      imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      isVeg: true,
      isAvailable: true,
      isFeatured: false,
      isPopular: true,
      isKidsMenu: false,
      ingredients: 'Coffee Decoction (80% Coffee, 20% Chicory), Fresh Whole Milk, Cane Sugar',
      allergenInfo: 'Contains Dairy.',
      tags: 'Hot Beverage, Authentic',
    },
  ];

  for (const item of menuItemsData) {
    await prisma.menuItem.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    });
  }
  console.log('Menu items seeded.');

  // 5. Offers
  const now = new Date();
  const nextMonth = new Date();
  nextMonth.setDate(now.getDate() + 30);

  await prisma.offer.deleteMany({});
  await prisma.offer.createMany({
    data: [
      {
        title: 'Live Match Screening Starter Combo',
        description: 'Get 20% off on all starters during live cricket and football match screenings at Naadu!',
        discountText: 'Flat 20% Off',
        imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
        startDate: now,
        endDate: nextMonth,
        terms: 'Valid during live screening match hours only. Cannot be combined with other offers.',
        isActive: true,
      },
      {
        title: 'Coastal Family Feast Platter',
        description: 'Enjoy a flat ₹150 discount on total billing above ₹1200 when dining with family and kids on weekends.',
        discountText: 'Save ₹150',
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        startDate: now,
        endDate: nextMonth,
        terms: 'Applicable for dine-in reservations on Saturdays and Sundays.',
        isActive: true,
      },
    ],
  });
  console.log('Offers seeded.');

  // 6. Events & Sports Screening
  await prisma.event.deleteMany({});
  await prisma.event.createMany({
    data: [
      {
        title: 'India vs Australia — T20 Live Match Screening',
        description: 'Catch the high-voltage clash on our giant HD screen with stadium-grade surround sound! Exciting match specials, mocktails, and cheering atmosphere.',
        eventDate: '2026-10-15',
        eventTime: '19:00',
        imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
        ctaLabel: 'Reserve Match Spot',
        ctaUrl: '/reserve',
        isPublished: true,
      },
      {
        title: 'Weekend Premier League Football Night',
        description: 'Screening super Sunday football games live with special finger food platters and cool beverages.',
        eventDate: '2026-10-18',
        eventTime: '20:30',
        imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
        ctaLabel: 'Book a Table',
        ctaUrl: '/reserve',
        isPublished: true,
      },
    ],
  });
  console.log('Events seeded.');

  // 7. Gallery
  await prisma.galleryImage.deleteMany({});
  await prisma.galleryImage.createMany({
    data: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
        caption: 'Warm and welcoming family dining ambience at Naadu',
        altText: 'Dining room at Naadu Restaurant Mangaluru',
        category: 'ambience',
        isFeatured: true,
        isVisible: true,
        displayOrder: 1,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80',
        caption: 'Signature Mangalore Chicken Ghee Roast',
        altText: 'Chicken Ghee Roast served hot with curry leaves',
        category: 'food',
        isFeatured: true,
        isVisible: true,
        displayOrder: 2,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
        caption: 'Thrilling cricket match screening on the big screen',
        altText: 'Guests cheering during live cricket screening at Naadu',
        category: 'sports',
        isFeatured: true,
        isVisible: true,
        displayOrder: 3,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
        caption: 'Crispy Anjal (Kingfish) Tawa Rava Fry',
        altText: 'Fresh Seer Fish steak pan-fried with spicy marinade',
        category: 'food',
        isFeatured: true,
        isVisible: true,
        displayOrder: 4,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Cozy modern seating designed for intimate & group dining',
        altText: 'Modern dining tables and seating at Naadu',
        category: 'ambience',
        isFeatured: true,
        isVisible: true,
        displayOrder: 5,
      },
      {
        imageUrl: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=1200&q=80',
        caption: 'Coastal Prawns Sukka spiced with roasted coconut',
        altText: 'Platter of spiced fresh prawns sukka',
        category: 'food',
        isFeatured: false,
        isVisible: true,
        displayOrder: 6,
      },
    ],
  });
  console.log('Gallery seeded.');

  // 8. Reviews
  await prisma.review.deleteMany({});
  await prisma.review.createMany({
    data: [
      {
        customerName: 'Prashanth Shetty',
        rating: 5,
        reviewText: 'Hands down the best Chicken Ghee Roast in the Chilimbi-Ladyhill area! The Neer Dosa is soft as cloud. Also watched the weekend cricket match here on their giant screen — fantastic vibe for families and friends.',
        status: 'approved',
        isFeatured: true,
      },
      {
        customerName: 'Ananya Rao',
        rating: 5,
        reviewText: 'We visited with our two kids and were so delighted to see a dedicated kids menu! The kids loved the cheese cone dosa and tenders. Outstanding hospitality and clean, welcoming ambience.',
        status: 'approved',
        isFeatured: true,
      },
      {
        customerName: 'Rohan D Souza',
        rating: 5,
        reviewText: 'Authentic coastal flavors done right! The Anjal Tawa Fry was fresh and well-marinated. The Tender Coconut Payasam is a must-try dessert to conclude your meal.',
        status: 'approved',
        isFeatured: true,
      },
      {
        customerName: 'Deepa Hegde',
        rating: 4,
        reviewText: 'Great vegetarian choices. The Paneer Ghee Roast had the exact Byadagi chili punch without being overwhelmingly spicy. Booking a table via their website was effortless.',
        status: 'approved',
        isFeatured: false,
      },
    ],
  });
  console.log('Reviews seeded.');

  // 9. Sample Initial Reservations
  await prisma.reservation.deleteMany({});
  await prisma.reservation.createMany({
    data: [
      {
        referenceNumber: 'NAADU-20261012-0001',
        customerName: 'Karthik Shenoy',
        customerPhone: '9845012345',
        customerEmail: 'karthik.shenoy@example.com',
        reservationDate: '2026-10-14',
        reservationTime: '19:30',
        guestCount: 4,
        occasion: 'Family Gathering',
        specialRequests: 'Need high chair for a toddler and a quiet corner table.',
        status: 'confirmed',
        adminNotes: 'High chair arranged near window table 4.',
      },
      {
        referenceNumber: 'NAADU-20261012-0002',
        customerName: 'Pooja Salian',
        customerPhone: '9876543210',
        customerEmail: 'pooja.salian@example.com',
        reservationDate: '2026-10-15',
        reservationTime: '20:00',
        guestCount: 6,
        occasion: 'Birthday',
        specialRequests: 'Celebrating husband’s birthday during India match screening.',
        status: 'pending',
        adminNotes: 'Screening match view requested.',
      },
    ],
  });
  console.log('Sample reservations seeded.');

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
