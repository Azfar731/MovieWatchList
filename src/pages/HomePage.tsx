import "./HomePage"
import Header from "../layout/Header"
import SearchBar from "../components/SearchBar"

export default function HomePage(){
    return(
        <>
        <Header title="Find Your Film" link="/watchlist" linkText="My Watchlist" />
        <SearchBar />
        </>
    )
}