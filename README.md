# Field & Form

A responsive product catalog and inventory storefront built with React, TypeScript, and Vite.

## Getting started

```sh
npm install
npm run dev
```

Production checks:

```sh
npm run lint
npm run build
```

## Project structure

- `src/components/` contains reusable layout, hero, catalog, inventory, cart, form, feedback, and UI components.
- `src/context/` owns the shared products and cart state so inventory and cart operations remain coordinated.
- `src/hooks/` contains focused catalog, cart, inventory, storage, and notification hooks.
- `src/services/` handles product loading, stock validation, and safe browser storage.
- `src/utils/`, `src/types/`, and `src/data/` hold pure calculations, shared types, and the sample catalog.
- `src/pages/CatalogPage.tsx` composes the storefront without requiring a routing library.
- `src/styles/` contains global styles and design tokens.

Products and the cart are persisted in browser LocalStorage. Cart quantities are checked against available inventory, stock adjustments cannot reduce stock below items in carts, and successful checkout updates inventory.
