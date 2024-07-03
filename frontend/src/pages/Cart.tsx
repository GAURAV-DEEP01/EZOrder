import OrderItem from "../components/ItemCard";
import { Navbar } from "../components/Navbar";

export const Cart = () => {
  return (
    <div>
      <Navbar />
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
