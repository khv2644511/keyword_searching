import React from "react";

export default function ResultList({ data }) {
  return <li className="text-start p-2">{data.name}</li>;
}
