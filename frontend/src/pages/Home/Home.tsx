import React, { useEffect, useState } from "react";
import ProductCard from "../../components/Home/ProductCard/ProductCard";
import "./home.scss";
import CategoryPanel from "../../components/Shared/CategoryPanel/CategoryPanel";
import { useAppDispatch } from "../../services/redux/useTypedSelector";
import { IProductCard } from "../../interface/response/product.response";
import { getAllProducts } from "../../services/redux/slices/product.slice";
import { useSelector } from "react-redux";
import { productSelector } from "../../services/redux/selecters/selector";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const productPayload = useSelector(productSelector);
  const [productList, setProductList] = useState<IProductCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllProducts());
    };
    fetchData();
  }, [dispatch]);
  useEffect(() => {
    setProductList(productPayload.products);
  }, [productPayload.products]);

  // event handlers =================================================================
  const handleClickProductCard = async (id: string) => {
    navigate(`/product/${id}`);
  };
  return (
    <div className="homeContainer">
      <div className="homeCategoryPanel">
        <CategoryPanel />
      </div>
      <div className="homeProductPanel">
        <div className="homeProductList">
          {productList &&
            productList.map((it) => (
              <div
                className="homeProductCard"
                onClick={(e) => handleClickProductCard(it.id)}
              >
                <ProductCard
                  name={it.name}
                  price={it.price}
                  imageUrl={it.imageUrl}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
