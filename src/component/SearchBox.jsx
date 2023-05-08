import React, { useState } from "react";
import searchApi from "../api/seachAPI";
import ResultList from "./ResultList";
import { debounce } from "../utils/debounce";
import { maxResult } from "../constant/maxResult";

// fix: input 에서 아래 방향키 눌렀을 때 추천 검색어로 포커스 이동되지 않음
export default function SearchBox() {
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e) => {
    setSearchText(e.target.value);
    debounce(() => handleSearch(e.target.value), 400)();
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

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(0);
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
          onKeyDown={handleKeyDown}
        />
        <button className="bg-blue-600 text-white p-3">검색</button>
      </div>
      {searchText.length > 0 ? (
        <ResultList
          result={result}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      ) : null}
    </div>
  );
}
