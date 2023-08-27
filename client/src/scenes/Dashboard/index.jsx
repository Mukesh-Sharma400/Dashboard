import React from "react";
import underConstruction from "assets/undraw_under_construction_-46-pa.svg";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <img
        src={underConstruction}
        alt="Under Construction"
        style={{ height: "50%", width: "50%" }}
      />
      <h2>This Page is Under Construction</h2>
      <Link to="/products" style={{ color: "#fff" }}>
        Checkout Products Page!
      </Link>
    </div>
  );
};

export default Dashboard;
