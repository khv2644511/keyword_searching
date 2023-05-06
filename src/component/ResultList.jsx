import React from "react";
import ResultItem from "./ResultItem";

export default function ResultList({ result }) {
  return (
    <ul className="bg-white mt-2 rounded-md p-4">
      <h3 className="text-start text-gray-500">추천검색어</h3>
      {result.length > 0 ? (
        result.map((data) => <ResultItem key={data.id} data={data} />)
      ) : (
        <p>검색어 없음</p>
      )}
    </ul>
  );
}
