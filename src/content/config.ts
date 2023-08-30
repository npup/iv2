// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// 2. Define your collection(s)
const pagesCollection = defineCollection({
    schema: () =>
        z.object({
            editDate: z.date().default(new Date()),
        }),
});

const instrumentsCollection = defineCollection({
    schema: () =>
        z.object({
            name: z.string(),
            price: z.number().optional(),
            sold: z.boolean().or(z.date()).default(false),
            descrShort: z.string().or(z.null()).optional().default(""),
            descrLong: z.string().or(z.null()).optional().default(""),
            images: z
                .array(
                    z.tuple([
                        z.string(),
                        z
                            .string()
                            .default("Bild på musikinstrument eller tillbehör"),
                    ])
                )
                .or(z.null())
                .default([]),
            noLink: z.boolean().default(false),
            hidden: z.boolean().default(false),
            _itemId: z.string().optional(), // generated in data/instruments.ts! Don't set this in frontmatter
        }),
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
    pages: pagesCollection,
    instruments: instrumentsCollection,
};
