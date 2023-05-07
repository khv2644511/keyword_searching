import React, { useState } from "react";
import searchApi from "../api/seachAPI";
import ResultList from "./ResultList";

export default function SearchBox() {
  const [searchText, setSearchText] = useState("");
  const [result, setResult] = useState([]);
  const [timer, setTimer] = useState(0); // 디바운싱 타이머

  // fix: 검색창에 입력 텍스트 없을 때 호출 막아야함
  // fix: 디바운스 함수 분리 필요
  const handleChange = (e) => {
    setSearchText(e.target.value);

    if (searchText.length > 0) {
      if (timer) {
        console.log("clear timer");
        clearTimeout(timer);
      }
      const newTimer = setTimeout(async () => {
        try {
          let res = await searchApi.searchKeyword(e.target.value);
          setResult(res.data);
        } catch (e) {
          console.error("error", e);
        }
      }, 300);
      setTimer(newTimer);
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
