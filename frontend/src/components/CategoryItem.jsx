import React, { useState } from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ category, level = 0 }) => {
  const [open, setOpen] = useState(false);
  const hasChildren = category.children?.length > 0;

  return (
    <div className={`pl-${level * 4} py-1`}>
      <div
        className="flex items-center cursor-pointer hover:bg-gray-200 p-1 rounded"
        onClick={() => hasChildren && setOpen(!open)}
      >
        {hasChildren && (
          <span className={`mr-2 transition-transform ${open ? "rotate-90" : ""}`}>
            ▶
          </span>
        )}
        <Link to={`/category/${category.id}`} className="text-blue-600 hover:underline">
          {category.name}
        </Link>
      </div>

      {hasChildren && open && (
        <div>
          {category.children.map(child => (
            <CategoryItem key={child.id} category={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
