import React from "react";

export default function ResultItem({ data, idx, selectedIndex }) {
  return (
    <li className="p-2 flex">
      <button
        className={`${
          idx === selectedIndex ? "bg-red-300" : ""
        } flex-grow text-start focus:outline`}
        type="button"
        data-index={idx}
      >
        {data.name}
      </button>
    </li>
  );
}
