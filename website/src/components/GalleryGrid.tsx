"use client";

import { useState } from "react";
import { asset } from "@/config/site";
import { galleryCategories, type GalleryCategory, type GalleryItem } from "@/data/gallery";
import type { Dictionary } from "@/i18n/dictionaries/zh-tw";
import { NailTile } from "./illustrations";

export function GalleryTile({
  item,
  index,
  label,
  note,
}: {
  item: GalleryItem;
  index: number;
  label: string;
  note: string;
}) {
  return (
    <figure className="group relative overflow-hidden bg-blush-200">
      {item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(item.image)}
          alt={label}
          title={item.credit ? `Photo: ${item.credit.photographer} / Pexels` : undefined}
          width={640}
          height={640}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <NailTile
          id={item.id}
          colors={item.colors}
          shape={item.shape}
          variant={index}
          className="aspect-square w-full transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-plum-900/70 to-transparent px-4 pb-3 pt-10 text-sm text-white">
        <span>{label}</span>
        {(!item.image || item.credit) && <span className="text-[0.65rem] uppercase tracking-widest text-white/70">{note}</span>}
      </figcaption>
    </figure>
  );
}

/** 作品集：可依分類篩選 */
export function GalleryGrid({
  items,
  dict,
}: {
  items: GalleryItem[];
  dict: Dictionary;
}) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");
  const shown = filter === "all" ? items : items.filter((i) => i.category === filter);
  const options: (GalleryCategory | "all")[] = ["all", ...galleryCategories];

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2" role="group">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            aria-pressed={filter === opt}
            onClick={() => setFilter(opt)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              filter === opt
                ? "border-blush-500 bg-blush-400 text-ink"
                : "border-blush-300 bg-white/60 text-muted hover:border-blush-400 hover:text-ink"
            }`}
          >
            {opt === "all" ? dict.gallery.all : dict.gallery.categories[opt]}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {shown.map((item) => (
          <GalleryTile
            key={item.id}
            item={item}
            index={items.indexOf(item)}
            label={dict.gallery.categories[item.category]}
            note={dict.common.placeholderNote}
          />
        ))}
      </div>
    </>
  );
}
