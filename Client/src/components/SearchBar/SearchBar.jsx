import { useState, useEffect } from "react";
import "./searchBar.scss";

const SearchBar = ({ filterState, setFilterState, setCurrentPage }) => {
  const [productSearch, setProductSearch] = useState("");

  useEffect(() => {
    setFilterState({
      ...filterState,
      search: productSearch,
    });
  }, [productSearch]);

  useEffect(() => {
    setProductSearch(filterState.search);
  }, [filterState.search]);

  const handleProductSearch = (e) => {
    setProductSearch(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <section>
        <input type="text" value={productSearch} placeholder="Buscar producto" onChange={handleProductSearch} />
      </section>
    </div>
  );
};

export default SearchBar;
