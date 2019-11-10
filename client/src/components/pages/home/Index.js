import React from "react";
import LatestNew from "./LatestNew";
import FeaturedNew from "./FeaturedNew";
import FeaturedChannel from "./FeaturedChannel";

export default function Home() {
  return (
    <div className="container">
      <div className="row">
        <LatestNew />
        <FeaturedNew />
        <FeaturedChannel />
      </div>  
    </div>
  );
}