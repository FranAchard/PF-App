import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllProducts } from "../../redux/actions/actions";
import "./home.scss";

import Carrousel from "../Carrousel/Carrousel";
import Filters from "../Filters/Filters";
import Product from "../Product/Product";
import Pagination from "../Pagination/Pagination";

const Home = () => {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.allProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  const numOfLastProduct = currentPage * productsPerPage;
  const numOfFirstProduct = numOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(numOfFirstProduct, numOfLastProduct);

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className="home">
      <Carrousel />
      <div className="filtros_productos">
        <Filters setCurrentPage={setCurrentPage} />
        <div className="divPagination">
          <div className="paginationAndCart">
            <Pagination
              productsPerPage={productsPerPage}
              allProducts={allProducts.length}
              handlePagination={handlePagination}
              currentPage={currentPage}
            />
          </div>

          {allProducts && allProducts.length === 0 ? (
            <div className="noProducts">
              <h1>No hay productos disponibles</h1>
            </div>
          ) : (
            <div className="products" id="products">
              {currentProducts.map((product, index) => (
                <Product product={product} key={index} />
              ))}
            </div>
          )}

          <Pagination
            productsPerPage={productsPerPage}
            allProducts={allProducts.length}
            handlePagination={handlePagination}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
