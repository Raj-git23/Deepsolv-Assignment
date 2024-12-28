# Pokemon Explorer

## Overview
Pokemon Explorer is a React-based web application that allows users to explore a collection of Pokémon. The application includes filtering by type, pagination for easier browsing, and a loading indicator for better user experience.

## Features
- **Filter by Type**: Users can filter the Pokémon list by specific types (e.g., Fire, Water, Grass).
- **Pagination**: Browse Pokémon with paginated results, improving navigation.
- **Loader**: Displays a GIF loader while data is being fetched from the API.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Technologies Used
- **Frontend**: React, Tailwind CSS
- **API**: [PokéAPI](https://pokeapi.co/)

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pokemon-explorer.git
   cd pokemon-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Folder Structure
```
.
├── public
│   ├── loader.gif          # GIF used for loading state
│   ├── images              # Contains other static assets
│   └── index.html
├── src
│   ├── components
│   │   ├── Filter.js       # Filter by type component
│   │   ├── Loader.js       # Loader component
│   │   ├── Pagination.js   # Pagination component
│   │   └── PokemonList.js  # Display list of Pokemon
│   ├── App.js              # Main application entry point
│   ├── index.js            # React DOM rendering
│   └── styles.css          # Tailwind CSS styles
├── package.json
└── README.md
```

## Key Components
### 1. **Filter Component**
- Allows users to filter Pokémon by specific types.
- Passes the selected type back to the parent component.

### 2. **PokemonList Component**
- Displays a grid of Pokémon cards.
- Renders a subset of the list based on pagination.

### 3. **Pagination Component**
- Allows users to navigate between pages.
- Handles `onNextPage` and `onPrevPage` events.

### 4. **Loader Component**
- Displays a GIF while data is being fetched.
- Enhances user experience during API calls.

## API Integration
- Fetches Pokémon data from [PokéAPI](https://pokeapi.co/).
- Each Pokémon includes:
  - Name
  - Image
  - Types

## Deployment
1. Build the project:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy the `build` folder to your preferred hosting service (e.g., Netlify, Vercel, GitHub Pages).

## Contributing
Feel free to open issues and submit pull requests to improve the project. Contributions are always welcome!

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- Thanks to [PokéAPI](https://pokeapi.co/) for providing the API.
- Inspired by the world of Pokémon.

---

