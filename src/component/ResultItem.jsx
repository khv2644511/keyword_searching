import React from "react";

export default function ResultItem({
  data,
  idx,
  selectedIndex,
  onKeyDown,
  listRef,
}) {
  return (
    <li className="p-2 flex">
      <button
        className={`${
          idx === selectedIndex ? "bg-red-300" : ""
        } flex-grow text-start focus:outline`}
        type="button"
        onKeyDown={onKeyDown}
        data-index={idx}
        ref={listRef}
      >
        {data.name}
      </button>
    </li>
  );
}
