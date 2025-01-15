import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";

export default function Header() {
  const cartCtx = useContext(CartContext);

  const totalCartItems = cartCtx.items.reduce(
    (totalCartItems, item) => totalCartItems + item.quantity,
    0
  );

  return (
    <header id='main-header'>
      <span id='title'>
        <img src={logo} alt='a restaurant' />
        <h1>ReactFood</h1>
      </span>
      <nav>
        <Button textOnly>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
