/**
 * Mega-menu taxonomy — slug must match Product.category in the database.
 */
const MEGA_MENU = [
    {
        id: 'men',
        label: 'Men',
        columns: [
            {
                heading: 'Topwear',
                links: [
                    { label: 'T-Shirts', slug: 'men-t-shirts' },
                    { label: 'Casual Shirts', slug: 'men-casual-shirts' },
                    { label: 'Formal Shirts', slug: 'men-formal-shirts' },
                    { label: 'Sweatshirts', slug: 'men-sweatshirts' },
                    { label: 'Sweaters', slug: 'men-sweaters' },
                    { label: 'Jackets', slug: 'men-jackets' },
                    { label: 'Blazers & Coats', slug: 'men-blazers-coats' }
                ]
            },
            {
                heading: 'Indian & festive',
                links: [
                    { label: 'Kurtas', slug: 'men-kurtas' },
                    { label: 'Sherwanis', slug: 'men-sherwanis' },
                    { label: 'Nehru jackets', slug: 'men-nehru-jackets' },
                    { label: 'Dhotis', slug: 'men-dhotis' }
                ]
            },
            {
                heading: 'Bottomwear',
                links: [
                    { label: 'Jeans', slug: 'men-jeans' },
                    { label: 'Casual trousers', slug: 'men-casual-trousers' },
                    { label: 'Formal trousers', slug: 'men-formal-trousers' },
                    { label: 'Shorts', slug: 'men-shorts' },
                    { label: 'Track pants', slug: 'men-track-pants' }
                ]
            },
            {
                heading: 'Footwear',
                links: [
                    { label: 'Casual shoes', slug: 'men-casual-shoes' },
                    { label: 'Sneakers', slug: 'men-sneakers' },
                    { label: 'Formal shoes', slug: 'men-formal-shoes' },
                    { label: 'Boots', slug: 'men-boots' },
                    { label: 'Sandals', slug: 'men-sandals' }
                ]
            },
            {
                heading: 'Sports & accessories',
                links: [
                    { label: 'Sports shoes', slug: 'men-sports-shoes' },
                    { label: 'Activewear', slug: 'men-activewear' },
                    { label: 'Watches', slug: 'men-watches' },
                    { label: 'Belts & wallets', slug: 'men-belts-wallets' },
                    { label: 'Bags', slug: 'men-bags' }
                ]
            }
        ]
    },
    {
        id: 'women',
        label: 'Women',
        columns: [
            {
                heading: 'Indian & fusion',
                links: [
                    { label: 'Sarees', slug: 'women-sarees' },
                    { label: 'Kurtas & suits', slug: 'women-kurtas-suits' },
                    { label: 'Lehengas', slug: 'women-lehengas' },
                    { label: 'Dupattas', slug: 'women-dupattas' }
                ]
            },
            {
                heading: 'Western wear',
                links: [
                    { label: 'Dresses', slug: 'women-dresses' },
                    { label: 'Tops', slug: 'women-tops' },
                    { label: 'T-shirts', slug: 'women-t-shirts' },
                    { label: 'Jeans', slug: 'women-jeans' },
                    { label: 'Skirts', slug: 'women-skirts' },
                    { label: 'Co-ords', slug: 'women-co-ords' }
                ]
            },
            {
                heading: 'Footwear',
                links: [
                    { label: 'Heels', slug: 'women-heels' },
                    { label: 'Flats', slug: 'women-flats' },
                    { label: 'Boots', slug: 'women-boots' },
                    { label: 'Sneakers', slug: 'women-sneakers' }
                ]
            },
            {
                heading: 'Beauty & bags',
                links: [
                    { label: 'Handbags', slug: 'women-handbags' },
                    { label: 'Jewellery', slug: 'women-jewellery' },
                    { label: 'Fragrances', slug: 'women-fragrances' },
                    { label: 'Sunglasses', slug: 'women-sunglasses' }
                ]
            }
        ]
    },
    {
        id: 'kids',
        label: 'Kids',
        columns: [
            {
                heading: 'Boys clothing',
                links: [
                    { label: 'T-Shirts', slug: 'kids-boys-t-shirts' },
                    { label: 'Shirts', slug: 'kids-boys-shirts' },
                    { label: 'Jeans & trousers', slug: 'kids-boys-bottoms' },
                    { label: 'Ethnic wear', slug: 'kids-boys-ethnic' }
                ]
            },
            {
                heading: 'Girls clothing',
                links: [
                    { label: 'Dresses', slug: 'kids-girls-dresses' },
                    { label: 'Tops & tees', slug: 'kids-girls-tops' },
                    { label: 'Skirts & shorts', slug: 'kids-girls-bottoms' },
                    { label: 'Ethnic wear', slug: 'kids-girls-ethnic' }
                ]
            },
            {
                heading: 'Infants',
                links: [
                    { label: 'Rompers', slug: 'kids-infant-rompers' },
                    { label: 'Sets', slug: 'kids-infant-sets' },
                    { label: 'Accessories', slug: 'kids-infant-accessories' }
                ]
            },
            {
                heading: 'Footwear',
                links: [
                    { label: 'Boys shoes', slug: 'kids-boys-shoes' },
                    { label: 'Girls shoes', slug: 'kids-girls-shoes' },
                    { label: 'School shoes', slug: 'kids-school-shoes' }
                ]
            }
        ]
    },
    {
        id: 'home-beauty',
        label: 'Home & beauty',
        columns: [
            {
                heading: 'Home',
                links: [
                    { label: 'Bedding', slug: 'home-bedding' },
                    { label: 'Bath', slug: 'home-bath' },
                    { label: 'Decor', slug: 'home-decor' },
                    { label: 'Kitchen', slug: 'home-kitchen' }
                ]
            },
            {
                heading: 'Beauty',
                links: [
                    { label: 'Makeup', slug: 'beauty-makeup' },
                    { label: 'Skin care', slug: 'beauty-skincare' },
                    { label: 'Hair care', slug: 'beauty-haircare' },
                    { label: 'Fragrances', slug: 'beauty-fragrances' }
                ]
            },
            {
                heading: 'Studio / curated',
                links: [
                    { label: 'New edits', slug: 'studio-new-edits' },
                    { label: 'Collaborations', slug: 'studio-collabs' },
                    { label: 'Limited drops', slug: 'studio-limited' }
                ]
            }
        ]
    }
];

function findCategoryMeta(slug) {
    if (!slug || typeof slug !== 'string') return null;
    const normalized = slug.trim();
    for (const root of MEGA_MENU) {
        for (const col of root.columns) {
            for (const link of col.links) {
                if (link.slug === normalized) {
                    return {
                        rootId: root.id,
                        rootLabel: root.label,
                        sectionHeading: col.heading,
                        label: link.label,
                        slug: link.slug
                    };
                }
            }
        }
    }
    return null;
}

function collectAllSlugs() {
    const slugs = [];
    for (const root of MEGA_MENU) {
        for (const col of root.columns) {
            for (const link of col.links) {
                slugs.push(link.slug);
            }
        }
    }
    return slugs;
}

module.exports = {
    MEGA_MENU,
    findCategoryMeta,
    collectAllSlugs
};
