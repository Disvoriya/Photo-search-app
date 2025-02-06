import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Поиск изооброжения (Английский)..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-[#F4F0EC] px-4 py-2 hover:bg-[#F4F0EC] rounded-full border border-transparent focus:outline-none text-[#D8A876] placeholder:text-[#D8A876]"
      />
    </form>
  );
}
