# Last week trending repositories

This project is a Next.js application designed to display popular GitHub repositories from the past week. Users can star and filter repositories based on their preferred programming languages.

## Requirements

- Node.js version 18.17.0 or higher
- npm (comes with Node.js) or yarn (optional)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/zelmasbahi/trending-github-repos.git
cd trending-github-repos
```

### 2. Install dependencies

First, clone the repository to your local machine:

```bash
# Using npm
npm install

# Using yarn
yarn
```

### 3. Run development server

Once the dependencies are installed, you can start the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

Open your browser and navigate to http://localhost:3000 to see the application running.

### 4. Run tests

To run the tests for the application (There are 17 tests, please check **tests** directory), you can use:

```bash
# Using npm
npm run test

# Using yarn
yarn test
```

### 5. Build for Production

To create an optimized production build of the application (this will run tests as well), run:

```bash
# Using npm
npm run build

# Using yarn
yarn build
```

### 2. Start the Production Server

After building the application, you can start the production server:

```bash
# Using npm
npm run start

# Using yarn
yarn start
```

### Project structure

- `components`/: Contains the React components used in the application.
- `models`/: TypeScript interfaces and types.
- `pages`/: Next.js pages.
- `utils`/: Utility functions.
- `__tests__`/: Contains the test files.
