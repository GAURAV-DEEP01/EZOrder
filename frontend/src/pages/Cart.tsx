import { Navbar } from "../components/Navbar";
import { useOrder } from "../contexts/OrderContext";
import axios from "axios";
import { BACKEND_URL } from "../App";

export const Cart = () => {
  const { currentOrder, items, updateQuantity, removeItem, clearOrder } =
    useOrder();

  const orderedItems = currentOrder.map((orderItem) => {
    const item = items.find((item) => item._id === orderItem._id);
    return { ...orderItem, ...item };
  });

  const totalAmount = orderedItems.reduce(
    (total, item) => total + item.quantity * item.price!,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/orders`, {
        items: currentOrder,
      });
      console.log("Order placed successfully:", response.data);
      clearOrder();
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <Navbar displaySearch={false} />
      <div className="mt-20 max-w-5xl mx-auto p-4">
        <div className=" flex justify-between mb-5">
          <h2 className="text-2xl font-semibold mb-4">Ordered Items</h2>
          <button
            onClick={clearOrder}
            className="px-3 py-2 bg-red-500 text-white rounded-lg">
            Delete All
          </button>
        </div>
        {orderedItems.length > 0 ? (
          <ul className="space-y-4">
            {orderedItems.map((orderItem) => (
              <li
                key={orderItem._id}
                className="flex justify-between items-center border p-4 rounded-lg bg-white shadow-md">
                <div>
                  <h3 className="text-lg text-black font-semibold">
                    {orderItem.name}
                  </h3>
                  <p className="text-gray-700">Price: ${orderItem.price}</p>
                  <p className="text-gray-700">
                    Quantity: {orderItem.quantity}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      updateQuantity(orderItem._id, orderItem.quantity - 1)
                    }
                    className="p-1 bg-zinc-900 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e8eaed">
                      <path d="M191.87-434.5v-91h576.26v91H191.87Z" />
                    </svg>
                  </button>
                  <button
                    onClick={() =>
                      updateQuantity(orderItem._id, orderItem.quantity + 1)
                    }
                    className="p-1 bg-zinc-900 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#e8eaed">
                      <path d="M434.5-434.5H191.87v-91H434.5v-242.63h91v242.63h242.63v91H525.5v242.63h-91V-434.5Z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => removeItem(orderItem._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded-lg">
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No items in the cart.</p>
        )}
        <div className="mt-4">
          <h3 className="text-xl font-semibold">
            Total: ${totalAmount.toFixed(2)}
          </h3>
          <div className="mt-4 space-x-2">
            <button
              onClick={handlePlaceOrder}
              className="px-4 py-2 bg-green-500 text-white rounded-lg">
              Place Order →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
