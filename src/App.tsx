import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import Layout from "./Layout";
import { Loader } from "@/components/shared/loader";
import { Toaster } from "./components/ui/toaster";

const Home = lazy(() => import("./views/Home"));
const BookStore = lazy(() => import("./views/BookStore"));
const Detail = lazy(() => import("./views/Detail"));
const Library = lazy(() => import("./views/Library"));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense
          fallback={
            <div className="flex h-screen w-full items-center justify-center">
              <Loader />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="bookstore" element={<BookStore />} />
              <Route path="/bookstore/:id/:title" element={<Detail />} />
              <Route path="/library" element={<Library />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
