import { useEffect, useState, useRef } from "react";
import QrScanner from "qr-scanner";
import { Navbar } from "../components/AdminNavbar";
import axios from "axios";
import { BACKEND_URL } from "../App";
import { io } from "socket.io-client";

interface Order {
  _id: string;
  orderNo: string;
  items: {
    id: {
      name: string;
      price: number;
    };
    quantity: number;
  }[];
}

export const ScanQr: React.FC = () => {
  const scannerRef = useRef<HTMLVideoElement>(null);
  const [curntOrder, setCurntOrder] = useState<Order | "loading" | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  let scanner: QrScanner | null = null;
  const regex = /^[0-9a-fA-F]{24}$/;

  const isMobileDevice = (): boolean => {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  useEffect(() => {
    if (!isMobile || !scannerRef.current) return;

    let lastResult: string | null = null;
    scanner = new QrScanner(scannerRef.current, (result: string) => {
      if (regex.test(result) && result !== lastResult) {
        lastResult = result;
        if (scanner) {
          scanner.stop();
        }
        setCurntOrder("loading");
        axios
          .patch(`${BACKEND_URL}/orders/${result}`, { status: "current" })
          .then((response) => {
            if (response.data.success === false) {
              setCurntOrder(null);
              alert("Invalid Order");
              console.log(response.data.msg);
              return;
            }
            // setCurntOrder(response.data.data);
          })
          .catch((e) => {
            setCurntOrder(null);
            alert("Invalid Order");
            console.error(e);
          });
      }
      console.log(result);
    });

    if (scanner) {
      scanner.start();
    }

    return () => {
      if (scanner) {
        scanner.stop();
      }
    };
  }, [isMobile, scannerRef.current, curntOrder]);

  useEffect(() => {
    const socket = io(BACKEND_URL, { path: "/listen/curntOrder" });
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("update", (data: Order) => {
      console.log("Received data");
      setCurntOrder(data);
    });
  }, []);

  const confirmOrder = () => {
    if (!curntOrder || curntOrder === "loading") return;
    axios
      .patch(`${BACKEND_URL}/orders/${curntOrder._id}`, { status: "confirmed" })
      .then((response) => {
        if (response.data.success) {
          alert("✅ Order Confirmed");
          setCurntOrder(null);
        } else {
          alert("❌ Order Failed");
          console.error(response.data.msg);
          setCurntOrder(null);
        }
      })
      .catch((e) => {
        alert("❌ Order Failed");
        console.error(e);
        setCurntOrder(null);
      });
  };

  const cancelOrder = () => {
    if (!curntOrder || curntOrder === "loading") return;
    axios
      .patch(`${BACKEND_URL}/orders/${curntOrder._id}`, { status: "finished" })
      .then((response) => {
        if (response.data.success) {
          alert("✅ Order Cancelled");
          setCurntOrder(null);
        } else {
          alert("❌ Order cancel failed");
          console.error(response.data.msg);
          setCurntOrder(null);
        }
      })
      .catch((e) => {
        alert("❌ Order cancel failed");
        console.error(e);
        setCurntOrder(null);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center w-screen max-w-5xl mx-auto px-3 text-center">
        {curntOrder === "loading" ? (
          <div>loading</div>
        ) : !curntOrder ? (
          <div className="items-center">
            <h1 className="text-2xl font-bold mb-4">Scan QR</h1>
            {isMobile ? (
              <div className="flex justify-center items-center h-screen w-screen">
                <video
                  ref={scannerRef}
                  className="block w-full h-full object-cover"></video>
              </div>
            ) : (
              <div>Please use a mobile device to scan the QR code.</div>
            )}
          </div>
        ) : (
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg m-auto">
            <h2 className="text-2xl font-bold mb-4">Scanned Order</h2>
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
                {curntOrder.items.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-gray-800 border-b border-gray-700">
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
                      .map((item) => item.quantity * item.id.price)
                      .reduce((a, b) => a + b, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={cancelOrder}>
              Cancel
            </button>
            <button
              onClick={confirmOrder}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-4 rounded transition duration-300">
              Confirm Order →
            </button>
          </div>
        )}
      </div>
    </>
  );
};
