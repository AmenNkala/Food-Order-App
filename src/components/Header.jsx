import logo from "../assets/logo.jpg";

export default function Header() {
  return (
    <header id='main-header'>
      <span id='title'>
        <img src={logo} alt='a restaurant' />
        <h1>ReactFood</h1>
      </span>
      <nav>
        <button>Cart (0)</button>
      </nav>
    </header>
  );
}
