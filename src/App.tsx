import "@/styles/app";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import Article from "@/pages/article";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function App() {
  return (
    <main className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article" element={<Article />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
}
