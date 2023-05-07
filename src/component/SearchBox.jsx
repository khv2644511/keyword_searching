import React, { useState } from "react";
import searchApi from "../api/seachAPI";
import ResultList from "./ResultList";
import { debounce } from "../utils/debounce";

export default function SearchBox() {
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState([]);

  // fix: 검색창에 입력 텍스트 없을 때 호출 막아야함
  const handleChange = (e) => {
    setSearchText(e.target.value);
    if (searchText.length > 0) {
      debounce(() => handleSearch(e.target.value), 300)();
    }
  };

  const handleSearch = async (searchValue) => {
    try {
      const res = await searchApi.searchKeyword(searchValue);
      setResult(res.data);
    } catch (e) {
      console.error("error", e);
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
        />
        <button className="bg-blue-600 text-white p-3">검색</button>
      </div>
      {searchText.length > 0 ? <ResultList result={result} /> : null}
    </div>
  );
}
