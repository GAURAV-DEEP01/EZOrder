import OrderItem from "../components/Item";
import { Navabar } from "../components/Navabar";

export const Cart = () => {
  return (
    <div>
      <Navabar />
      <h2>Ordered Items</h2>
      <div>
        <OrderItem />
        <OrderItem />
      </div>
      <h3>Total: $215</h3>
      <button>Confirm Order →</button>
    </div>
  );
};
