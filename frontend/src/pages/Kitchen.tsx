import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../App";
import { Navbar } from "../components/AdminNavbar";
import expandIcon from "../assets/expand-button.png";
import { io } from "socket.io-client";
interface OrderedItem {
  id: {
    name: string;
    price: number;
  };
  quantity: number;
}

interface Order {
  _id: string;
  orderNo: number;
  items: OrderedItem[];
  status: "current" | "ordered" | "confirmed" | "finished";
  date: string;
}

export const Kitchen = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get<{
        success: boolean;
        msg: string;
        data: Order[];
      }>(BACKEND_URL + "/orders");
      const data = response.data.data.filter(
        (order) =>
          order.status == "confirmed" &&
          order.date.slice(0, 10) == new Date().toISOString().slice(0, 10)
      );

      setOrders(data);
    } catch (e) {
      console.error(e);
      window.alert("Unable to fetch orders");
      setOrders([]);
    }
  };
  useEffect(() => {
    fetchOrders();
    const socket = io(BACKEND_URL, { path: "/listen/kitchen" });
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("update", (data) => {
      setOrders(
        (data as Array<Order>).filter(
          (order) =>
            order.status == "confirmed" &&
            order.date.slice(0, 10) == new Date().toISOString().slice(0, 10)
        )
      );
    });
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto">
        <h1>Orders</h1>
        {!orders
          ? "Loading..."
          : orders.length == 0
          ? "No orders available"
          : orders.map((order) => (
              <KitchenOrder
                key={order._id}
                order={order}
                reFetchOrder={fetchOrders}
              />
            ))}
      </div>
    </div>
  );
};

const KitchenOrder = ({
  order,
  reFetchOrder,
}: {
  order: Order;
  reFetchOrder: () => void;
}) => {
  const [toggle, setToggle] = useState(false);
  function handleOrderDone() {
    try {
      axios
        .patch(BACKEND_URL + "/orders/" + order._id, {
          status: "finished",
        })
        .then((response) => {
          if (!response.data.success) {
            console.error(response.data.msg);
            window.alert("❌Update Failed");
          }
          reFetchOrder();
        });
    } catch (e) {
      console.log(e);
      reFetchOrder();
    }
  }

  return (
    <div className="w-full bg-slate-50 text-black">
      <div className="flex items-center px-4 py-2">
        <h3 className="font-bold mr-auto">Order No: {order.orderNo}</h3>
        <div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleOrderDone}
          >
            DONE
          </button>
          <button
            className={
              "bg-slate-200 text-white inline-block p-2 rounded-md shadow-lg hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-500 " +
              (!toggle ? " -rotate-90" : "")
            }
            onClick={() => setToggle(!toggle)}
          >
            <img src={expandIcon} className="h-3 aspect-square" />
          </button>
        </div>
      </div>
      {toggle && (
        <div className="mt-4">
          <table className="min-w-full bg-slate-200">
            <thead className="bg-slate-300">
              <tr>
                <th className="px-4 py-2">Item Name</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id.name} className="text-center">
                  <td className="border px-4 py-2">{item.id.name}</td>
                  <td className="border px-4 py-2">{item.quantity}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700">
                      Done
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
