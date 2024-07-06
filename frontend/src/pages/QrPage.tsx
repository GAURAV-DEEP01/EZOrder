import { useOrder } from "../contexts/OrderContext";

export const QrPage = () => {
  const { qrImage, orderId, confirmRefresh } = useOrder();
  confirmRefresh();

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 text-black">
          Your Order QR Code
        </h1>
        {qrImage ? (
          <div className="text-center">
            <img
              src={qrImage}
              alt="QR Code"
              className="w-64 h-64 border-4 border-gray-300 rounded-lg shadow-md"
            />
            <p className="mb-2 text-lg text-gray-700">
              Order Id:
              <div className="font-bold text-gray-900">{orderId}</div>
            </p>
          </div>
        ) : (
          <p className="text-gray-600">Generating QR code...</p>
        )}
      </div>
    </div>
  );
};
