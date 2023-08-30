import type { ImageMetadata } from "astro";
import { type CollectionEntry } from "astro:content";
export type Instrument = CollectionEntry<"instruments">;

export type InstrumentImage = ImageMetadata & {
    title?: string;
};
