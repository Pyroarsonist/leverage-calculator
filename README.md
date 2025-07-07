# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Code Formatting and Linting

This project uses ESLint and Prettier for code formatting and linting:

- **ESLint** enforces code quality rules
- **Prettier** ensures consistent code formatting
- **eslint-plugin-prettier** runs Prettier as an ESLint rule

### Available Commands

- `npm run lint` - Check for linting errors
- `npm run lint:fix` - Fix linting errors automatically
- `npm run format` - Format code using Prettier

### Prettier Configuration

The project includes a `.prettierrc.json` file with the following settings:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
```

## Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages. The deployment process uses the `gh-pages` package to publish the built files to a `gh-pages` branch in your repository.

### Prerequisites

1. Make sure you have a GitHub repository for this project
2. Ensure you have the necessary permissions to push to the repository

### Deployment Steps

1. Build the project for production:
   ```
   npm run build
   ```
   This creates an optimized production build in the `dist` folder.

2. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```
   This command will automatically build the project (using the predeploy script) and deploy it to the `gh-pages` branch of your repository.

After deployment, your site will be available at: `https://[your-github-username].github.io/leverage-calculator/`

### Configuration Details

- The base URL is configured in `vite.config.js` with `base: '/leverage-calculator/'`
- The homepage is set in `package.json` as `"homepage": "https://[your-github-username].github.io/leverage-calculator"`

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
