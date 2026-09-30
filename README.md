# Todo App

A Todo application built with React as the first project in a progressive MERN/full-stack learning path.

The project starts as a frontend application using React and will progressively introduce more advanced functionality as the application evolves.

## Project Status

**In development**

The repository is currently at the initial React + Vite setup stage.

The first milestone is to build the Todo functionality entirely on the frontend before introducing a backend.

## Goals

This project is designed to practice the fundamentals required to build real-world React applications.

The initial version focuses on:

- React components
- Props
- State
- Event handling
- Controlled forms
- Lists and keys
- Conditional rendering
- `useEffect`
- Browser `localStorage`
- Component composition
- Basic accessibility
- Responsive UI
- Debugging
- Testing
- Git and GitHub
- Deployment

## Planned Features

The initial Todo application will support:

- Add a task
- Display tasks
- Mark tasks as complete
- Delete tasks
- Persist tasks using `localStorage`
- Validate user input
- Responsive interface
- Accessible interactions

### Future Development

The application will eventually evolve from a frontend-only application into a full-stack application:

```text
React
  ↓
localStorage
  ↓
REST API
  ↓
Node.js + Express
  ↓
MongoDB
  ↓
Authentication
  ↓
Deployment
```

The backend will not be introduced until the frontend implementation is understood and working properly.

## Tech Stack

### Current

- React
- Vite
- JavaScript
- CSS
- ESLint

### Planned

- Node.js
- Express.js
- MongoDB
- REST API
- Authentication
- Tailwind CSS
- Testing tools
- Deployment platform

Dependencies will be introduced only when they solve a real problem in the application.

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/sondregiav/todo-app.git
```

Navigate into the project:

```bash
cd todo-app
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local development URL in the terminal.

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Production Build

```bash
npm run build
```

Creates a production build of the application.

### Preview

```bash
npm run preview
```

Previews the production build locally.

### Lint

```bash
npm run lint
```

Runs ESLint against the project.

## Project Structure

The project currently follows a simple React + Vite structure:

```text
todo-app/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

The structure will evolve as the application becomes more complex.

Architecture will be introduced progressively rather than adding unnecessary abstractions at the beginning.

## Development Approach

The project follows this workflow:

```text
Plan
  ↓
Build
  ↓
Test
  ↓
Debug
  ↓
Refactor
  ↓
Commit
  ↓
Document
  ↓
Deploy
```

Git is used throughout development rather than only at the end of the project.

## Learning Objectives

By completing the first version of the application, the goal is to be able to:

- Build the core Todo functionality independently
- Explain the difference between React props and state
- Explain why `localStorage` is being used
- Understand the limitations of `localStorage`
- Explain the purpose of the main React components
- Understand the important hooks used by the application
- Debug React problems using browser developer tools
- Test important application behavior
- Make meaningful Git commits
- Document the project
- Deploy the frontend
- Rebuild the core functionality without copying a finished solution