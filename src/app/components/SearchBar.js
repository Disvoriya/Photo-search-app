import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search images..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-[#F4F0EC] px-4 py-2 hover:bg-[#F4F0EC] rounded-full border border-transparent focus:outline-none text-[#D8A876] placeholder:text-[#D8A876]"
      />
    </form>
  );
}