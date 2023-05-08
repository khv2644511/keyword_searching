import React, { useEffect, useRef, useState } from "react";
import ResultItem from "./ResultItem";

export default function ResultList({
  result,
  selectedIndex,
  setSelectedIndex,
  firstListRef,
}) {
  // const firstButtonRef = useRef(null);
  const listRef = useRef(null);

  const ArrowDown = "ArrowDown";
  const ArrowUp = "ArrowUp";

  const handleKeyArrow = (e) => {
    if (e.key === ArrowDown) {
      const lastIndex = result.length - 1;
      if (selectedIndex === lastIndex) {
        return setSelectedIndex(0);
      } else {
        setSelectedIndex((prev) => prev + 1);
      }
    }
    if (e.key === ArrowUp) {
      const lastIndex = result.length - 1;
      if (selectedIndex === 0) {
        return setSelectedIndex(lastIndex);
      } else {
        setSelectedIndex((prev) => prev - 1);
      }
    }
  };

  return (
    <div className="bg-white mt-2 rounded-md p-4">
      <h3 className="text-start text-gray-500">추천검색어</h3>
      <ul className="">
        {result.length > 0 ? (
          result.map((data, idx) => (
            <ResultItem
              key={data.id}
              data={data}
              idx={idx}
              selectedIndex={selectedIndex}
              onKeyDown={handleKeyArrow}
              listRef={listRef}
            />
          ))
        ) : (
          <p>검색어 없음</p>
        )}
      </ul>
    </div>
  );
}
