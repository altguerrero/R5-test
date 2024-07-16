import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="relative bg-rose-50">
      <div className="fixed">Navbar</div>
      <div className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Layout;
