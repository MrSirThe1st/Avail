import React from "react";
import AppRoutes from "./routes";
import "./assets/styles/global.css"; // Create this file for global styles

const App: React.FC = () => {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};

export default App;
