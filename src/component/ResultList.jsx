import React from "react";

export default function ResultList({ data }) {
  return <li className="border-2 border-gray-400">{data.name}</li>;
}
