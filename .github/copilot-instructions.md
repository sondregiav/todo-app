# Copilot instructions

## Project shape

- This is a JavaScript React app served and built with Vite. `index.html` provides `#root`; `src/main.jsx` mounts `src/App.jsx` inside React `StrictMode`.
- `src/App.jsx` is the intended app composition point and currently contains draft `TodoForm`/`TodoList` composition. Todo UI is being split into `src/components/TodoForm.jsx`, `TodoList.jsx`, and `TodoItem.jsx`; check the current imports and component implementations before assuming the behavior is wired.
- `src/index.css` contains global styles and design tokens; `src/App.css` is for app-level styles. Vite's starter styles may still be present as the UI evolves.
- The README describes the intended progression: implement the frontend first, then persistence with `localStorage`, and only later introduce a REST API and backend. Treat future roadmap items as plans, not existing functionality, and keep architecture appropriately simple for the current stage.

## Commands

- `npm run dev` starts the Vite development server.
- `npm run build` creates the production build.
- `npm run preview` serves the production build locally.
- `npm run lint` runs ESLint over the repository.
- No test runner or test script is configured yet, so there is currently no command for running the full suite or a single test.

## Code conventions

- Use ES modules and JSX (`.js`/`.jsx`); the package is configured with `"type": "module"`.
- ESLint applies the recommended JavaScript rules, React Hooks rules, and React Refresh/Vite rules to JavaScript and JSX files. Keep hook usage compliant with `eslint-plugin-react-hooks`.
- Follow the README's progressive approach: add abstractions and dependencies only when they solve a current application need rather than implementing the planned backend or tooling ahead of the frontend.
