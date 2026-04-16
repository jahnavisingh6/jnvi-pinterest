"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { SITE_OWNER_ID } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

type UploadBoard = {
  id: string;
  name: string;
};

type UploadFormProps = {
  boards: UploadBoard[];
  supabaseReady: boolean;
};

export function UploadForm({ boards, supabaseReady }: UploadFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setStatus(null);

    if (!supabaseReady || !supabase) {
      setError("Add your Supabase environment variables first.");
      return;
    }

    const file = formData.get("image");
    const title = String(formData.get("title") ?? "").trim();
    const caption = String(formData.get("caption") ?? "").trim();
    const tagsValue = String(formData.get("tags") ?? "").trim();
    const boardId = String(formData.get("boardId") ?? "").trim();

    if (!(file instanceof File) || file.size === 0) {
      setError("Choose a photo to upload first.");
      return;
    }

    if (!title) {
      setError("Add a title before saving.");
      return;
    }

    const fileExt = file.name.split(".").pop() ?? "jpg";
    const filePath = `${SITE_OWNER_ID}/${Date.now()}-${crypto.randomUUID()}.${fileExt}`;

    setStatus("Uploading your photo...");

    const uploadResult = await supabase.storage.from("pins").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (uploadResult.error) {
      setError(uploadResult.error.message);
      setStatus(null);
      return;
    }

    const publicUrlResult = supabase.storage.from("pins").getPublicUrl(filePath);
    const imageUrl = publicUrlResult.data.publicUrl;

    const pinInsert = await supabase
      .from("pins")
      .insert({
        user_id: SITE_OWNER_ID,
        board_id: boardId || null,
        image_url: imageUrl,
        title,
        caption: caption || null,
      })
      .select("id")
      .single();

    if (pinInsert.error) {
      setError(pinInsert.error.message);
      setStatus(null);
      return;
    }

    const tags = tagsValue
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean);

    if (tags.length > 0) {
      const tagsInsert = await supabase.from("pin_tags").insert(
        tags.map((tag) => ({
          pin_id: pinInsert.data.id,
          tag,
        })),
      );

      if (tagsInsert.error) {
        setError(tagsInsert.error.message);
        setStatus(null);
        return;
      }
    }

    setStatus("Saved. Refreshing your feed...");

    startTransition(() => {
      router.refresh();
      router.push("/");
    });
  }

  return (
    <form
      action={handleSubmit}
      className="mt-8 space-y-4"
    >
      <label className="block rounded-[1.6rem] border border-dashed border-[#dfcbbb] bg-[#fff8f1] p-8 text-center">
        <span className="text-sm font-semibold text-ink">Choose a photo</span>
        <p className="mt-2 text-sm leading-6 text-muted">
          Upload one of your own images from your phone or laptop.
        </p>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="mt-4 block w-full text-sm text-muted file:mr-4 file:rounded-full file:border-0 file:bg-clay file:px-4 file:py-2 file:font-semibold file:text-white hover:file:bg-[#bb744e]"
          required
        />
      </label>

      <input
        type="text"
        name="title"
        placeholder="Title"
        className="w-full rounded-[1.2rem] border border-[#eadfd2] bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-[#cf9d80]"
        required
      />
      <textarea
        name="caption"
        placeholder="Caption"
        rows={5}
        className="w-full rounded-[1.2rem] border border-[#eadfd2] bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-[#cf9d80]"
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags separated by commas"
        className="w-full rounded-[1.2rem] border border-[#eadfd2] bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-[#cf9d80]"
      />
      <select
        name="boardId"
        className="w-full rounded-[1.2rem] border border-[#eadfd2] bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-[#cf9d80]"
      >
        <option value="">No board yet</option>
        {boards.map((board) => (
          <option key={board.id} value={board.id}>
            {board.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={!supabaseReady || isPending}
        className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4c342a] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save pin"}
      </button>

      {status ? <p className="text-sm text-[#7d5b4d]">{status}</p> : null}
      {error ? <p className="text-sm text-[#b14d2b]">{error}</p> : null}
    </form>
  );
}
