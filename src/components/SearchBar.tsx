import "./SearchBar.css";
import { Form } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
export default function SearchBar({handleSubmit}) {
  
  
  
  return (
    <Form className="search-box" onSubmit={handleSubmit}>
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
      <button className="form-btn">Search</button>
    </Form>
  );
}
