import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lenis from "lenis";
import Valuation from "./pages/Valuation.tsx";
import NotFound from "./pages/NotFound.tsx";

function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
  return <>{children}</>;
}

const App = () => (
  <SmoothScroll>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Valuation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </SmoothScroll>
);

export default App;
