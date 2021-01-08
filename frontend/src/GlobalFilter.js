import React from "react";

export const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div class="search-slt">
      Search:{" "}
      <input value={filter || ""} onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};
