# Todo App

A simple todo app built with **HTML, CSS, and vanilla JavaScript**.

This project is part of my journey learning web development fundamentals. I’m building it step by step to understand how the browser, DOM, events, application state, and local storage work together.

## Features

- Add new todos
- Ignore blank or whitespace-only todo text
- Mark todos as completed
- Edit existing todos using Enter or Save
- Cancel editing without saving changes
- Delete todos
- Filter todos by All / Active / Completed
- Persist todos using `localStorage`
- Start with two example todos when no usable saved todo list is available
- Responsive layout for smaller screens
- Completed todos are displayed with a strikethrough

## Live Demo

Try the app: [Todo App](https://sondregiav.github.io/todo-app/)

## How It Works

The app keeps the todos in a JavaScript array:

```js
{
  id: "unique-id",
  text: "Learn JavaScript",
  completed: false
}
```

When a todo changes, the app updates the state and re-renders the todo list.

The todos are also saved to `localStorage`, so they remain available after refreshing the page.

The basic flow is:

```
User action
    ↓
Update state
    ↓
Render UI
    ↓
Save to localStorage
```

## Technologies

- HTML5
- CSS3
- JavaScript
- Browser DOM APIs
- `localStorage`
No frameworks or libraries are used.

## Project Structure

```
todo-app/
├── index.html    # Page structure
├── style.css     # Styling and responsive layout
├── script.js     # Application logic
└── README.md     # Project documentation
```

## Getting Started

Clone the repository:

```
git clone https://github.com/sondregiav/todo-app.git
```

Open the project directory:

```
cd todo-app
```

Then open `index.html` in your browser.

No build tools, dependencies, or installation steps are required.

## What I'm Learning

This project is helping me practice:

- Semantic HTML
- CSS layout and responsive design
- DOM manipulation
- Event handling
- JavaScript arrays and objects
- Managing application state
- Rendering UI from state
- Browser `localStorage`
- Basic accessibility
- Git and GitHub
- Refactoring code as the project grows

## Future Improvements

Some things I plan to explore as I continue developing the project:

- Show the number of remaining todos
- Improve accessible labels and keyboard accessibility
- Improve the empty-state UI
- Add a "Clear completed" action
- Improve the overall UX

## Why I Built This

The goal of this project isn't to build the most advanced todo app. It's to understand the fundamentals well enough that I can build more complex applications later.

I’m intentionally building this with vanilla JavaScript before moving on to frameworks, so I can understand what frameworks are actually solving for me.

## License

This project is open source and available under the `MIT License`.