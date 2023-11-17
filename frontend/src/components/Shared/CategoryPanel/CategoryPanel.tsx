import React, { useEffect, useState } from "react";
import "./categorypanel.scss";
import { axiosPublic } from "../../../services/apis/axios";
import { useAppDispatch } from "../../../services/redux/useTypedSelector";
import {
  getAllProducts,
  getProductsByCategoryId,
} from "../../../services/redux/slices/product.slice";

type CategoryItem = {
  id: string;
  name: string;
};

const CategoryPanel: React.FC = () => {
  const dispatch = useAppDispatch();

  const [category, setCategory] = useState<CategoryItem[]>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosPublic.get("/category");
      setCategory(data.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      dispatch(getAllProducts());
    } else {
      dispatch(getProductsByCategoryId(selectedCategory));
    }
  }, [dispatch, selectedCategory]);

  return (
    <div className="categoryPanelContainer">
      <h1 className="categoryPanelTitle">Category</h1>
      <ul className="categoryPanelList">
        <li
          className={`categoryPanelItem ${
            selectedCategory === null && "selectedCategory"
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </li>
        {category &&
          category.map((it) => (
            <li
              key={it.id}
              className={`categoryPanelItem ${
                selectedCategory === it.id && "selectedCategory"
              }`}
              onClick={() => setSelectedCategory(it.id)}
            >
              {it.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CategoryPanel;
