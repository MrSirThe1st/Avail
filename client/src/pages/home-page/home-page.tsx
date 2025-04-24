import React from "react";
import Button from "../../components/base/button/button";

const HomePage: React.FC = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Welcome to Avail</h1>
      <p>Your application is now running!</p>
      <div style={{ marginTop: "2rem" }}>
        <Button variant="primary" size="large">
          Get Started
        </Button>
        <span style={{ marginLeft: "1rem" }}></span>
        <Button variant="outlined">Learn More</Button>
      </div>
    </div>
  );
};

export default HomePage;
