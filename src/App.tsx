import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import { queryClient } from "./services/queryClient";

import LiveScores from "./components/LiveScores/LiveScores";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LiveScores />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;
