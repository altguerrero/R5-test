import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./Layout";

const Home = lazy(() => import("./views/Home"));
const BookStore = lazy(() => import("./views/BookStore"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="bookstore" element={<BookStore />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
