export type Service = {
  id: string;
  name: string;
  category: "Cut" | "Color" | "Styling" | "Treatment" | "Extensions";
  durationMin: number;
  price: number;
  priceNote?: string;
  description: string;
};

export type Stylist = {
  id: string;
  name: string;
  title: string;
  bio: string;
  longBio: string;
  years: number;
  specialties: string[];
  image: string;
  instagram?: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  quote: string;
  service: string;
  date: string;
};

export const salonInfo = {
  name: "Wylde Salon",
  city: "Gilbert",
  state: "AZ",
  phone: "(480) 815-1595",
  email: "hello@wyldesalon.com",
  address: "3150 E Ray Rd #108, Gilbert, AZ 85296",
  description:
    "Our team of skilled and talented professionals are dedicated to helping you achieve the hair of your dreams. From cuts and colors to extensions and scalp facials, we offer a wide range of services to cater to your unique needs.",
};

export const services: Service[] = [
  // ── Haircuts ───────────────────────────────────────────────
  {
    id: "consultation",
    name: "Consultation",
    category: "Cut",
    durationMin: 45,
    price: 0,
    description:
      "Get expert advice and a customized hairstyle that perfectly complements your hair type, facial features, and coloring. Book a consultation with our stylists today and let us help you achieve your dream hair.",
  },
  {
    id: "bang-trim",
    name: "Bang Trim",
    category: "Cut",
    durationMin: 20,
    price: 15,
    description:
      "Get a fresh and stylish look with our professional bang trim service. Our skilled stylists will precisely trim your bangs to achieve the perfect shape and length.",
  },
  {
    id: "haircut-above",
    name: "Women's Haircut — Above Shoulder",
    category: "Cut",
    durationMin: 60,
    price: 80,
    description:
      "Get a personalized women's haircut tailored to your unique style and preferences with a professional blow dry and styling included. This cut is for hair lengths above the shoulders.",
  },
  {
    id: "haircut-below",
    name: "Women's Haircut — Below Shoulder",
    category: "Cut",
    durationMin: 60,
    price: 80,
    description:
      "Get a personalized women's haircut tailored to your unique style and preferences with a professional blow dry and styling included. This cut is for hair lengths below the shoulders.",
  },

  // ── Extensions ────────────────────────────────────────────
  {
    id: "extensions-install",
    name: "Extensions — Installation",
    category: "Extensions",
    durationMin: 180,
    price: 0,
    priceNote: "Consultation",
    description:
      "Transform your look with expert hand-tied hair extension installation, adding volume and length while prioritizing the health of your natural hair. Pricing discussed during consultation.",
  },
  {
    id: "extensions-move-up",
    name: "Extensions — Move Up",
    category: "Extensions",
    durationMin: 90,
    price: 130,
    priceNote: "Per row",
    description:
      "$130 per row when booking with Selah. Precision move-up service to keep your extensions looking fresh and seamless.",
  },
  {
    id: "extensions-removal",
    name: "Extensions — Removal",
    category: "Extensions",
    durationMin: 60,
    price: 0,
    priceNote: "Inquire",
    description:
      "Quick and efficient removal of hair extensions that leaves your natural hair looking and feeling rejuvenated.",
  },

  // ── Color & Highlights ───────────────────────────────────
  {
    id: "color-retouch",
    name: "Color Retouch",
    category: "Color",
    durationMin: 90,
    price: 80,
    priceNote: "Starting at",
    description:
      "Professional touch-up service that covers grays and roots, leaving you with a flawless and natural-looking result. Mobile service available.",
  },
  {
    id: "mini-highlight",
    name: "Mini Highlight",
    category: "Color",
    durationMin: 120,
    price: 110,
    priceNote: "Starting at",
    description:
      "Strategically placed foils, a root tap, toner, trim, and professional blow dry and styling for a fresh, polished look in one appointment.",
  },
  {
    id: "partial-highlight",
    name: "Partial Highlight",
    category: "Color",
    durationMin: 150,
    price: 215,
    priceNote: "Starting at",
    description:
      "Brightens the front section and crown, with root smudge, toning, and a haircut included. The perfect low-maintenance highlight refresh.",
  },
  {
    id: "full-highlight",
    name: "Full Highlight",
    category: "Color",
    durationMin: 180,
    price: 250,
    priceNote: "Starting at",
    description:
      "Lightening the entire head of hair paired with a professional haircut — a stunning, refreshed look that turns heads.",
  },
  {
    id: "toner-gloss",
    name: "Toner or Gloss",
    category: "Color",
    durationMin: 60,
    price: 95,
    priceNote: "Starting at",
    description:
      "Achieve the perfect shade and glossy finish with our quick toner or gloss service. Enhances vibrancy and adds shine, with a blowout and haircut included.",
  },
  {
    id: "color-correction",
    name: "Color Correction",
    category: "Color",
    durationMin: 240,
    price: 125,
    priceNote: "Starting at",
    description:
      "Expert correction and enhancement of your hair's color and tone. Variable pricing — mandatory consultation ensures a personalized experience.",
  },
  {
    id: "hair-tinsel",
    name: "Hair Tinsel",
    category: "Styling",
    durationMin: 30,
    price: 30,
    description:
      "Add a touch of glamour and sparkle to your hairstyle. Choose from a variety of colors for any occasion.",
  },

  // ── Treatments ────────────────────────────────────────────
  {
    id: "conditioning-treatment",
    name: "Conditioning Treatment",
    category: "Treatment",
    durationMin: 60,
    price: 70,
    description:
      "Restore and revitalize your hair with our specially formulated treatment that replenishes proteins and moisture. Includes a professional blowdry and style.",
  },
  {
    id: "brazilian-blowout",
    name: "Brazilian Blow Out",
    category: "Treatment",
    durationMin: 150,
    price: 250,
    description:
      "Smooth frizz and loosen natural curl with our Brazilian Blow Out treatment, leaving your hair beautifully sleek and damage-free.",
  },
  {
    id: "scalp-facial",
    name: "Scalp Facial",
    category: "Treatment",
    durationMin: 60,
    price: 130,
    description:
      "Rejuvenating scalp treatment including a soothing scrub, refreshing cleanser, relaxing massage, and deep conditioning. Topped off with a professional blowdry and style.",
  },

  // ── Styling ───────────────────────────────────────────────
  {
    id: "blowout",
    name: "Blow Out",
    category: "Styling",
    durationMin: 50,
    price: 55,
    description:
      "Rejuvenating shampoo, nourishing conditioner, soothing scalp massage, and a flawless blow dry style for a perfectly polished look.",
  },
  {
    id: "special-occasion",
    name: "Special Occasions / Up-Dos",
    category: "Styling",
    durationMin: 75,
    price: 0,
    priceNote: "Inquire",
    description:
      "Exquisite up-do hairstyles for weddings, events, and special occasions. Our expert stylists create elegant and timeless looks that make a stunning impression.",
  },
];

const VAGARO = "https://feb16f6c1af04f371f59-e326581eb23dccb5ba4725805de14ab5.ssl.cf2.rackcdn.com/Original";

export const stylists: Stylist[] = [
  {
    id: "allison",
    name: "Allison Colburn",
    title: "Owner & Lead Stylist",
    bio: "18-year veteran and salon owner specializing in lived-in blondes, brondes, and precision cutting.",
    longBio:
      "I'm Allison Colburn — stylist and owner of Wylde Salon, living out my childhood dream. Doing hair is my love language and I've been doing it for 18 years without 'working' a single day. I specialize in lived-in blondes, brondes, color and cutting, always delivering on-trend, personalized looks while keeping your hair healthy. I'm huge on continued education and believe that getting your hair done is like therapy — a time to pamper yourself, refresh, and walk out with the confidence to take on the world.",
    years: 18,
    specialties: ["Lived-In Blondes", "Brondes", "Color Correction", "Precision Cutting"],
    image: `${VAGARO}/ServiceProvider$2022_03_25_04_25_52_0981.jpg`,
  },
  {
    id: "selah",
    name: "Selah Cooperman",
    title: "Color & Extension Specialist",
    bio: "8 years of bringing beachy blondes, balayages, and hand-tied extensions to life with nontoxic, organic products.",
    longBio:
      "Hi, I'm happy you're here! I'm Selah — a 26-year-old hairstylist in Gilbert, Arizona. I've been doing hair for 8 years and I love all things beachy blondes, balayages, brunettes, lived-in color, and hand-tied extensions. I use only nontoxic and organic products to keep the integrity of your hair at its very best. Making you feel confident and rejuvenated when leaving the salon is my ultimate goal. Follow my work on Instagram @hairbyselahh.",
    years: 8,
    specialties: ["Balayage", "Beachy Blondes", "Hand-Tied Extensions", "Lived-In Color"],
    image: `${VAGARO}/2fbe9f0b_$2025_06_12_00_55_04_0820.jpeg`,
    instagram: "@hairbyselahh",
  },
  {
    id: "stephanie",
    name: "Stephanie Cox",
    title: "Senior Colorist & Stylist",
    bio: "17 years behind the chair crafting blondes, brunettes, and lived-in color that grows out beautifully.",
    longBio:
      "Hi, I'm Stephanie. With 17 years behind the chair, I'm passionate about helping clients feel confident, refreshed, and truly seen. I specialize in blondes, brunettes, and lived-in color that grows out beautifully and feels effortless. My approach is always rooted in connection — I pride myself on creating a relaxed, welcoming environment where my clients feel heard and cared for. Whether you're here for a bold transformation or just a fresh trim, I'm all about personalized styles that suit your lifestyle and make you feel like your best self.",
    years: 17,
    specialties: ["Blondes", "Brunettes", "Lived-In Color", "Haircuts"],
    image: `${VAGARO}/2d04d523_$2025_08_11_05_34_37_5929.jpeg`,
  },
  {
    id: "courtney",
    name: "Courtney Goulet",
    title: "Master Colorist & Stylist",
    bio: "19-year stylist from Colorado with expertise in balayage, color correction, extensions, and cutting for all textures.",
    longBio:
      "Hey! I'm Courtney, originally from Colorado — though Arizona's sunsets and trails have completely won me over. I've been a hair stylist for over 19 years, and expressing my creativity behind the chair is my calling. I've had the opportunity to master designer cutting for men and women, beautiful balayage, custom colors, color correction, permanent and clip-in extensions, volume and formal hairstyling, and healthy hair care including curls. Check out my portfolio on IG @that.hairstylist.coco — let's get you booked!",
    years: 19,
    specialties: ["Balayage", "Color Correction", "Extensions", "Curly Hair", "Cutting"],
    image: `${VAGARO}/7a7a54f6_$2025_06_23_14_20_38_0919.webp`,
    instagram: "@that.hairstylist.coco",
  },
  {
    id: "kenzie",
    name: "Kenzie Marks",
    title: "Color & Extension Specialist",
    bio: "Six years of expertise in dimensional brunettes, lived-in blondes, and a deep passion for extensions.",
    longBio:
      "Kenzie is a highly skilled hairstylist with six years of experience. She has a strong expertise in creating dimensional brunettes and lived-in blondes, as well as a deep passion for extensions. Her goal is to create a safe and welcoming environment where clients can freely express their true authentic selves. Kenzie's top priority is to make every guest feel beautiful and confident in their own skin.",
    years: 6,
    specialties: ["Dimensional Brunettes", "Lived-In Blondes", "Extensions", "Color"],
    image: `${VAGARO}/021354bc_$2024_09_30_03_04_43_9163.jpeg`,
  },
  {
    id: "savanah",
    name: "Savanah Aube",
    title: "Blonde & Extension Artist",
    bio: "Your go-to for all things blonde, hand-tied and hidden bead extensions, and effortlessly dreamy hair.",
    longBio:
      "Hey babe, I'm Savanah! I'm your go-to for all things blonde, hand-tied and hidden bead extensions, and effortlessly dreamy hair. I'm all about making you feel confident and creating your dream hair — whether you're craving a total glow up or a little glam refresh. Good vibes, fun chats, and amazing hair happening in my chair. I can't wait to meet you! Catch more behind-the-scenes magic on Instagram @savyy.beautyy.",
    years: 4,
    specialties: ["Blondes", "Hand-Tied Extensions", "Hidden Bead Extensions", "Glam Color"],
    image: `${VAGARO}/e16b0619_$2025_05_03_05_42_55_8794.jpeg`,
    instagram: "@savyy.beautyy",
  },
  {
    id: "rylee",
    name: "Rylee Hunt",
    title: "Balayage & Color Specialist",
    bio: "Hand-painted balayage, blonding, and dimensional brunettes are her thing — and she can't wait to make you feel beautiful.",
    longBio:
      "Hi!! I'm Rylee, a stylist at Wylde Salon in Gilbert, AZ. I cannot wait to have you in my chair! Hand-painted balayage, all things blonding, and dimensional brunettes are kinda my thing. When I'm not in the salon painting hair you can find me by the nearest lake watching the sunset and eating pasta. Can't wait to be besties and make you feel beautiful! Follow along for all the updates @color.byry.",
    years: 5,
    specialties: ["Hand-Painted Balayage", "Blonding", "Dimensional Brunettes", "Color"],
    image: `${VAGARO}/ServiceProvider$2023_06_03_03_03_42_5076.jpg`,
    instagram: "@color.byry",
  },
  {
    id: "emily",
    name: "Emily McKinney",
    title: "Luxury Color & Extension Artist",
    bio: "Specializing in effortless, luxury color and hand-tied extensions designed to enhance your natural beauty.",
    longBio:
      "Hi! I'm Emily McKinney! Specializing in effortless, luxury color and hand-tied extensions designed to enhance your natural beauty. I take an individualized approach to every client, ensuring your hair goals are achieved with precision and care. For more, follow me on Instagram @emilymckinneyhair — I can't wait to meet you!",
    years: 5,
    specialties: ["Luxury Color", "Hand-Tied Extensions", "Balayage", "Color"],
    image: `${VAGARO}/906bbc09_$2025_07_21_15_02_14_8295.webp`,
    instagram: "@emilymckinneyhair",
  },
  {
    id: "kaylee",
    name: "Kaylee Rohner",
    title: "Blonding & Extension Specialist",
    bio: "Passionate about stunning blonde shades and extensions — attention to detail is her superpower.",
    longBio:
      "Hi! I'm Kaylee Rohner — a hairstylist specializing in blonding and extensions. From a young age I've been passionate about helping people look and feel their best. I honed my skills at EVIT, where I discovered my love for creating stunning blonde shades and adding length and volume with extensions. I take pride in my attention to detail and my ability to tailor each look to my clients' styles and preferences. Nothing is more rewarding than seeing clients' faces light up! Check out my latest transformations on Instagram @kay_rohnerhair.",
    years: 3,
    specialties: ["Blonding", "Extensions", "Blonde Shades", "Color"],
    image: `${VAGARO}/ServiceProvider$2024_08_27_23_20_22_8435.jpg`,
    instagram: "@kay_rohnerhair",
  },
  {
    id: "paige",
    name: "Paige Wylie",
    title: "Color & Style Artist",
    bio: "Low-maintenance blondes and lived-in color for clients who want to go as long as possible between appointments.",
    longBio:
      "Hi, my name is Paige! I moved here from Alabama and have been loving Gilbert for 6 years. My specialties are doing blondes and lived-in color that are super low-maintenance so you can go as long as you need between appointments. I also love doing layered cuts and blowouts. My main goal is to have every client leave feeling beautiful and confident with healthy hair! Follow my hair account to see my favorite transformations @paige.wylie.hair.",
    years: 6,
    specialties: ["Lived-In Blondes", "Low-Maintenance Color", "Layered Cuts", "Blowouts"],
    image: `${VAGARO}/ServiceProvider$2024_08_27_22_35_23_7316.jpg`,
    instagram: "@paige.wylie.hair",
  },
  {
    id: "afton",
    name: "Afton Williams",
    title: "Blonding & Color Artist",
    bio: "3 years of experience in blonding, brunettes, lived-in colors, and extensions — and she dances for the Phoenix Suns!",
    longBio:
      "Hi loves! I'm Afton Williams, a skilled hairstylist with 3 years of experience. I just moved here from Utah and I'm living my dream dancing for the Phoenix Suns! I specialize in blonding, brunettes, lived-in colors, and extensions. I'm passionate about creating beautiful and personalized looks, and I strive to stay up-to-date with the latest trends and techniques. When I'm not doing hair or dancing, I love being outdoors and active — big foodie too! I'm dedicated to ensuring every client leaves feeling confident and satisfied.",
    years: 3,
    specialties: ["Blonding", "Brunettes", "Lived-In Color", "Extensions"],
    image: `${VAGARO}/ServiceProvider$2024_10_22_19_18_06_5240.jpg`,
  },
  {
    id: "sara",
    name: "Sara Henley",
    title: "Color & Style Specialist",
    bio: "Experienced stylist relocated from Utah with a passion for making every client feel beautiful inside and out.",
    longBio:
      "Sara is an experienced stylist who recently relocated from Utah to AZ with her husband. She has a passion for making people feel beautiful and considers herself fortunate to do so on a daily basis. With her expertise and dedication, Sara strives to provide exceptional service to every client at Wylde Salon. Her warm and friendly demeanor creates a welcoming atmosphere, ensuring that each individual leaves feeling confident and satisfied.",
    years: 5,
    specialties: ["Color", "Haircuts", "Blowouts", "Styling"],
    image: `${VAGARO}/ServiceProvider$2024_10_15_04_00_52_6486.jpg`,
  },
  {
    id: "ellie",
    name: "Ellie Johnson",
    title: "Color & Wellness Stylist",
    bio: "Hair health is her number one priority — loves educating clients and making them feel as beautiful on the outside as they are inside.",
    longBio:
      "Hi, my name is Ellie! I was born and raised in Iowa, and moved to Arizona when I was 10. As soon as I felt the warm air and hugged a palm tree I knew Arizona was my home. I fell in love with doing hair at a young age and being a hairstylist is an absolute dream. I love the art of doing hair along with the quality time I get to spend loving on each guest. I love all blondes, brunettes, and just about anything else. Guest hair health is my number one priority and I love learning new techniques. Making guests feel as beautiful on the outside as they are on the inside is one of my favorite parts of the job.",
    years: 8,
    specialties: ["Blondes", "Brunettes", "Hair Health", "Color & Cuts"],
    image: `${VAGARO}/ServiceProvider$2023_01_06_23_27_55_9851.jpg`,
  },
  {
    id: "emi",
    name: "Emi Clouse",
    title: "Lived-In Hair Specialist",
    bio: "8 years of creating effortless, lived-in hair with clear communication and a relaxed experience every time.",
    longBio:
      "Hi, I'm Emi! I'm a hairstylist with 8 years of experience specializing in effortless, lived-in hair. My goal is for every client to feel comfortable, cared for, and truly heard while enjoying their time in my chair. I value clear communication, a relaxed experience, and educating clients so they feel confident with their hair both in and out of the salon. Outside of the salon, I'm a mom to two little boys and love spending time outdoors — I'm a sucker for a good TV series and always trying new restaurants. I'd love to welcome you into my chair.",
    years: 8,
    specialties: ["Lived-In Color", "Balayage", "Blondes", "Effortless Styling"],
    image: `${VAGARO}/61b9b97a_$2026_02_02_21_12_58_7577.jpeg`,
  },
  {
    id: "olivia",
    name: "Olivia Arnett",
    title: "Stylist",
    bio: "Passionate stylist bringing fresh energy and meticulous attention to every guest.",
    longBio:
      "Olivia Arnett is a dedicated stylist at Wylde Salon with a passion for helping every guest look and feel their absolute best. She brings fresh energy and meticulous attention to detail to every appointment, creating personalized looks that reflect each client's individual style.",
    years: 2,
    specialties: ["Haircuts", "Color", "Styling", "Blowouts"],
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
  },
];

export const reviews: Review[] = [
  {
    id: "r1",
    author: "Madison Murphy",
    rating: 5,
    quote:
      "Savanah has been doing my hair for about 1.5 years now and is INCREDIBLE!! I came to her after years and years of severely damaged hair and she completely transformed me. Cannot recommend her enough!",
    service: "Extensions",
    date: "2025-12-15",
  },
  {
    id: "r2",
    author: "Colby Thomas",
    rating: 5,
    quote:
      "I had the best experience with Ellie! She is not only talented but so sweet and fun to chat with. I've had a scalp treatment with her and haircuts/blowouts. She really is the best! Everyone at the salon is so nice and welcoming.",
    service: "Scalp Facial & Blowout",
    date: "2026-02-25",
  },
  {
    id: "r3",
    author: "Jillian Curley",
    rating: 5,
    quote:
      "Selah is so sweet and took the time to listen to exactly what my ideas were. I showed her my inspo pics and she nailed it. She was quick and professional and I love my hair!",
    service: "Balayage",
    date: "2026-03-11",
  },
  {
    id: "r4",
    author: "A. Martinez",
    rating: 5,
    quote:
      "Best balayage I have had in Arizona. The consultation was clear and the result looked expensive. I drove 45 minutes and it was 100% worth it.",
    service: "Balayage",
    date: "2026-01-21",
  },
  {
    id: "r5",
    author: "D. Nelson",
    rating: 5,
    quote:
      "I booked online, walked in on time, and left with the exact cut I asked for. No guesswork, no surprises — just a perfect haircut in a beautiful space.",
    service: "Women's Haircut",
    date: "2026-02-04",
  },
  {
    id: "r6",
    author: "K. Rogers",
    rating: 5,
    quote:
      "The salon is very well kept and the staff is incredibly friendly. Courtney gave me the most beautiful balayage — I've gotten so many compliments. Already booked my next appointment!",
    service: "Balayage",
    date: "2026-02-25",
  },
  {
    id: "r7",
    author: "T. Williams",
    rating: 5,
    quote:
      "Allison is an absolute artist. She listened to every detail, gave honest feedback on what would work best for my hair type, and the results were stunning. This salon is a gem.",
    service: "Color & Cut",
    date: "2025-11-18",
  },
  {
    id: "r8",
    author: "R. Thompson",
    rating: 5,
    quote:
      "Kenzie did my extensions and they look so natural — no one can tell! She's thorough, explains the whole process, and genuinely cares about the health of your hair. So grateful I found her.",
    service: "Extensions",
    date: "2025-10-30",
  },
];

export const businessHours = [
  "Tue 9:00 AM – 7:00 PM",
  "Wed 9:00 AM – 7:00 PM",
  "Thu 9:00 AM – 8:00 PM",
  "Fri 9:00 AM – 7:00 PM",
  "Sat 8:00 AM – 5:00 PM",
  "Sun & Mon  Closed",
];

export const memberships = [
  {
    id: "you-deserve-this",
    name: "You Deserve This",
    tagline: "1 Blowout a Month",
    monthlyPrice: 50,
    benefits: [
      "1 Blowout per month",
      "$50 additional blowouts",
      "10% off products in-shop",
    ],
  },
  {
    id: "someone-pamper-me",
    name: "Someone Please Pamper Me",
    tagline: "2 Blowouts a Month",
    monthlyPrice: 90,
    benefits: [
      "2 Blowouts per month",
      "$45 additional blowouts",
      "10% off products in-shop",
      "1 free anniversary blowout",
    ],
  },
  {
    id: "dont-wash-hair",
    name: "I Don't Want To Wash My Hair",
    tagline: "4 Blowouts a Month",
    monthlyPrice: 160,
    benefits: [
      "4 Blowouts per month",
      "$40 additional blowouts",
      "15% off products in-shop",
      "1 free anniversary blowout",
      "Bestie Blowout — share with a friend",
    ],
  },
];

export function findService(serviceId: string) {
  return services.find((service) => service.id === serviceId);
}

export function findStylist(stylistId: string) {
  return stylists.find((stylist) => stylist.id === stylistId);
}
