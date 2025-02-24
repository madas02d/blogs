import React from "react";
import Hero from "../assets/hero.jpg";
const HomePage = () => {
  return (
    <div>
      <div style={{ position: "relative", textAlign: "center" }}>
        <img
          src={Hero}
          alt="Hero"
          style={{ width: "100%", height: "auto", maxHeight: "775px" }}
          className="min-h-screen"
        />
        {/* <div
          className="mx-8"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "70px",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          }}
        ></div> */}
      </div>
    </div>
  );
};

export default HomePage;
