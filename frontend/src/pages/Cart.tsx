import { Navbar } from "../components/Navbar";

export const Cart = () => {
  return (
    <div>
      <Navbar displaySearch={false} />
      <div className=" mt-20">
        <h2>Ordered Items</h2>
        <h3>Total: $215</h3>
        <button>Confirm Order →</button>
      </div>
    </div>
  );
};
