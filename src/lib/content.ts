import { boards as mockBoards, pins as mockPins, type Board, type Pin } from "@/data/mock-data";
import { hasSupabaseEnv, supabase } from "@/lib/supabase";

type SupabaseBoardRow = {
  id: string;
  name: string;
  description: string | null;
  cover_image_url: string | null;
};

type SupabasePinRow = {
  id: string;
  title: string;
  caption: string | null;
  image_url: string;
  board_id: string | null;
  boards: { id: string; name: string | null }[] | null;
  pin_tags: { tag: string }[] | null;
};

const tonePresets = [
  {
    height: "h-72",
    tone: "from-[#eed1b6] via-[#f7ead1] to-[#d9b59b]",
    accent: "bg-[#fff7ef]",
    coverTone: "bg-[linear-gradient(150deg,#c77f63_0%,#f5c8a5_100%)]",
  },
  {
    height: "h-96",
    tone: "from-[#b56b52] via-[#e0b18e] to-[#f5e5cf]",
    accent: "bg-[#fff2e7]",
    coverTone: "bg-[linear-gradient(150deg,#becdb7_0%,#eef5ea_100%)]",
  },
  {
    height: "h-80",
    tone: "from-[#d2dfc8] via-[#eef3e7] to-[#f7ead1]",
    accent: "bg-[#f5faef]",
    coverTone: "bg-[linear-gradient(150deg,#5c6474_0%,#d4d9df_100%)]",
  },
  {
    height: "h-[26rem]",
    tone: "from-[#513933] via-[#916a5f] to-[#f0ddd0]",
    accent: "bg-[#fff1eb]",
    coverTone: "bg-[linear-gradient(150deg,#e1b4a5_0%,#fff2ea_100%)]",
  },
];

function mapBoard(row: SupabaseBoardRow, index: number): Board {
  const preset = tonePresets[index % tonePresets.length];

  return {
    id: row.id,
    name: row.name,
    description: row.description ?? "A curated board from your visual diary.",
    count: 0,
    coverTone: preset.coverTone,
  };
}

function mapPin(row: SupabasePinRow, index: number): Pin {
  const preset = tonePresets[index % tonePresets.length];
  const numericId = Number.parseInt(row.id.replaceAll("-", "").slice(0, 8), 16);
  const relatedBoard = row.boards?.[0];

  return {
    id: Number.isNaN(numericId) ? index + 1 : numericId,
    title: row.title,
    caption: row.caption ?? "A saved moment from Jnvi Pinterest.",
    height: preset.height,
    tone: preset.tone,
    accent: preset.accent,
    tags: row.pin_tags?.map((entry) => entry.tag) ?? [],
    board: row.board_id ?? relatedBoard?.id ?? "unfiled",
    imageUrl: row.image_url,
  };
}

export async function getPins(): Promise<Pin[]> {
  if (!hasSupabaseEnv || !supabase) {
    return mockPins;
  }

  const { data, error } = await supabase
    .from("pins")
    .select("id, title, caption, image_url, board_id, boards(id, name), pin_tags(tag)")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return mockPins;
  }

  return data.map((pin, index) => mapPin(pin, index));
}

export async function getBoards(): Promise<Board[]> {
  if (!hasSupabaseEnv || !supabase) {
    return mockBoards;
  }

  const { data, error } = await supabase
    .from("boards")
    .select("id, name, description, cover_image_url")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return mockBoards;
  }

  const boards = data.map((board, index) => mapBoard(board, index));
  const pins = await getPins();

  return boards.map((board) => ({
    ...board,
    count: pins.filter((pin) => pin.board === board.id).length,
  }));
}

export async function getBoardById(id: string) {
  const boards = await getBoards();
  return boards.find((board) => board.id === id) ?? null;
}

export async function getPinsByBoard(id: string) {
  const pins = await getPins();
  return pins.filter((pin) => pin.board === id);
}

export async function searchAllPins(query: string) {
  const pins = await getPins();
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return pins;
  }

  return pins.filter((pin) => {
    const haystack = [pin.title, pin.caption, pin.board, ...pin.tags]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}
