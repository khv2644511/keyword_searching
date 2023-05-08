import React, { useState } from "react";
import searchApi from "../api/seachAPI";
import ResultList from "./ResultList";
import { debounce } from "../utils/debounce";
import { maxResult } from "../constant/maxResult";

export default function SearchBox() {
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState([]);

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

  return (
    <div className="flex flex-col w-72 m-auto mt-10">
      <div className="flex rounded-md overflow-hidden">
        <input
          className="p-3 flex-grow"
          type="text"
          value={searchText}
          onChange={handleChange}
          autoFocus
        />
        <button className="bg-blue-600 text-white p-3">검색</button>
      </div>
      {searchText.length > 0 ? (
        <ResultList result={result} setResult={setResult} />
      ) : null}
    </div>
  );
}
