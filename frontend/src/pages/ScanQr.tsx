import { useEffect, useState } from "react";
import { useRef } from "react";
import QrScanner from "qr-scanner";
import { Navbar } from "../components/AdminNavbar";

export const ScanQr = () => {
  const scannerRef = useRef(null);
  const [curntOrder, setCurntOrder] = useState<any>(null);
  let scanner: any;
  const regex = /^[0-9a-fA-F]{24}$/;
  useEffect(() => {
    if (!scannerRef.current) return;
    scanner = new QrScanner(scannerRef.current, (result) => {
      if (regex.test(result)) {
        scanner.stop();
        setCurntOrder("loading");
        // fetch order from backend
        setTimeout(() => {
          setCurntOrder({
            orderNo: 12345,
            items: [
              {
                itemId: "60c72b2f9b1d8e6d88fddf9a",
                name: "Pizza",
                quantity: 2,
              },
              {
                itemId: "60c72b2f9b1d8e6d88fddf9b",
                name: "Burger",
                quantity: 1,
              },
            ],
            status: "ordered",
            date: "2023-07-05T00:00:00.000Z",
          });
        }, 3000);
      }
      console.log(result);
    });
    scanner.start();
  }, [scannerRef.current, curntOrder]);
  return (
    <>
      <Navbar />
      <div className="flex justify-center min-h-screen">
        {curntOrder === "loading" ? (
          <div>loading</div>
        ) : !curntOrder ? (
          <div className="items-center">
            <div>QR scanning page</div>
            <video ref={scannerRef} className="block"></video>
          </div>
        ) : (
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg m-auto">
            <h2 className="text-2xl font-bold mb-4">Order Confirm Page</h2>
            <h3 className="text-xl mb-4">Order No: {curntOrder.orderNo}</h3>
            <table className="w-full table-auto mb-4">
              <thead>
                <tr>
                  <th className="px-4 py-2">Item Name</th>
                  <th className="px-4 py-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {curntOrder.items.map((item: any) => (
                  <tr
                    key={item.itemId}
                    className="bg-gray-800 border-b border-gray-700"
                  >
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setCurntOrder(null)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Confirm Order →
            </button>
          </div>
        )}
      </div>
    </>
  );
};
