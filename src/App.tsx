import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import Layout from "./Layout";

const Home = lazy(() => import("./views/Home"));
const BookStore = lazy(() => import("./views/BookStore"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
