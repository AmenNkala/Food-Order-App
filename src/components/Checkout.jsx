import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "./hooks/useHttp";
import Error from "./Error";
import { useActionState } from "react";

const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout() {
  const [, formAction, isSending] = useActionState(checkoutAction, null);
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data, error, sendRequest, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig
  );

  const totalPrice = cartCtx.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  async function checkoutAction(prevState, formData) {
    const customerData = Object.fromEntries(formData.entries());

    await sendRequest(
      JSON.stringify({
        order: { items: cartCtx.items, customer: customerData },
      })
    );
  }

  let actions = (
    <>
      <Button type='button' textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Order Submitted!</h2>
        <p>Total amount: {currencyFormatter(totalPrice)}</p>

        <p>
          Please note that the order details are available at the provided link.
        </p>
        <p className='modal-actions'>
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter(totalPrice)}</p>
        <Input label='Full Name' type='text' id='name' />
        <Input label='Email Address' type='email' id='email' />
        <Input label='Street' type='text' id='street' />
        <div className='control-row'>
          <Input label='Postal Code' type='text' id='postal-code' />
          <Input label='City' type='text' id='city' />
        </div>

        {error && <Error title='Failed to submit order.' message={error} />}

        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  );
}
