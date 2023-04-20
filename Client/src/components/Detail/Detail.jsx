import "./detail.scss";
import { getProductDetail, clearDetail, getCart } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import shipping from "/assets/img/shipping.png";
import "react-toastify/dist/ReactToastify.css";
import PurchaseOrderButton from "../PurchaseOrderButton/PurchaseOrderButton";
import error404 from "/assets/img/404.png";
import axios from "axios";

const Detail = () => {
  let dispatch = useDispatch();
  let { id } = useParams();
  const { id: userId } = JSON.parse(localStorage.getItem("userData")) ?? {};

  const productDetail = useSelector((state) => state.productDetail);
  const navigate = useNavigate();

  function backToHome() {
    dispatch(clearDetail());
    navigate("/home");
  }

  const handleBuyNow = () => {
    toast.success("Compra realizada con éxito", {});
  };

  const handleAddToCart = async () => {
    try {
      await axios.post("http://localhost:3001/cart/add", {
        productId: productDetail.id,
        userId,
      });
      dispatch(getCart(userId));
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="detail-container">
        {productDetail?.id ? (
          <>
            <div className="detail-image">
              <button onClick={backToHome}>Volver</button>
              <img src={productDetail.image} alt={productDetail.name} />
            </div>
            <div className="detail-info">
              <h2>{productDetail.name}</h2>
              <h1>$ {productDetail.price.toLocaleString()}</h1>{" "}
            </div>
            <div className="detail-buy">
              <p className="p-shipping">
                <img src={shipping} alt="shipping" />
                Envío gratis a todo el país
              </p>
              <p>
                Stock: <b>{productDetail.stock} unidades</b>
              </p>

              <PurchaseOrderButton />

              <button className="button-cart" onClick={handleAddToCart}>
                Agregar al carrito
              </button>

              <p className="p-return">Devolución gratis</p>
              <p className="p-return">Compra protegida</p>
            </div>
            <div className="detail-description">
              <h2>Características del producto</h2>
              <h3>Categoría: {productDetail.category}</h3>
              <h3>Marca: {productDetail.brand}</h3>
              <h2>Descripción</h2>
              <p>{productDetail.description}</p>
            </div>
          </>
        ) : (
          <div className="product404">
            <h1>Parece que esta página no existe</h1>
            <img src={error404} alt="error404" />
            <button onClick={backToHome}>Ir a la página principal</button>
          </div>
        )}
      </div>
    </>
  );
};
export default Detail;
