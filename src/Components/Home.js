import React from "react";
import Slide from "./Slide";

const Home = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <Slide />
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Hello home</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
