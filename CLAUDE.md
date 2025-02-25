# CLAUDE.md - Development Guidelines

## Commands
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code linting

## Code Style
- TypeScript with strict typing enabled
- Component files: PascalCase (e.g., `Navbar.tsx`)
- Interface/type definitions: PascalCase (e.g., `User`, `FormState`)
- Variables/functions: camelCase
- Error handling: Use try/catch with specific error types
- API services follow singleton pattern with explicit typing
- Form validation: Validate client-side before submission

## Architecture
- Next.js App Router with React 19
- Tailwind CSS with DaisyUI for styling
- FontAwesome for icons
- Axios for API requests
- Form state management with React useState hooks
- API endpoints structured in services directory
- Type definitions in models directory