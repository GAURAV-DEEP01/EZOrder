import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../App";
import { Navbar } from "../components/AdminNavbar";
import expandIcon from "../assets/expand-button.png"
interface OrderedItem {
  id: string;
  quantity: number;
  name: string;
  price: number;
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
  useEffect(() => {
    const fetchOrders = async () => {
      // const response = await axios.get<{
      //   success: boolean;
      //   msg: string;
      //   data: Order[];
      // }>(BACKEND_URL + "/orders");
      // const data = response.data.data;
      // console.log(data);
      
      const data: Order[] = [
        {
          _id: "66881f1c108a22aa09e4080b",
          orderNo: 101,
          items: [
            {
              id: "66881f1c108a22aa09e4080a",
              quantity: 2,
              name: "Veggie Burger",
              price: 100,
            },
            {
              id: "66881f1c108a22aa09e40809",
              quantity: 5,
              name: "Veggie Noodles",
              price: 100,
            },
          ],
          status: "ordered",
          date: "2024-07-01T10:00:00Z",
        },
      ];
      setOrders(data);
    };
    fetchOrders();
  },[]);
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
              <KitchenOrder key={order._id} order={order} />
            ))}
      </div>
    </div>
  );
};

const KitchenOrder = ({ order }: { order: Order }) => {
  const [toggle, setToggle] = useState(false);
  function handleOrderDone() {
    try{
      axios.patch(BACKEND_URL + "/orders/" + order._id, {
        status: "finished",
      });
    }catch(e){
      console.log(e);
    }
  }

  return (
    <div className="w-full bg-slate-50 text-black">
      <div className="flex items-center px-4 py-2">
        <h3 className="font-bold mr-auto">Order No: {order.orderNo}</h3>
        <div>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
            DONE
          </button>
          <button
            className={"bg-slate-200 text-white inline-block p-2 rounded-md shadow-lg hover:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-500 "+ (!toggle ? " -rotate-90" : "")}
            onClick={() => setToggle(!toggle)}
          >
            <img src={expandIcon} className="h-3 aspect-square"/>
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
                <tr key={item.id} className="text-center">
                  <td className="border px-4 py-2">{item.name}</td>
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
