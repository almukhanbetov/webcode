import React from "react";
import { Routes, Route } from "react-router-dom";
import Leftbar from "./components/Leftbar";
import Header from "./components/Header";
import Home from "./pages/Home";
import CategoryView from "./pages/CategoryView";

function App() {
  return (
    <div className="flex min-h-screen">
      <Leftbar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id" element={<CategoryView />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
