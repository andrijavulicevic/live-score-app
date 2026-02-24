# Live Scores Demo App

App build with React, Vite, Tailwind & Tanstack query and virtual. 

## Instructions to start project
- copy `.env.example` file to `.env` file and edit `VITE_API_USERNAME` to be valid username for API
- run `npm install`
- run `npm run dev` and open `http://localhost:5173/` in browser

## Used libraries
- Tailwind CSS - chosen for fast styling without need to write CSS files
- `@tanstack/react-query` - chosen for built-in feature like caching, automatic refetching, error and loading state handling and automatic reties of failed request
- `axios` - added just as fetch mechanism for `@tanstack/react-query`
- `@tanstack/react-virtual` - chosen because it's lightweight solution that works well with list of dynamic heights
- `dayjs` - chosen because it's lightweight date library with easy-to-use API (`moment` like)