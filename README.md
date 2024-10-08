# Fruitazon 🍓🍓🍓

Fruitazon is a marketplace to purchase fruits. There is no affiliation to the other -zon company. In this challenge we will be building out the UI in four parts.
<br>

### Running the code

This is a React and Cloudflare Pages project, using Vite, Wrangler, and Cloudflare Pages Functions.

```
npm i && npm run dev
```

UI: http://localhost:3001  
API: http://localhost:3001/api/fruits

## Challenge Prompt

1. Build out the product listings
2. Implement searching of products
3. Implement sorting of products
4. Implement sorting and filtering by categories

### Design

Find designs in the `mockups/` directory

### API

There is a backend that lives in the `functions/` directory that exposes an `/api/fruits` REST endpoint.

We've already implemented searching using a query parameter, the rest is still to be implemented.

```
fetch('/api/fruits?search=apple')
```
