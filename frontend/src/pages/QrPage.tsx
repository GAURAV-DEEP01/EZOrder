import { useOrder } from "../contexts/OrderContext";
import { useEffect, useState } from "react";

export const QrPage = () => {
  const { qrImage, orderId } = useOrder();
  const [storedOrder, setStoredOrder] = useState<string | null>(null);
  const [qrExpired, setQrExpired] = useState<boolean>(false);
  const [validityTime, setValidityTime] = useState<string>("");

  useEffect(() => {
    const storedOrderData = localStorage.getItem("order");
    if (storedOrderData) {
      const parsedOrder = JSON.parse(storedOrderData);
      const now = new Date();
      const orderDate = new Date(parsedOrder.date);
      const difference = now.getTime() - orderDate.getTime();
      const hoursDifference = difference / (1000 * 3600);

      if (hoursDifference < 24) {
        setStoredOrder(parsedOrder.orderId);
        const remainingTime = 24 * 60 * 60 * 1000 - difference;
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor(
          (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        setValidityTime(`${hours}:${minutes} Hours`);
      } else {
        setQrExpired(true);
      }
    }
  }, []);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = qrImage || `data:image/png;base64,${storedOrder}`;
    a.download = `Order_QR.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 text-black">
          Your Order QR Code
        </h1>
        {qrImage || storedOrder ? (
          <div className="text-center">
            <img
              src={qrImage || `data:image/png;base64,${storedOrder}`}
              alt="QR Code"
              className="w-64 h-64 border-4 border-gray-300 rounded-lg shadow-md"
            />
            <p className="text-lg text-gray-700">Order Id:</p>
            <p className="mb-2 text-black">{orderId || storedOrder}</p>
            <p className="mb-2 text-sm text-gray-600">
              Valid for: {validityTime}
            </p>
            <div className=" flex justify-center">
              <button
                onClick={handleDownload}
                className="flex justify-center items-center px-4 py-2 bg-blue-500 text-white rounded-lg mt-4">
                Download QR
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                  className="ml-2">
                  <path d="M479-336 315-500l39-37 98 98v-341h54v341l98-98 39 37-164 164ZM266-180q-36.73 0-61.36-24.64Q180-229.27 180-266v-90h54v90q0 12 10 22t22 10h428q12 0 22-10t10-22v-90h54v90q0 37-24.64 61.5T694-180H266Z" />
                </svg>
              </button>
            </div>
          </div>
        ) : qrExpired ? (
          <p className="text-red-600">QR code expired</p>
        ) : (
          <p className="text-zinc-600">No QrCode Available</p>
        )}
      </div>
    </div>
  );
};
