import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AddWord from "./pages/AddWordPage";
import WordList from "./pages/WordList";
import { WordProvider } from "./components/WordContext";

export default function App() {
  return (
    <BrowserRouter>
    <WordProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Addword" element={<AddWord />} />
          <Route path="WordList" element={<WordList/>}/>
        </Route>
      </Routes>
      </WordProvider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);