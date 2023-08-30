import { getCollection } from "astro:content";
import type { Instrument } from "~/types";

export const instruments = (await getCollection("instruments"))
    .filter(({ data: { hidden } }) => !hidden)
    .map((instrument) => {
        instrument.data._itemId = instrument.slug.replace(/_.+$/, "");
        return instrument;
    })
    .sort(recentIdsFirst);

function recentIdsFirst(i0: Instrument, i1: Instrument) {
    const { id: id0 } = i0;
    const { id: id1 } = i1;

    if (id0 > id1) {
        return -1;
    }
    if (id0 < id1) {
        return 1;
    }

    return 0;
}
