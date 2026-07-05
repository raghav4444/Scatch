/**
 * Mega-menu taxonomy — slug must match Product.category in the database.
 * Optional `accent` drives column heading tint in the UI ('women' | 'kids').
 */
const MEGA_MENU = [
    {
        id: 'men',
        label: 'Men',
        accent: '',
        columns: [
            {
                heading: 'Topwear',
                links: [
                    { label: 'T-Shirts', slug: 'men-t-shirts' },
                    { label: 'Casual Shirts', slug: 'men-casual-shirts' },
                    { label: 'Formal Shirts', slug: 'men-formal-shirts' },
                    { label: 'Polo shirts', slug: 'men-polo-shirts' },
                    { label: 'Sweatshirts & hoodies', slug: 'men-sweatshirts' },
                    { label: 'Sweaters', slug: 'men-sweaters' },
                    { label: 'Jackets', slug: 'men-jackets' },
                    { label: 'Blazers & trench coats', slug: 'men-blazers-coats' }
                ]
            },
            {
                heading: 'Indian & festive',
                links: [
                    { label: 'Kurtas', slug: 'men-kurtas' },
                    { label: 'Sherwanis', slug: 'men-sherwanis' },
                    { label: 'Nehru jackets', slug: 'men-nehru-jackets' },
                    { label: 'Dhotis & pyjamas', slug: 'men-dhotis' },
                    { label: 'Stoles & scarves', slug: 'men-stoles-scarves' }
                ]
            },
            {
                heading: 'Bottomwear',
                links: [
                    { label: 'Jeans', slug: 'men-jeans' },
                    { label: 'Casual trousers', slug: 'men-casual-trousers' },
                    { label: 'Formal trousers', slug: 'men-formal-trousers' },
                    { label: 'Chinos', slug: 'men-chinos' },
                    { label: 'Shorts', slug: 'men-shorts' },
                    { label: 'Track pants & joggers', slug: 'men-track-pants' }
                ]
            },
            {
                heading: 'Footwear',
                links: [
                    { label: 'Casual shoes', slug: 'men-casual-shoes' },
                    { label: 'Sneakers & trainers', slug: 'men-sneakers' },
                    { label: 'Formal shoes', slug: 'men-formal-shoes' },
                    { label: 'Boots', slug: 'men-boots' },
                    { label: 'Sandals & sliders', slug: 'men-sandals' },
                    { label: 'Sports shoes', slug: 'men-sports-shoes' }
                ]
            },
            {
                heading: 'Sports & accessories',
                links: [
                    { label: 'Activewear', slug: 'men-activewear' },
                    { label: 'Athleisure kits', slug: 'men-athleisure-kits' },
                    { label: 'Watches', slug: 'men-watches' },
                    { label: 'Belts & wallets', slug: 'men-belts-wallets' },
                    { label: 'Bags & backpacks', slug: 'men-bags' },
                    { label: 'Sunglasses', slug: 'men-sunglasses' },
                    { label: 'Jewellery men', slug: 'men-jewellery' }
                ]
            }
        ]
    },
    {
        id: 'women',
        label: 'Women',
        accent: 'women',
        columns: [
            {
                heading: 'Indian & fusion wear',
                links: [
                    { label: 'Kurtas & suits', slug: 'women-kurtas-suits' },
                    { label: 'Kurtas & Kurtis', slug: 'women-kurtis' },
                    { label: 'Ethnic gowns', slug: 'women-ethnic-gowns' },
                    { label: 'Salwars & churidars', slug: 'women-salwars-churidars' },
                    { label: 'Sarees', slug: 'women-sarees' },
                    { label: 'Lehengas', slug: 'women-lehengas' },
                    { label: 'Dupattas & stoles', slug: 'women-dupattas' },
                    { label: 'Leggings & tights', slug: 'women-leggings' },
                    { label: 'Ethnic skirts', slug: 'women-ethnic-skirts' },
                    { label: 'Ethnic shrugs', slug: 'women-ethnic-shrugs' }
                ]
            },
            {
                heading: 'Western wear',
                links: [
                    { label: 'Dresses', slug: 'women-dresses' },
                    { label: 'Tops & shirts', slug: 'women-tops' },
                    { label: 'T-shirts', slug: 'women-t-shirts' },
                    { label: 'Jeans', slug: 'women-jeans' },
                    { label: 'Trousers', slug: 'women-trousers' },
                    { label: 'Shorts & capris', slug: 'women-shorts-capris' },
                    { label: 'Co-ords', slug: 'women-co-ords' },
                    { label: 'Jumpsuits', slug: 'women-jumpsuits' },
                    { label: 'Shrugs & cardigans', slug: 'women-shrug-cardigans' },
                    { label: 'Sweaters & knitwear', slug: 'women-sweaters' },
                    { label: 'Jackets & trench coats', slug: 'women-jackets-blazers' }
                ]
            },
            {
                heading: 'Plus size',
                links: [
                    { label: 'Plus tops & tees', slug: 'women-plus-tops' },
                    { label: 'Plus bottoms', slug: 'women-plus-bottoms' },
                    { label: 'Plus dresses', slug: 'women-plus-dresses' },
                    { label: 'Plus ethnic edit', slug: 'women-plus-ethnic' }
                ]
            },
            {
                heading: 'Footwear & sports',
                links: [
                    { label: 'Flats', slug: 'women-flats' },
                    { label: 'Heels', slug: 'women-heels' },
                    { label: 'Boots', slug: 'women-boots' },
                    { label: 'Sneakers & trainers', slug: 'women-sneakers' },
                    { label: 'Sports shoe women', slug: 'women-sports-shoes-foot' },
                    { label: 'Sports clothing', slug: 'women-sports-clothing' },
                    { label: 'Sports footwear', slug: 'women-activewear-footwear' },
                    { label: 'Yoga studio sets', slug: 'women-studio-yoga' }
                ]
            },
            {
                heading: 'Maternity & frames',
                links: [
                    { label: 'Maternity wear', slug: 'women-maternity' },
                    { label: 'Nursing essentials', slug: 'women-nursing' },
                    { label: 'Sunglasses', slug: 'women-sunglasses' },
                    { label: 'Optical frames', slug: 'women-optical-frames' }
                ]
            },
            {
                heading: 'Lingerie & sleepwear',
                links: [
                    { label: 'Bras', slug: 'women-bras' },
                    { label: 'Briefs & underwear', slug: 'women-briefs' },
                    { label: 'Shapewear', slug: 'women-shapewear' },
                    { label: 'Swim & beachwear', slug: 'women-swimwear' },
                    { label: 'Loungewear', slug: 'women-loungewear' },
                    { label: 'Nightdress & pyjamas', slug: 'women-nightdress' },
                    { label: 'Robes', slug: 'women-robes' }
                ]
            },
            {
                heading: 'Beauty & personal care',
                links: [
                    { label: 'Makeup face', slug: 'women-beauty-makeup' },
                    { label: 'Skin care edit', slug: 'women-skincare-mini' },
                    { label: 'Lipsticks & liners', slug: 'women-lip-collection' },
                    { label: 'Fragrances women', slug: 'women-fragrances' },
                    { label: 'Premium beauty capsules', slug: 'women-premium-beauty' },
                    { label: 'Hair care picks', slug: 'women-haircare-mini' }
                ]
            },
            {
                heading: 'Gadgets & accessories',
                links: [
                    { label: 'Smart wearables', slug: 'women-smart-wearables' },
                    { label: 'Headphones Capsule', slug: 'women-headphones-mini' },
                    { label: 'Fine jewellery edit', slug: 'women-fine-jewellery' },
                    { label: 'Fashion jewellery', slug: 'women-jewellery' },
                    { label: 'Earrings stacks', slug: 'women-earrings' },
                    { label: 'Handbags leather', slug: 'women-handbags' },
                    { label: 'Totes & satchels', slug: 'women-handbags-mini' },
                    { label: 'Backpacks', slug: 'women-backpacks' },
                    { label: 'Wallets & belts', slug: 'women-wallets-belts' },
                    { label: 'Luggage & trolley', slug: 'women-luggage' }
                ]
            }
        ]
    },
    {
        id: 'kids',
        label: 'Kids',
        accent: 'kids',
        columns: [
            {
                heading: 'Boys clothing',
                links: [
                    { label: 'T-Shirts', slug: 'kids-boys-t-shirts' },
                    { label: 'Shirts', slug: 'kids-boys-shirts' },
                    { label: 'Shorts', slug: 'kids-boys-shorts' },
                    { label: 'Jeans', slug: 'kids-boys-jeans' },
                    { label: 'Trousers', slug: 'kids-boys-trousers' },
                    { label: 'Ethnic wear boys', slug: 'kids-boys-ethnic' },
                    { label: 'Winter jackets boys', slug: 'kids-boys-jackets-winter' },
                    { label: 'Clothing combos', slug: 'kids-boys-combos' }
                ]
            },
            {
                heading: 'Girls clothing',
                links: [
                    { label: 'Dresses party', slug: 'kids-girls-dresses' },
                    { label: 'Tops', slug: 'kids-girls-tops' },
                    { label: 'T-shirts', slug: 'kids-girls-t-shirts' },
                    { label: 'Clothing sets', slug: 'kids-girls-sets' },
                    { label: 'Jeans', slug: 'kids-girls-jeans' },
                    { label: 'Trousers & leggings', slug: 'kids-girls-trousers' },
                    { label: 'Skirts & shorts', slug: 'kids-girls-skirts-short' },
                    { label: 'Ethnic wear girls', slug: 'kids-girls-ethnic' },
                    { label: 'Lehenga choli kids', slug: 'kids-girls-lehengas' },
                    { label: 'Winter layers girls', slug: 'kids-girls-winter' }
                ]
            },
            {
                heading: 'Infants',
                links: [
                    { label: 'Bodysuits', slug: 'kids-infants-bodysuits' },
                    { label: 'Rompers', slug: 'kids-infant-rompers' },
                    { label: 'Sleepsuits', slug: 'kids-infants-sleepsuits' },
                    { label: 'Infant sets', slug: 'kids-infant-sets' },
                    { label: 'Winter infant', slug: 'kids-infants-winter' },
                    { label: 'Accessories infants', slug: 'kids-infant-accessories' }
                ]
            },
            {
                heading: 'Footwear',
                links: [
                    { label: 'Casual shoe boys', slug: 'kids-footwear-casual-boys' },
                    { label: 'Casual shoe girls', slug: 'kids-footwear-casual-girls' },
                    { label: 'Flip flops kids', slug: 'kids-footwear-flipflops' },
                    { label: 'Sports shoes kids', slug: 'kids-sports-footwear' },
                    { label: 'Flats girls kids', slug: 'kids-girls-footwear-flat' },
                    { label: 'School shoes', slug: 'kids-school-shoes' }
                ]
            },
            {
                heading: 'Kids accessories',
                links: [
                    { label: 'Socks packs', slug: 'kids-accessories-socks' },
                    { label: 'Caps & hats', slug: 'kids-accessories-caps' },
                    { label: 'School bags', slug: 'kids-accessories-school-bags' },
                    { label: 'Belts boys kids', slug: 'kids-accessories-belts' },
                    { label: 'Winter gloves kids', slug: 'kids-accessories-winter-mini' },
                    { label: 'Jewellery kits kids', slug: 'kids-accessories-mini-jewellery' },
                    { label: 'Featured kids labels', slug: 'kids-brands-curate' },
                    { label: 'Holiday capsule kids', slug: 'kids-holiday-capsule' }
                ]
            }
        ]
    }
];

/** Maps ?department= to Mongo category slug prefix regex */
const DEPARTMENT_PREFIX_REGEX = {
    men: '^men-',
    women: '^women-',
    kids: '^kids-'
};

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

function normalizeDepartment(dep) {
    if (!dep || typeof dep !== 'string') return '';
    const d = dep.trim().toLowerCase();
    return DEPARTMENT_PREFIX_REGEX[d] ? d : '';
}

module.exports = {
    MEGA_MENU,
    DEPARTMENT_PREFIX_REGEX,
    findCategoryMeta,
    collectAllSlugs,
    normalizeDepartment
};
