## 🧩 Design Decisions

- 🧠 **Middleware Server**: We implemented a Node.js Express backend as a middleware layer between the frontend and SWAPI. This helps us:
  - Avoid CORS issues
  - Handle search pagination manually (since SWAPI doesn’t paginate search results)
  - Cleanly structure API calls and future-proof the app

- 🚀 **Express.js**: Chosen for its simplicity and speed. It makes routing and query param handling straightforward.

- 💅 **Tailwind CSS**: Gives us utility-first, responsive design control for rapid, clean UI prototyping and pixel-perfect styling.

- ⚙️ **Vite + React**: We used Vite for blazing-fast dev server and build speed, paired with React to build a modern, component-based UI.

- 🔎 **Manual Search Pagination**: Since SWAPI doesn’t paginate its search results, we manually slice the data client-side after fetching—all managed via the middleware.