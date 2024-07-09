import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === "") {
      alert("Please enter a search query.");
      return;
    }
    onSubmit(searchQuery);
  };

  return (
    <header className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <label className={css.label}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={handleInputChange}
            className={css.input}
          />
          <button type="submit" className={css.button}>
            <FaSearch />
          </button>
        </label>
      </form>
    </header>
  );
}
