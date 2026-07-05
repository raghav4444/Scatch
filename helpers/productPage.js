const BRAND_STOP_SECOND = new Set([
    'Men',
    'Women',
    'Kids',
    'Boys',
    'Girls',
    'The',
    'Slim',
    'Regular',
    'Relaxed',
    'Super',
    'Easy',
    'Pure',
    'Cotton',
    'Fit',
    'Full',
    'Half',
    'Long',
    'Short',
    'Premium',
    'Classic',
    'Formal',
    'Casual'
]);

function guessBrand(name) {
    const words = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!words.length) return 'NEWRELLA';
    let brand = words[0];
    const w1 = words[1];
    if (
        w1
        && !BRAND_STOP_SECOND.has(w1)
        && /^[A-Z]/.test(w1)
        && w1.length < 18
    ) {
        brand = `${brand} ${w1}`;
    }
    return brand;
}

/** Title strip: remainder after inferred brand phrase */
function productTitleRemainder(name, brand) {
    const n = String(name || '').trim();
    const b = String(brand || '').trim();
    if (!b || !n.startsWith(b)) return n;
    return n.slice(b.length).trim().replace(/^[-–]\s*/, '') || n;
}

function priceBreakdown(price, discount) {
    const mrp = Number(price) || 0;
    const off = Number(discount) || 0;
    const valid = off > 0 && off < mrp;
    const selling = valid ? Math.round((mrp - off) * 100) / 100 : mrp;
    const pct = valid ? Math.round((off / mrp) * 100) : 0;
    const savings = valid ? Math.round(off) : 0;
    return { mrp, selling, discountPct: pct, savings, validDiscount: valid };
}

function deterministicRating(idStr) {
    let h = 0;
    for (let i = 0; i < idStr.length; i++)
        h = (Math.imul(31, h) + idStr.charCodeAt(i)) | 0;
    const frac = Math.abs(h % 10) / 10;
    return Math.round((42 + frac * 6)) / 10;
}

function deterministicReviewCount(idStr) {
    let h = 0;
    for (let i = 0; i < idStr.length; i++)
        h = (Math.imul(17, h) + idStr.charCodeAt(i)) >>> 0;
    return 340 + (h % 900);
}

/** Star counts summing exactly to total (deterministic per product id). */
function deterministicStarHistogram(idStr, total) {
    let h = 0;
    for (let i = 0; i < idStr.length; i++)
        h = (Math.imul(131, h) + idStr.charCodeAt(i)) >>> 0;
    const base = [128, 72, 40, 24, 16];
    const w = base.map((b, i) => Math.max(1, b + ((h >>> (i * 5)) & 63)));
    const raw = w.reduce((a, b) => a + b, 0);
    const rows = {};
    rows[5] = Math.floor((w[0] / raw) * total);
    rows[4] = Math.floor((w[1] / raw) * total);
    rows[3] = Math.floor((w[2] / raw) * total);
    rows[2] = Math.floor((w[3] / raw) * total);
    rows[1] = total - rows[5] - rows[4] - rows[3] - rows[2];
    if (rows[1] < 0) {
        rows[2] += rows[1];
        rows[1] = 0;
    }
    return rows;
}

/** Fit / length thumbs-up percentages for "What customers said". */
function deterministicFitStats(idStr) {
    let h = 0;
    for (let i = 0; i < idStr.length; i++)
        h = (Math.imul(17, h) + idStr.charCodeAt(i)) >>> 0;
    return {
        fit: 78 + (h % 12),
        length: 92 + (h % 6)
    };
}

module.exports = {
    guessBrand,
    productTitleRemainder,
    priceBreakdown,
    deterministicRating,
    deterministicReviewCount,
    deterministicStarHistogram,
    deterministicFitStats
};
