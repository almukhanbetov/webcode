import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryItem from "./CategoryItem";

const Leftbar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/categories/tree")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Ошибка при загрузке категорий:", err));
  }, []);

  return (
    <div className="w-64 bg-gray-100 p-4 border-r border-gray-300 overflow-auto">
      <h2 className="text-xl font-bold mb-4">Категории</h2>
      {categories.map(cat => (
        <CategoryItem key={cat.id} category={cat} />
      ))}
    </div>
  );
};

export default Leftbar;
