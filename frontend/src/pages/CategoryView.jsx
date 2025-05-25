import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CategoryView = () => {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [details, setDetails] = useState({ courses: [], services: [] });

  useEffect(() => {
    // 1. Загружаем дерево, чтобы получить имя категории
    axios.get("http://localhost:8080/api/categories/tree")
      .then(res => {
        const findCategory = (cats) => {
          for (let c of cats) {
            if (c.id === parseInt(id)) return c;
            if (c.children) {
              const result = findCategory(c.children);
              if (result) return result;
            }
          }
        };
        const cat = findCategory(res.data);
        if (cat) setCategoryName(cat.name);
      });

    // 2. Загружаем курсы и услуги
    axios.get(`http://localhost:8080/api/categories/${id}/details`)
      .then(res => setDetails(res.data))
      .catch(err => console.error("Ошибка загрузки деталей:", err));
  }, [id]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Категория: {categoryName}</h2>

      {details.courses.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Курсы</h3>
          <ul className="space-y-2">
            {details.courses.map(course => (
              <li key={course.id} className="border p-3 rounded">
                <div className="font-bold">{course.title}</div>
                <div className="text-gray-600">{course.description}</div>
                <div className="text-sm text-blue-600">Уровень: {course.level} | Цена: {course.price}₸</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {details.services.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Услуги</h3>
          <ul className="space-y-2">
            {details.services.map(service => (
              <li key={service.id} className="border p-3 rounded">
                <div className="font-bold">{service.title}</div>
                <div className="text-gray-600">{service.description}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryView;
