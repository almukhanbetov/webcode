import React, { useState } from "react";
import axios from "axios";

const CreateCategoryForm = () => {
  const [form, setForm] = useState({ name: "", type: "development", parent_id: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/categories", form);
      alert("Категория добавлена ✅");
    } catch (error) {
      alert("Ошибка при добавлении 😢");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Название"
        className="border p-2 w-full"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <select
        className="border p-2 w-full"
        value={form.type}
        onChange={e => setForm({ ...form, type: e.target.value })}
      >
        <option value="development">Разработка</option>
        <option value="education">Обучение</option>
      </select>
      <input
        type="number"
        placeholder="ID родителя (необязательно)"
        className="border p-2 w-full"
        value={form.parent_id || ""}
        onChange={e => setForm({ ...form, parent_id: e.target.value ? parseInt(e.target.value) : null })}
      />
      <button className="bg-blue-600 text-white py-2 px-4 rounded" type="submit">
        Добавить
      </button>
    </form>
  );
};

export default CreateCategoryForm;
