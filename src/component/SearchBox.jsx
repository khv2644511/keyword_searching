import React, { useState } from "react";
import searchApi from "../api/seachAPI";
import ResultList from "./ResultList";

export default function SearchBox() {
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState([]);

  const handleChange = async (e) => {
    setSearchText(e.target.value);
    if (searchText.length > 0) {
      const res = await searchApi.searchKeyword(e.target.value);
      setResult(res.data);
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
