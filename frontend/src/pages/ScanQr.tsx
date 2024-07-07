import { useEffect, useState } from "react";
import { useRef } from "react";
import QrScanner from "qr-scanner";
import { Navbar } from "../components/AdminNavbar";
import axios from "axios";
import { BACKEND_URL } from "../App";

export const ScanQr = () => {
  const scannerRef = useRef(null);
  const [curntOrder, setCurntOrder] = useState<any>(null);
  let scanner: any;
  const regex = /^[0-9a-fA-F]{24}$/;

  useEffect(() => {
    if (!scannerRef.current) return;
    let lastResult:null|string = null;
    scanner = new QrScanner(scannerRef.current, (result) => {
      if (regex.test(result) && result !== lastResult) {
        lastResult = result;
        scanner.stop();
        setCurntOrder("loading");
        // fetch order from backend
        axios
          .get(BACKEND_URL + "/orders/" + result)
          .then((response) => {
            if (response.data.success === false) {
              setCurntOrder(null);
              window.alert("Invalid Order");
              console.log(response.data.msg);
              return;
            }
            setCurntOrder(response.data.data);
          })
          .catch((e) => {
            setCurntOrder(null);
            window.alert("Invalid Order");
            console.error(e);
          });
      }
      console.log(result);
    });
    scanner.start();
  }, [scannerRef.current, curntOrder]);


  const confirmOrder = () => {
    if (!curntOrder) return;
    axios
      .patch(BACKEND_URL + "/orders/" + curntOrder._id, {
        status: "confirmed",
      })
      .then((response) => {
        if (response.data.success) {
          window.alert("✅Order Confirmed");
          setCurntOrder(null);
        } else {
          window.alert("❌Order Failed");
          console.error(response.data.msg);
          setCurntOrder(null);
        }
      })
      .catch((e) => {
        window.alert("❌Order Failed");
        console.error(e);
        setCurntOrder(null);
      });

  }
  return (
    <>
      <Navbar />
      <div className="flex justify-center min-h-screen w-screen max-w-5xl mx-auto px-3 text-center">
        {curntOrder === "loading" ? (
          <div>loading</div>
        ) : !curntOrder ? (
          <div className="items-center">
            <h1 className="text-2xl font-bold mb-4">Scan QR</h1>
            <video ref={scannerRef} className="block max-w-full"></video>
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
                  <th className="px-4 py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {curntOrder.items.map((item: any) => (
                  <tr
                    key={item.itemId}
                    className="bg-gray-800 border-b border-gray-700"
                  >
                    <td className="px-4 py-2">{item.id.name}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{item.id.price}</td>
                  </tr>
                ))}
                <tr className="bg-gray-800 border-b border-gray-700 border-t-4 border-t-black">
                  <td className="px-4 py-2">Total</td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2">
                    {curntOrder.items
                      .map((item: any) => item.quantity * item.id.price)
                      .reduce((a: any, b: any) => a + b, 0)}
                  </td>
                </tr>
              </tbody>
            </table>

            <button
              onClick={()=>confirmOrder()}
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
