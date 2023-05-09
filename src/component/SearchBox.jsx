import React, { useState } from "react";
import searchApi from "../api/seachAPI";
import ResultList from "./ResultList";
import { debounce } from "../utils/debounce";
import { maxResult } from "../constant/maxResult";

export default function SearchBox() {
  const INITIAL_FOCUS_INDEX = 0;
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(INITIAL_FOCUS_INDEX);

  const handleChange = (e) => {
    setSearchText(e.target.value);
    debounce(() => {
      handleSearch(e.target.value);
    }, 400)();
  };

  const handleSearch = async (searchValue) => {
    try {
      if (searchValue.length !== 0) {
        const res = await searchApi.searchKeyword(searchValue);
        setResult(res.data.splice(0, maxResult));
      }
    } catch (e) {
      console.error("error", e);
    }
  };

  const handleKeyArrow = (e) => {
    const lastIndex = result.length - 1;

    if (e.key === "ArrowDown") {
      if (e.nativeEvent.isComposing) return;
      selectedIndex === lastIndex
        ? setSelectedIndex(0)
        : setSelectedIndex((prev) => prev + 1);
    }
    if (e.key === "ArrowUp") {
      if (e.nativeEvent.isComposing) return;
      selectedIndex === 0
        ? setSelectedIndex(lastIndex)
        : setSelectedIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col w-72 m-auto mt-10">
      <div className="flex rounded-md overflow-hidden">
        <input
          className="p-3 flex-grow"
          type="text"
          value={searchText}
          onChange={handleChange}
          autoFocus
          onKeyDown={handleKeyArrow}
        />
        <button className="bg-blue-600 text-white p-3">검색</button>
      </div>
      {searchText.length > 0 ? (
        <ResultList result={result} selectedIndex={selectedIndex} />
      ) : null}
    </div>
  );
}
