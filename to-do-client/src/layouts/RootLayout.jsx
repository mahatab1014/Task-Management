import { Outlet } from "react-router-dom";
import PrimaryHeader from "../components/shared/PrimaryHeader/PrimaryHeader";

const RootLayout = () => {
  return (
    <>
      <header className="sticky md:top-3 z-50">
        <PrimaryHeader />
      </header>

      <main>
        <Outlet />
      </main>

      <footer></footer>
    </>
  );
};

export default RootLayout;
