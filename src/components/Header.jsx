import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce(
    (totalCartItems, item) => totalCartItems + item.quantity,
    0
  );

  function handleShowCart() {
    userProgressCtx.showCart();
    /* userProgressCtx.setIsCartVisible(true);
    userProgressCtx.setIsCheckoutVisible(false);
    userProgressCtx.setIsOrderConfirmedVisible(false); */
  }

  return (
    <header id='main-header'>
      <span id='title'>
        <img src={logo} alt='a restaurant' />
        <h1>ReactFood</h1>
      </span>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
