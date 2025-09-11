# Pokedez Frontend

A modern, responsive Pokémon browser built with React and Vite. Explore Pokémon stats, types, moves, and sprites with a clean UI and fast search.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Browse Pokémon**: Search and filter Pokémon by name.
- **Detailed Cards**: View stats, types, moves, and multiple sprites.
- **Type Colors**: Pokémon types are color-coded ([`pokemonTypeColors`](src/utils/index.js)).
- **Move Details**: Click moves to view descriptions in a modal.
- **Responsive Design**: Works on desktop and mobile ([App.css](src/App.css), [fanta.css](src/fanta.css)).
- **Caching**: Pokémon move details are cached for performance ([skillCachePokemon](src/cache/allCaches.js)).
- **Sidebar Navigation**: Quick access to Pokémon list.

## Demo

> _Add a link or screenshot here if available._

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Installation

```sh
git clone https://github.com/your-username/PokeMon-Project-3.git
cd PokeMon-Project-3
pnpm install
# or
npm install
```

### Development

```sh
pnpm dev
# or
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```sh
pnpm build
# or
npm run build
```

## Project Structure

```
src/
├── assets/            # Images and other assets
├── components/        # Reusable components
├── pages/             # Page components
├── styles/            # Global styles
├── utils/             # Utility functions
├── App.jsx            # Main app component
├── index.js           # Entry point
└── ...                 # Other files and folders
```

## Scripts

- `dev`: Starts the development server.
- `build`: Builds the app for production.
- `serve`: Serves the production build.

## Tech Stack

- **React**: JavaScript library for building user interfaces.
- **Vite**: Next-generation frontend tool for faster builds and hot module replacement.
- **React Router**: Declarative routing for React.js.
- **Axios**: Promise-based HTTP client for the browser and Node.js.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Adding soon a feature to download pokemon data and images directly t local machine

Referenced files and symbols:
- [pokemonTypeColors](http://_vscodecontentref_/9)
- [skillCachePokemon](http://_vscodecontentref_/10)
- [App.jsx](http://_vscodecontentref_/11)
- [App.css](http://_vscodecontentref_/12)
- [fanta.css](http://_vscodecontentref_/13)
- [vite.config.js](http://_vscodecontentref_/14)
- [index.html](http://_vscodecontentref_/15)
- [PokeCard.jsx](http://_vscodecontentref_/16)
- [TypeCard.jsx](http://_vscodecontentref_/17)
- [Modal.jsx](http://_vscodecontentref_/18)
- [SideNav.jsx](http://_vscodecontentref_/19)
- [Header.jsx](http://_vscodecontentref_/20)
- [fetchPokeMonNameArr.js](http://_vscodecontentref_/21)
- [fetchPokeDataDetails.js](http://_vscodecontentref_/22)
- [index.js](http://_vscodecontentref_/23)
- [allCaches.js](http://_vscodecontentref_/24)

You can further personalize the README with a demo link, screenshots, or your own content.
