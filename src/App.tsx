import "@/styles/app";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import Article from "@/pages/article";

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article" element={<Article />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
