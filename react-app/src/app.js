import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AddWord from "./pages/AddWordPage";
import WordsListPage from "./pages/WordsListPage";

export default function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="Addword" element={<AddWord />} />
        <Route path="WordList" element={<WordsListPage/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  );
} 