import { Search } from "@mui/icons-material";
import { useRouter } from "next/router";
import React from "react";

export default function SearchBar() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleSubmit() {
    inputRef.current?.value && router.push(`/search/${inputRef.current.value}`);
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Recherchez vos films..."
        onKeyDown={(e) => {
          if (e.code === "Enter") handleSubmit();
        }}
      />
      <button onClick={handleSubmit}>
        <Search />
      </button>
    </div>
  );
}
