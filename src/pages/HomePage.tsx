import { Outlet } from "react-router-dom";
import Header from "../layout/Header";
import SearchBar from "../components/SearchBar";
import Footer from "../layout/Footer";
export default function HomePage() {
  return (
    <>
      <Header
        title="Find Your Film"
        link="/watch-list"
        linkText="My Watchlist"
      />
      <SearchBar />
      <Outlet />
      <Footer />
    </>
  );
}
