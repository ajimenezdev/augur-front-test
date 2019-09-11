import React from "react";
import { Header, Footer, TokenStats, AccountStats } from "./components";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-content">
        <TokenStats />
        <AccountStats />
      </div>
      <Footer />
    </div>
  );
}

export default App;
