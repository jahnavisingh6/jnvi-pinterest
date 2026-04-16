export type Board = {
  id: string;
  name: string;
  count: number;
  description: string;
  coverTone: string;
};

export type Pin = {
  id: number;
  title: string;
  caption: string;
  height: string;
  tone: string;
  accent: string;
  tags: string[];
  board: string;
  imageUrl?: string;
};

export const boards: Board[] = [
  {
    id: "golden-hour",
    name: "Golden Hour",
    count: 18,
    description: "Soft skies, late sunsets, warm city light.",
    coverTone: "bg-[linear-gradient(150deg,#c77f63_0%,#f5c8a5_100%)]",
  },
  {
    id: "coffee-corners",
    name: "Coffee Corners",
    count: 12,
    description: "Cafes, books, glass tables, cream sweaters.",
    coverTone: "bg-[linear-gradient(150deg,#becdb7_0%,#eef5ea_100%)]",
  },
  {
    id: "street-moments",
    name: "Street Moments",
    count: 21,
    description: "Blurred motion, sidewalks, cabs, windows, rain.",
    coverTone: "bg-[linear-gradient(150deg,#5c6474_0%,#d4d9df_100%)]",
  },
  {
    id: "little-things",
    name: "Little Things",
    count: 9,
    description: "Flowers, receipts, mirrors, notes, details.",
    coverTone: "bg-[linear-gradient(150deg,#e1b4a5_0%,#fff2ea_100%)]",
  },
];

export const pins: Pin[] = [
  {
    id: 1,
    title: "After class sunlight",
    caption: "Windows glowing gold and a tote bag on the seat beside me.",
    height: "h-72",
    tone: "from-[#eed1b6] via-[#f7ead1] to-[#d9b59b]",
    accent: "bg-[#fff7ef]",
    tags: ["sunset", "campus", "soft"],
    board: "golden-hour",
  },
  {
    id: 2,
    title: "Downtown in peach light",
    caption: "City buildings felt cinematic for a second and I had to save it.",
    height: "h-96",
    tone: "from-[#b56b52] via-[#e0b18e] to-[#f5e5cf]",
    accent: "bg-[#fff2e7]",
    tags: ["city", "golden hour", "aesthetic"],
    board: "street-moments",
  },
  {
    id: 3,
    title: "Matcha break",
    caption: "Glass cup, journal page, and one quiet table by the window.",
    height: "h-80",
    tone: "from-[#d2dfc8] via-[#eef3e7] to-[#f7ead1]",
    accent: "bg-[#f5faef]",
    tags: ["cafe", "green", "calm"],
    board: "coffee-corners",
  },
  {
    id: 4,
    title: "Hotel hallway mirror",
    caption: "A little blurry, a little glossy, exactly the vibe I wanted.",
    height: "h-[26rem]",
    tone: "from-[#513933] via-[#916a5f] to-[#f0ddd0]",
    accent: "bg-[#fff1eb]",
    tags: ["mirror", "travel", "moody"],
    board: "little-things",
  },
  {
    id: 5,
    title: "Rain on the windshield",
    caption: "Street lamps turning into watercolor on the drive home.",
    height: "h-64",
    tone: "from-[#50616e] via-[#8295a3] to-[#d6dfe0]",
    accent: "bg-[#eef4f5]",
    tags: ["night", "rain", "drive"],
    board: "street-moments",
  },
  {
    id: 6,
    title: "Bookstore corner",
    caption: "Cream shelves, warm lamps, and the quietest hour of the day.",
    height: "h-88",
    tone: "from-[#c4966e] via-[#efd2ae] to-[#fbf4df]",
    accent: "bg-[#fff9ef]",
    tags: ["books", "cozy", "neutral"],
    board: "coffee-corners",
  },
  {
    id: 7,
    title: "Desk after midnight",
    caption: "Notes everywhere, one lamp on, and the city still awake outside.",
    height: "h-72",
    tone: "from-[#3d3744] via-[#7b6977] to-[#d8c2c2]",
    accent: "bg-[#f9eff2]",
    tags: ["study", "night", "soft chaos"],
    board: "little-things",
  },
  {
    id: 8,
    title: "Flower stand stop",
    caption: "Tiny bundle of ranunculus wrapped in paper on the passenger seat.",
    height: "h-[22rem]",
    tone: "from-[#d08d84] via-[#f3c4b9] to-[#fff0e8]",
    accent: "bg-[#fff4f0]",
    tags: ["flowers", "errands", "pink"],
    board: "little-things",
  },
];
