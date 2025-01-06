import "./SearchBar.css";
import { Form } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate, useNavigation } from "react-router-dom";
export default function SearchBar() {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isReloading =
    navigation.state === "loading" &&
    navigation.formAction ===
      navigation.location.pathname + navigation.location.search;

  // Are we redirecting after an action?
  const isRedirecting =
    navigation.state === "loading" &&
    navigation.formAction !==
      navigation.location.pathname + navigation.location.search;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const movie = formData.get("movie");
    if (movie) {
      navigate(`/search/${movie}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="search-box">
      <div className="input-container">
        <IoSearchSharp className="search-icon" />
        <input
          type="text"
          name="movie"
          aria-label="Movie"
          placeholder="Search for a movie"
          className="form-input"
        />
      </div>
      <button className="form-btn" disabled={isReloading || isRedirecting}>Search</button>
    </Form>
  );
}
