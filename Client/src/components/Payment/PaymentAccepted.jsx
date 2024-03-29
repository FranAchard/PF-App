import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../redux/actions/actions";
import accepted from "/assets/img/accepted.gif"
import "./payment.scss";

const Accepted = () => {
  // Local
  //const HOST = "http://localhost:3001/";
  //const API_URL = "http://localhost:3001/cart/";
  //const API_PRODUCTS_URL = "http://localhost:3001/products/";
  
  // Deploy
  const HOST = "https://pf-app-production.up.railway.app/";
  const API_URL = "https://pf-app-production.up.railway.app/cart/";
  const API_PRODUCTS_URL = "https://pf-app-production.up.railway.app/products/";

  const { id } = JSON.parse(localStorage.getItem("userData")) ?? {};

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector((state) => state.cartProducts);

  useEffect(() => {
    const handleAccepted = async () => {
      try {
        // Actualizar stock
        await Promise.all(
          cartProducts.map(async (p) => {
            let productEdit = {
              name: p.name,
              bran: p.brand,
              price: p.price,
              image: p.image,
              description: p.description,
              stock: p.stock - p.ShoppingCart_Products.quantity,
              category: p.category,
              disable: p.disable,
            };
            await axios.put(`${API_PRODUCTS_URL}${p.id}`, productEdit);
          })
        );
        // Crear orden de compra
        await axios.post(`${HOST}order/create/${id}`);

        // Vaciar carrito
        await axios.post(`${API_URL}empty/${id}`);

        // Obtener carrito actualizado
        dispatch(getCart(id));

        // Redireccionar a home
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      } catch (error) {
        console.error(error);
      }
    };

    handleAccepted();
  }, []);

  return (
    <div className="payment-status">
      <h1>Tu compra se ha completado exitosamente</h1>
      <img src={accepted} alt="Gif" />
    </div>
  );
};

export default Accepted;
