import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "./services/queryClient";

import LiveScores from "./components/LiveScores/LiveScores";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LiveScores />
    </QueryClientProvider>
  );
}

export default App;
