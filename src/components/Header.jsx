import logo from "../assets/logo.jpg";
import Button from "./UI/Button";

export default function Header() {
  return (
    <header id='main-header'>
      <span id='title'>
        <img src={logo} alt='a restaurant' />
        <h1>ReactFood</h1>
      </span>
      <nav>
        <Button textOnly>Cart (0)</Button>
      </nav>
    </header>
  );
}
