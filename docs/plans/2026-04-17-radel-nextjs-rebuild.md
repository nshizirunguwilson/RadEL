# RadEl — Next.js 15 Rebuild Implementation Plan

> **Status:** Proposed — awaiting approval
> **Owner:** Wilson Nshizirungu (wilsonn.tech)
> **Date created:** 2026-04-17
> **Target deploy:** https://rad-el.vercel.app/

---

## 1. Goal

Migrate the existing Vite + React 18 + React Router SPA to a **production-grade Next.js 15 App Router + TypeScript (strict) + Tailwind v4** storefront for RadEl women's fine jewelry. Complete every missing page, wire every non-functional feature, replace all Lorem Ipsum with real editorial copy, and ship a frontend-only, 100% mock-data site that behaves exactly like a real product.

## 2. Locked Architectural Decisions (confirmed with owner)

| Decision | Choice | Implication |
|---|---|---|
| Typography | **Poppins + Fraunces** | Fraunces variable serif for H1/H2 (hero, section titles, editorial, blog headings); Poppins for UI/body. Retire Italiana + Corinthia. |
| Primitives | **shadcn/ui base, heavily restyled** | Install shadcn/Radix primitives; override all visual styling with RadEl tokens. Keep Radix a11y internals. |
| Repo strategy | **In-place on `v2/nextjs` branch** | Scaffold Next.js alongside Vite; Vercel preview on the branch; archive legacy under `_legacy/` at merge time. |

## 3. Locked Stack

- **Framework:** Next.js 15 App Router (RSC by default)
- **Language:** TypeScript strict, no `any`
- **Styling:** Tailwind v4 CSS-first (`@import "tailwindcss"` + `@theme`)
- **State:** Zustand + persist middleware (cart, wishlist, currency, language, auth flag, recently-viewed, newsletter)
- **Motion:** Framer Motion, respects `prefers-reduced-motion`
- **Icons:** `react-icons` only (`fi`, `hi2`, `bs`) — zero emoji anywhere
- **Content:** MDX for blog (`next-mdx-remote`), frontmatter-driven
- **i18n:** `next-intl` for EN/FR
- **Forms:** `react-hook-form` + `zod`
- **Primitives:** shadcn/ui on Radix
- **Data:** 100% typed TS modules in `src/data/` — no backend

## 4. Design Tokens (CSS-first, `@theme` block)

Defined in `src/app/globals.css`. **Flat colors only — no gradients anywhere.**

```
--color-bg:          oklch(97.5% 0.012 85)   /* warm off-white, existing snow */
--color-surface:     oklch(94.5% 0.018 80)   /* soft stone (new) */
--color-divider:     oklch(78% 0.012 75)     /* warm grey (new) */
--color-meta:        oklch(66% 0.015 75)     /* meta text */
--color-ink:         oklch(20% 0.015 210)    /* deep teal, primary text */
--color-ink-strong:  oklch(14% 0.01 210)     /* near-black for H1 */
--color-accent:      oklch(75% 0.15 65)      /* amber #FFA12E */
--color-accent-ink:  oklch(20% 0.015 210)    /* teal on amber buttons */
--color-sale:        oklch(58% 0.14 25)      /* muted red */
--color-success:     oklch(60% 0.11 150)     /* muted green */

--radius-sm: 0.375rem   /* inputs, buttons */
--radius-md: 0.625rem   /* cards */
--radius-lg: 1rem       /* hero cards, modals */

--font-display: "Fraunces", Georgia, serif
--font-body:    "Poppins", system-ui, sans-serif
```

60/30/10 rule: 60% `bg` + `surface`, 30% `ink` + `divider`, 10% `accent`. WCAG AA verified per token pair in `src/styles/contrast-check.md`.

## 5. Folder Structure

```
src/
  app/
    (shop)/shop/page.tsx                    # catalog
    (shop)/shop/[category]/page.tsx         # category
    (shop)/product/[slug]/page.tsx          # PDP
    (shop)/cart/page.tsx
    (shop)/checkout/page.tsx                # multi-step client
    (shop)/checkout/success/[orderId]/page.tsx
    (shop)/search/page.tsx
    (shop)/wishlist/page.tsx
    (content)/about/page.tsx
    (content)/contact/page.tsx
    (content)/blog/page.tsx
    (content)/blog/[slug]/page.tsx
    (content)/faqs/page.tsx
    (support)/track-order/page.tsx
    (support)/{privacy,terms,shipping,returns}/page.tsx
    (auth)/login/page.tsx
    (auth)/signup/page.tsx
    (auth)/forgot-password/page.tsx
    (account)/account/{page,orders,addresses,settings}/page.tsx
    layout.tsx
    page.tsx                                # home
    not-found.tsx
    error.tsx
    sitemap.ts
    robots.ts
    manifest.ts
  components/
    ui/                                     # shadcn primitives, restyled
    layout/{Header,Footer,CartDrawer,AnnouncementBar,SearchModal,SkipToContent}.tsx
    product/{ProductCard,ProductGallery,VariantSelector,PriceDisplay,AddToCartButton,StockBadge,RatingSummary}.tsx
    shop/{FilterSidebar,SortMenu,ActiveFilters,ResultsGrid,EmptyState}.tsx
    home/{Hero,CategoryTiles,FeatureStrip,BestSellers,FlashSale,Arrivals,Collections,Testimonials,BlogTeaser,InstagramGrid,Newsletter}.tsx
    blog/{ArticleCard,ArticleHeader,ArticleBody,RelatedArticles}.tsx
    checkout/{Stepper,AddressStep,ShippingStep,PaymentStep,ReviewStep}.tsx
    account/{ProfileCard,OrderRow,AddressCard,Sidebar}.tsx
  data/
    products.ts reviews.ts orders.ts blog.ts testimonials.ts faqs.ts
    categories.ts materials.ts currencies.ts navigation.ts footerLinks.ts
  stores/{cart,wishlist,auth,ui,recentlyViewed,newsletter}.ts
  lib/
    currency.ts formatters.ts seo.ts schema.ts search.ts filters.ts
    motion.ts  # motion presets + reduced-motion guard
  messages/{en,fr}.json
  content/blog/*.mdx
  types/{product,order,blog,user,i18n}.ts
  styles/globals.css
  styles/design-tokens.md
public/
  og/{home,shop,product-default,blog-default}.png
  favicon.ico apple-touch-icon.png
_legacy/                                    # old Vite source, archived at merge
docs/plans/2026-04-17-radel-nextjs-rebuild.md
```

## 6. Data Model (Typed)

```ts
// src/types/product.ts
export type Material = 'gold-18k' | 'gold-14k' | 'rose-gold' | 'white-gold' | 'silver-925' | 'platinum';
export type Gemstone = 'diamond' | 'sapphire' | 'emerald' | 'ruby' | 'pearl' | 'none';
export type Category = 'earrings' | 'necklaces' | 'rings' | 'bracelets' | 'anklets' | 'pendants';

export interface ProductVariant {
  id: string;
  size?: string;           // ring size, chain length
  material: Material;
  gemstone: Gemstone;
  priceUSD: number;
  compareAtUSD?: number;   // sale
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  description: string;     // rich editorial copy, no Lorem
  materialsAndCare: string;
  shippingAndReturns: string;
  images: { src: string; alt: string; }[];  // 2–5 per product
  variants: ProductVariant[];
  rating: number;          // 3.8–5.0
  reviewCount: number;
  tags: ('new' | 'bestseller' | 'sale' | 'limited')[];
  relatedIds: string[];
  publishedAt: string;     // ISO
}
```

80+ products seeded across the 6 categories, priced realistically ($35–$1,800).

## 7. Sprint Breakdown

Six sprints. Each sprint ships an independently reviewable slice. Commits within a sprint follow Conventional Commits (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`). **No Claude attribution in any commit message.**

---

### Sprint 1 — Foundation (scaffold, tokens, design system, data layer)

**Deliverable:** Next.js app runs locally on port 3000, shadcn primitives render with RadEl tokens, `src/data/products.ts` exports 80 typed products, Zustand stores boot, i18n pipeline works.

**Phase 1.1 — Branch & scaffold**
1. `git checkout -b v2/nextjs`
2. `npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"` (into a clean working dir; move existing Vite source under `_legacy/` as part of the same commit)
3. Add deps: `zustand framer-motion react-icons react-hook-form zod next-intl next-mdx-remote @next/mdx gray-matter reading-time clsx class-variance-authority tailwind-merge`
4. Configure `tsconfig.json` with `"strict": true`, `"noUncheckedIndexedAccess": true`
5. Wire path alias `@/` and ESLint (next core-web-vitals + react-hooks)
6. `.nvmrc` pinning Node 20 LTS; `engines` in package.json
7. Vercel project: point `rad-el.vercel.app` at `main`, branch preview at `v2/nextjs`

**Phase 1.2 — Global styles & tokens**
1. Create `src/styles/globals.css` with `@import "tailwindcss";` + `@theme` block containing the tokens from §4
2. Install Fraunces + Poppins via `next/font/google` with `display: "swap"` and `variable: "--font-display" / "--font-body"`; apply variables on `<html>` in `app/layout.tsx`
3. Define motion tokens (`--ease-out-quint`, `--dur-150/250/400/600`) in same `@theme`
4. Write `src/styles/design-tokens.md` documenting every token + the 60/30/10 usage rule + contrast verification
5. Add `@custom-variant dark (&:where(.dark, .dark *))` (no dark toggle ships yet, but tokens ready)

**Phase 1.3 — shadcn install + restyle**
1. `npx shadcn@latest init`; select Slate neutrals as placeholder, we override immediately
2. Add components: `button input select textarea label badge card dialog sheet drawer accordion tabs tooltip toast dropdown-menu popover separator skeleton breadcrumb form`
3. For each primitive, replace every shadcn Tailwind class with tokenized classes (`bg-[--color-bg]`, `text-[--color-ink]`, `rounded-[--radius-sm]`). No `bg-primary` unless tied to RadEl accent.
4. Button variants: `primary` (teal bg, snow text), `accent` (amber bg, teal text), `ghost` (transparent, teal text, amber underline on hover), `outline` (teal border), `link`. Sizes `sm | md | lg | icon`. Single radius `rounded-[--radius-sm]`.
5. Verify contrast AA on every variant against bg + surface
6. Storybook-lite: build `src/app/(dev)/preview/page.tsx` (dev-only, excluded from sitemap) showing every primitive — used for visual review

**Phase 1.4 — Data layer**
1. Write `src/types/*.ts` for Product, Review, Order, BlogPost, User, Testimonial, FAQ, Category, Currency
2. Generate `src/data/products.ts` — 80 products, 2–5 images each. **Copy is owner-written, not Lorem.** Imagery URLs from a single curated source (decision in Sprint 6 Phase 16); placeholder URLs from `images.unsplash.com/photo-...` during build, swapped to final curated set at imagery pass.
3. Generate `src/data/reviews.ts` (30+), `src/data/orders.ts` (20 mock orders for account), `src/data/testimonials.ts` (6+ with believable multi-ethnic names — not all "Doe"), `src/data/faqs.ts` (15+ real answers), `src/data/blog.ts` (frontmatter + slug index; MDX files land in Sprint 4)
4. `src/data/currencies.ts` exports `{ USD: 1, EUR: 0.92, RWF: 1300 }` (fixed mock rates, dated 2026-04-17) + symbols + locale formatters
5. `src/data/navigation.ts` + `src/data/footerLinks.ts` centralize menu structure

**Phase 1.5 — Zustand stores + persist**
1. `src/stores/cart.ts` — items, add/remove/updateQty/clear, subtotal selector, lineCount selector; persist to `radel:cart`
2. `src/stores/wishlist.ts` — persist to `radel:wishlist`
3. `src/stores/ui.ts` — drawer open, announcement dismissed, search modal open; persist announcement dismissal only
4. `src/stores/auth.ts` — mock `isSignedIn` + mock user; persist; clearly commented `// NOT REAL AUTH — demo flag`
5. `src/stores/recentlyViewed.ts` — capped at 10; persist
6. `src/stores/newsletter.ts` — email + subscribedAt; persist
7. SSR-safe hydration: `useHasHydrated()` hook gates persisted selectors to prevent hydration mismatch
8. Use selective selectors everywhere (`useCart(s => s.lineCount)`) to avoid re-render storms

**Phase 1.6 — i18n scaffold**
1. Install `next-intl`; configure middleware with EN default, FR optional via `/fr` prefix (no subdomain)
2. Seed `src/messages/en.json` + `src/messages/fr.json` with top-level keys: `nav`, `home`, `shop`, `product`, `cart`, `checkout`, `account`, `blog`, `about`, `contact`, `faqs`, `footer`, `toast`, `forms`, `errors`, `legal`
3. All copy authored in EN first; FR translation deferred to Sprint 5 Phase 12 (single pass, single file)

**Sprint 1 acceptance:** `pnpm dev` shows primitive preview page with every component styled with RadEl tokens. `pnpm build` passes. `pnpm lint` passes. Products render in a console smoke test. Zustand hydration works without warnings.

---

### Sprint 2 — Shell + Home

**Deliverable:** Header, Footer, CartDrawer, AnnouncementBar, SearchModal all working end-to-end. Home page visually matches the existing site, but every Lorem is replaced, the promo-ended bug is fixed, and filter tabs actually filter.

**Phase 2.1 — Layout shell**
1. `app/layout.tsx` wires: `NextIntlClientProvider`, font variables, `<SkipToContent />`, announcement bar, header, main, footer, toaster, analytics placeholder (commented)
2. `AnnouncementBar`: dismissible, persists dismissal; copy "Complimentary shipping on orders over $250" (owner-editable in `data/announcements.ts`); small line icon from `hi2`, never emoji
3. `SkipToContent` anchor `href="#main"` visible on focus only
4. `Footer`: 4-column (Brand + tagline, Shop, Company, Legal), social icons (`fi` set) linking to real/clearly-fake URLs listed in `data/footerLinks.ts`; newsletter mini-form reusing `<NewsletterForm>`

**Phase 2.2 — Header**
1. Sticky; condenses on scroll (Framer `useScroll` threshold 40px → height 72 → 56, fade tagline)
2. Nav: Shop (dropdown with 6 categories + "View all"), Collections, About, Blog, Contact
3. Utility icons: search (opens `SearchModal`), wishlist (badge with count, links `/wishlist`), cart (badge with count, opens `CartDrawer`), account (links `/account` or `/login` based on auth flag), currency + language selectors
4. Mobile: hamburger opens full-screen menu (motion: `clip-path` reveal, 400ms ease-out-quint), locks body scroll
5. All interactive elements 44×44 min, focus-visible rings in amber

**Phase 2.3 — CartDrawer**
1. Slide-in from right (Radix Sheet restyled); motion 280ms ease-out
2. Header: "Your Cart (N)" + close; body: scrollable line items with thumb, title, variant, qty stepper, remove (fi TrashIcon), move-to-wishlist
3. Footer: subtotal, "View cart" (→ `/cart`), "Checkout" primary CTA
4. Empty state: illustration-free, just tight editorial copy + "Browse jewelry" link
5. Syncs with `/cart` via shared Zustand store (both consume `useCart`)
6. ESC closes, focus trap, `aria-modal="true"`, returns focus to trigger

**Phase 2.4 — SearchModal**
1. Cmd/Ctrl+K opens; input autofocuses; `react-hook-form` debounced 120ms
2. Results show first 6 matches (name/material/category match); keyboard nav with ArrowUp/Down; Enter navigates to PDP; ESC closes
3. "Search all results →" footer CTA routes to `/search?q=…`
4. Recent searches (last 5) stored in localStorage, shown when query empty

**Phase 2.5 — Home page migration**
1. Rebuild each existing home section as RSC where possible, converting to client only for interactivity:
   - `Hero`: three-tile editorial grid (earring / necklace / ring), Fraunces H1, teal text, amber micro-label, Framer fade-up on load with 80ms stagger; `priority` on hero images
   - `FeatureStrip`: 3 cards (Complimentary shipping, Secure payment, Expert care) — **icons from react-icons, never emoji**; remove "Cyber" placeholder section entirely
   - `CategoryTiles`: 6 categories with `hover:scale-[1.02]` + tone shift overlay (no blur, no gradient)
   - `BestSellers`: filter tabs (All, Earrings, Rings, Necklaces, Bracelets, Anklets, Pendants) **wired via URL `?tab=` so state survives refresh**; responsive grid 2/3/4 cols; each card uses new `<ProductCard>`
   - `FlashSale`: fix the "Promotion Ended!" bug — when a promo expires, `src/data/promos.ts` regenerates forward-dated end-times relative to build; component shows `<CountdownTimer />` that never falls through to expired copy
   - `Arrivals`: 2-column editorial — one side image, one side product triplet
   - `Collections`: 4-tile grid with one large promo tile (fixed price-duplication bug — show `compareAtUSD` as strikethrough, `priceUSD` as primary)
   - `Testimonials`: real-sounding quotes from 6 named customers (names authored by owner — placeholder authored quotes meanwhile, clearly marked `// TODO(owner)`)
   - `BlogTeaser`: 3 latest MDX articles
   - `InstagramGrid`: 8 square tiles from curated source
   - `Newsletter`: working mock with success toast + persisted email
2. Kill the hardcoded `@its_wilso` Instagram handle — replace with `@rad.el` (owner to confirm)

**Phase 2.6 — ProductCard primitive**
1. `<ProductCard>` single source of truth; props: `product`, `variant?` (defaults to first in-stock), `priority?`
2. Image in `next/image` with `sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"`; 4:5 aspect ratio consistent
3. Badges: `Sale` (muted red), `New` (accent amber), `Low stock` (teal outline)
4. Hover reveals: wishlist + quick-view buttons slide in (transform only, never animate layout props)
5. Price: primary in teal, strikethrough in meta color; formatted via `currency.ts` reacting to active currency

**Sprint 2 acceptance:** Click every nav link → no 404s or blanks (stubs OK for pages not yet built in this sprint, but they render a proper Coming-in-sprint-X placeholder route, not a generic 404). Home page fully loads, all motion respects reduced-motion, all icons are line icons, no emoji. Lighthouse Home ≥ 90 (final pass in Sprint 6 raises to 95+).

---

### Sprint 3 — Commerce Flow (Shop → PDP → Cart → Checkout)

**Phase 3.1 — Shop catalog (`/shop`)**
1. RSC fetches product list; client island handles filters/sort/pagination
2. Filters: category checkbox group, price range slider, material checkbox, gemstone checkbox, rating radio, in-stock toggle
3. Sort: newest, price asc, price desc, best rated, best seller
4. URL-synced via `useSearchParams` + `useRouter().replace()` — every filter writes to URL, back button restores state
5. Active filter chips row; "Clear all" button
6. Grid/list toggle; pagination OR infinite scroll (pick infinite scroll with Intersection Observer for editorial feel; page 1 SSR, subsequent pages client)
7. Empty state: authored copy + reset-filters button + 3 suggested products
8. Skeleton loaders: `<ProductCardSkeleton />` in 12-item grid during hydration

**Phase 3.2 — Category pages (`/shop/[category]`)**
1. Dynamic route; `generateStaticParams` enumerates 6 categories
2. Category intro block: Fraunces H1 + 2-paragraph editorial intro per category
3. Reuses `<ShopLayout>` with category pre-applied
4. `generateMetadata` per category for SEO

**Phase 3.3 — Product Detail Page (`/product/[slug]`)**
1. `generateStaticParams` from all 80 products
2. Left col: `<ProductGallery>` — main image + thumbnails, hover-zoom on desktop (transform scale within clipped container), pinch-zoom on mobile, keyboard arrow nav, lightbox via Dialog
3. Right col: breadcrumb, H1 Fraunces, rating summary, price (with strikethrough if sale), variant selectors (size + material + gemstone), qty stepper, Add to Cart (primary), Add to Wishlist (ghost), stock indicator ("In stock — ships in 2 business days" / "Low stock — 3 left" / "Made to order — 3 weeks")
4. Below fold: tabs (Description / Materials & Care / Shipping & Returns); accordion on mobile
5. Related products carousel (uses `product.relatedIds`); recently-viewed strip (from store)
6. JSON-LD `Product` + `BreadcrumbList` schema via `lib/schema.ts`
7. Add-to-cart: optimistic update + toast "Added to bag" with undo for 4 seconds

**Phase 3.4 — Cart page (`/cart`)**
1. Line items (table on desktop, card list on mobile)
2. Per-line: thumb, title, variant label, qty stepper (persists to store), subtotal, remove, move-to-wishlist
3. Order summary: subtotal, estimated shipping (free over $250; else $18 flat), estimated tax (7.5% mock), total
4. Promo field: accepts `RADEL25` → 25% off, any other code → "Code not recognized" with muted red meta text
5. "Continue to checkout" primary CTA
6. Empty state with CTA to `/shop`
7. `/cart` and `CartDrawer` both source from same store — verified in a smoke test

**Phase 3.5 — Checkout (`/checkout`)**
1. Multi-step client component; stepper at top (Address → Shipping → Payment → Review)
2. `react-hook-form` with zod schemas per step; partial data held in a `useCheckoutStore` (not persisted across sessions — only per-tab)
3. Address: name, email, phone, country (defaulting to Rwanda, offering 20 common destinations), address lines, city, postal
4. Shipping: 3 options (Standard free / Express $25 / Signature $45); ETA labels
5. Payment: Stripe-style card UI (number, expiry, CVC, name on card). **Never submits to any real endpoint.** A banner reads: "Demo checkout — no real payment is processed."
6. Review: summary of all entered info + line items + totals; edit-per-section links
7. Submit: generates `RAD-YYMMDD-XXXX` order number, clears cart, creates mock order in store, routes to `/checkout/success/[orderId]`
8. Success page: order number, ETA, summary, "Continue shopping" CTA, option to create an account (toggles auth flag)

**Sprint 3 acceptance:** Can add any product → drawer updates → cart page matches → checkout completes → success page renders → cart is empty on next visit.

---

### Sprint 4 — Identity & Editorial (Account, Auth, About, Contact, Blog, FAQ)

**Phase 4.1 — Auth pages**
1. `/login`: email + password + "Remember me" + "Forgot?" link; social buttons (Google + Apple) visible with small caption "Social sign-in coming soon" (no emoji, small line-icon badge); submit flips `auth.isSignedIn = true` and routes to `/account`
2. `/signup`: name + email + password (zod: min 8, 1 upper, 1 digit); submit creates mock user + routes to `/account`
3. `/forgot-password`: email input + success state "If an account exists, we sent instructions" (demo — no email is sent)
4. Each page has **editorial 2-column layout**: form left, large jewelry photograph right (reuses curated imagery set)

**Phase 4.2 — Account area (`/account`)**
1. Guarded: if `!auth.isSignedIn`, redirect to `/login?next=/account`
2. Sidebar: Profile, Orders, Addresses, Wishlist (redirects to `/wishlist`), Settings, Sign out
3. Profile: name, email, phone (editable, persisted to store, no backend)
4. Orders: list of 8–12 mock orders with status timeline; each links to `/account/orders/[id]` detail
5. Addresses: CRUD against `auth` store; default badge
6. Settings: currency, language, newsletter toggle, delete account (mock — clears stores, signs out)

**Phase 4.3 — Wishlist (`/wishlist`)**
1. Grid of saved products, move-to-cart (atomic transfer), remove
2. Empty state with 3 curated suggestions

**Phase 4.4 — About (`/about`)**
1. Long-form editorial with: Fraunces hero heading, 2-column intro, founder portrait + Wilson Nshizirungu bio, pull quote (Fraunces, large), materials & craft section with 4 tiles, video placeholder block (poster image + play button opening a `<dialog>` with HTML5 video — placeholder royalty-free b-roll if available; otherwise clearly-marked placeholder)
2. Real copy authored by owner. Plan includes a `{{ TODO(owner): founder story }}` marker that MUST be resolved before marking the page done.

**Phase 4.5 — Contact (`/contact`)**
1. Split layout: form (RHF + zod: name, email, subject select, message) left; contact info (phone, email `hello@rad-el.com`, Kigali address) right
2. Static map: OpenStreetMap tile via `staticmaps` public URL pattern (no API key required) OR `<iframe src="https://www.openstreetmap.org/export/embed.html?…">`
3. On submit: validate → success toast + in-page success panel ("We'll reply within 1 business day"); mock — no request sent

**Phase 4.6 — Blog**
1. `/blog`: featured post (most recent with `featured: true` frontmatter), grid of recent, category filter, search
2. `/blog/[slug]`: MDX-powered; `generateStaticParams` from MDX files
3. Authors 6 real articles (titles below). Full body, 600–1000 words each, brand-appropriate:
   - "How to care for fine gold: a 5-step ritual"
   - "The stone guide: sapphire, emerald, ruby, and what they mean"
   - "Earrings by face shape: a styling primer"
   - "Choosing a wedding band: the quiet decisions that matter"
   - "A brief history of the solitaire"
   - "Spring 2026: soft metals, cool stones"
4. Share row: copy link button (writes to clipboard + toast), email link; no third-party trackers
5. Related articles (same category or shared tag)
6. Reading time via `reading-time`

**Phase 4.7 — FAQ (`/faqs`)**
1. 15+ real Q&A across 6 categories (Orders, Shipping, Returns, Materials, Sizing, Gifts). Authored, not Lorem.
2. Accordion via shadcn restyled; anchor-linkable per question (`#q-orders-1`)
3. Schema.org `FAQPage` JSON-LD

**Sprint 4 acceptance:** Every editorial page renders with real copy (no Lorem), every form validates, blog articles render MDX correctly, FAQ accordion keyboard-navigable.

---

### Sprint 5 — Support, Search, Legal, Global Wiring

**Phase 5.1 — Search (`/search`)**
1. Same filter/sort UI as `/shop` plus prominent search box at top
2. Match against name, category, material, gemstone, description, tag
3. Empty-query state shows recent searches + popular categories

**Phase 5.2 — Track Order (`/track-order`)**
1. Form: order number + email; any valid format matches a mock
2. Result: timeline (Placed → Packed → Shipped → Out for Delivery → Delivered) with fake carrier + tracking number

**Phase 5.3 — Legal pages**
1. `/privacy`, `/terms`, `/shipping`, `/returns` — realistic but clearly marked template copy. Each has a top banner: "This template copy is illustrative and has not been reviewed by counsel." Hidden at production when owner swaps in real text.

**Phase 5.4 — 404 & error**
1. `not-found.tsx`: Fraunces heading "A missing piece", teal body copy, 3 recovery links (Home, Shop, Contact)
2. `error.tsx`: client boundary; resets + surfaces generic apology without leaking stack

**Phase 5.5 — Currency converter**
1. Currency selector in header dispatches to `ui.currency`; every price component reads active currency
2. Rates + symbols in `data/currencies.ts`; `formatPrice(amountUSD, currency, locale)` in `lib/currency.ts`
3. Persisted across sessions; defaults to USD

**Phase 5.6 — Full i18n translation pass**
1. Populate `messages/fr.json` for every key; verify no missing translations via `next-intl` static checker
2. Translate blog article titles + excerpts only (full body stays EN with an FR abstract — documented limitation)
3. Language selector in header writes to `ui.locale` + triggers `router.replace(locale)`

**Sprint 5 acceptance:** Swapping currency re-prices the entire site instantly. Swapping language translates every visible string. Every support page resolves with real content.

---

### Sprint 6 — Polish (A11y, SEO, Performance, Imagery, QA, Deploy)

**Phase 6.1 — A11y pass (`web-accessibility` skill)**
1. Keyboard nav every flow: tab order, Enter/Space on buttons, Escape on drawers/modals, arrow keys in menus
2. Focus-visible: 2px amber ring, 2px offset, rounded to match control
3. ARIA: `aria-modal` on Dialog/Drawer, `aria-expanded` on accordion triggers, `aria-live="polite"` on toast region and cart badge updates, `aria-invalid` on zod errors
4. Skip-to-content verified on every page
5. Color contrast audit with Axe + manual check — any failing pair gets a token adjustment (not a one-off override)
6. Alt text on every image: product name + material + "photographed on neutral stone" (no duplicated filenames)

**Phase 6.2 — SEO pass**
1. `generateMetadata` on every page (title template `%s — RadEl`, description, OG image, canonical)
2. OG images: 1 static per route family (home, shop, product default, blog default) in `public/og/`; PDP uses product's primary image dynamically
3. JSON-LD: `Organization` in `layout.tsx`, `Product` + `Breadcrumb` on PDP, `Article` on blog post, `FAQPage` on `/faqs`
4. `app/sitemap.ts` enumerates every route; `app/robots.ts` allows all, points at sitemap; `app/manifest.ts` for PWA basics (name, theme color teal)

**Phase 6.3 — Performance pass**
1. Lighthouse CI run per route; target ≥ 95 across Performance / Accessibility / Best Practices / SEO
2. `next/image`: every image has correct `sizes`, `priority` only on LCP
3. Audit client components — any RSC-possible component gets converted; `"use client"` directives confined to leaves
4. Font subsetting (`next/font` handles automatically); verify no FOIT
5. Bundle analyzer (`@next/bundle-analyzer`) — no route chunk > 180 KB gzipped
6. Disable third-party scripts by default; keep analytics behind an `env` flag (commented, not wired)

**Phase 6.4 — Imagery curation**
1. Pick ONE royalty-free source for the entire catalog. Recommendation: **Unsplash** (larger fine-jewelry library + consistent `images.unsplash.com/photo-…` URLs + `next.config` remote pattern support). Decision point here — owner to confirm.
2. Curate 80 × 3 = 240 product shots from a narrow aesthetic window: warm background, overhead/3-quarter angle, neutral lighting, no props, no models. Store the URL list in `data/products.ts` directly.
3. Replace every external CDN URL, hero image, blog image, auth page image, about page image.
4. Verify every URL resolves and `next/image` optimization succeeds; fallback `<div>` placeholder if not.
5. Record image credits in `public/licenses/imagery-credits.md` even though Unsplash doesn't require it.

**Phase 6.5 — Cross-breakpoint QA**
1. Breakpoints: 320, 375, 414, 768, 1024, 1280, 1440, 1536, 1920
2. Click-test every nav link, every CTA, every form, every drawer
3. Motion audit: enable `prefers-reduced-motion: reduce` in DevTools, verify all Framer animations respect it

**Phase 6.6 — Merge + deploy**
1. Archive legacy source: `git mv src _legacy/vite-src` → commit with note
2. Open PR `v2/nextjs → main` with a structured description (what ships, screenshots, Lighthouse scores)
3. Vercel: verify production deploy at `rad-el.vercel.app` renders new build
4. Smoke test production: one purchase flow end-to-end, one language switch, one currency switch
5. Tag `v2.0.0`

**Sprint 6 acceptance:** Lighthouse ≥ 95 on all 4 categories for Home, Shop, PDP, Blog, Contact, Account. Zero Axe violations. Zero emoji in source grep. Zero gradient classes in source grep. Zero `any` in source grep. Production URL serves the new build.

---

## 8. Risk Register

| Risk | Likelihood | Mitigation |
|---|---|---|
| Scope creep (17 routes, 80 products, full i18n, MDX blog) | High | Hard sprint cuts; nothing ships on main until Sprint 6 merge; weekly demo per sprint |
| Imagery URL rot from Unsplash hotlinks | Medium | Prefer stable `photo-<id>` URLs + `next.config` remotePatterns; option to mirror to `public/products/` if flakiness observed |
| shadcn primitive internals conflicting with RadEl restyle | Low | Preview page in Sprint 1 catches this early |
| Hydration mismatches from persisted Zustand | Medium | `useHasHydrated` gate used consistently from Sprint 1 Phase 5 |
| `next-intl` segment routing clashes with static params | Low | Decide EN-default-no-prefix + FR at `/fr` segment locked in Sprint 1 Phase 6 |
| Owner copy latency (About, Testimonials, blog body) | Medium | Placeholder marked `// TODO(owner)`; blocks are not shipped to main until resolved; any residual placeholder fails the Sprint 6 grep check |
| Claude attribution accidentally added to commit | Medium | Pre-commit hook in `.husky/pre-commit` rejects any `Co-Authored-By: Claude`, matching the owner's stated rule |

## 9. Assumptions

1. Vercel project ownership remains with the current account; `rad-el.vercel.app` is free to repoint.
2. No real backend, no real payments, no real email delivery. Everything is mock.
3. Owner will author copy for About founder story, testimonials, and final legal text before merge; blog articles may be drafted by me and edited by owner.
4. Imagery from Unsplash is acceptable; if owner prefers Pexels or a paid library, decision moves to Sprint 6 Phase 16 entry.
5. EN is authoritative; FR is a full translation pass, not ongoing editorial parity.
6. Node 20 LTS and pnpm 9+ are available on owner's machine and in Vercel build env.

## 10. Out of Scope (explicit)

- Real authentication (OAuth, passwords, sessions)
- Real payments, Stripe integration, PCI considerations
- Real email delivery for newsletter/contact/order confirmations
- CMS integration (MDX + typed data only; Sanity/Contentful are future work)
- Admin dashboard
- Reviews submission by end users (reviews are read-only, seeded from `data/reviews.ts`)
- Multi-currency with live FX rates (fixed rates only, dated in `currencies.ts`)
- PWA/offline beyond `manifest.ts`
- Automated test suite (structure components to be testable; don't author tests)

## 11. Commit Hygiene

- Conventional Commits: `feat(shop): wire best-sellers filter tabs to URL state`
- Atomic: one logical change per commit
- Never `--amend` once pushed
- **Never add `Co-Authored-By: Claude` or any Claude attribution line** (owner's standing rule)
- Each sprint closes with a summary commit on the branch before the PR merge

## 12. Owner-Confirmed Answers (resolved 2026-04-17)

1. **Instagram handle:** `nshizirungu.w` — used on home Instagram grid, footer social icon, Contact and About pages.
2. **Founder portrait:** Provided by owner. Target path `public/about/founder-wilson.jpg` — owner drops the file there before Sprint 4 ships.
3. **Imagery source:** Owner deferred to my choice — **Unsplash** selected. Single curated aesthetic (warm backgrounds, overhead / 3-quarter angles, neutral lighting).
4. **Testimonial names + quotes:** Owner skipped — I author six believable named placeholders during Sprint 2 (home Testimonials section), each tagged `// TODO(owner)` for later edit. This does NOT block the Sprint 6 Lorem grep check because they are authored, not Lorem.
5. **Support phone:** `+250 791 847 408` — real. Used verbatim on Contact and Footer.

## 13. Definition of Done (overall)

- Branch `v2/nextjs` merged to `main`
- `rad-el.vercel.app` serves the Next.js build
- Every route in §5 resolves without 404 or placeholder copy
- Zero emoji, zero gradient, zero `any`, zero Lorem Ipsum in source grep
- Lighthouse ≥ 95 across all 4 categories on the 6 anchor pages
- Axe: zero critical/serious violations
- Cart → Checkout → Success runs end-to-end with drawer and page in sync
- EN + FR both render every visible string
- Currency USD/EUR/RWF all re-price the entire site
- Owner-authored copy replaces every `TODO(owner)` marker
- PR body includes screenshots and Lighthouse scores

---

*End of plan. Ready to execute on approval.*
