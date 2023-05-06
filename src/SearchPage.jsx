import React from "react";
import SearchBox from "./component/SearchBox";

export default function SearchPage() {
  return (
    <div className="bg-blue-300 h-screen">
      <h1 className="font-bold pt-36 text-3xl">
        국내 모든 임상시험 검색하고 온라인으로 참여하기
      </h1>
      <SearchBox />
    </div>
  );
}
