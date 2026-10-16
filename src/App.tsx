import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// VITE_STANDALONE=1 builds a router-free copy for hosts that serve the page under another path.
const App = () =>
  import.meta.env.VITE_STANDALONE === "1" ? (
    <Index />
  ) : (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );

export default App;
