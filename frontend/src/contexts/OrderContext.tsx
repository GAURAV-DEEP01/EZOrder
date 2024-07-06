import QRCode from "qrcode";
import { createContext, useContext, useEffect, useState } from "react";
import { Item } from "../pages/Order";

interface OrderContextProps {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  currentOrder: OrderItem[];
  setCurrentOrder: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  addItem: (item: Item) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearOrder: () => void;
  generateQr: (orderId: string) => void;
  qrImage: string | undefined;
  orderId: string;
  confirmRefresh: () => void;
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);
  const [qrImage, setQrImage] = useState<string>();
  const [orderId, setOrderId] = useState<string>("");

  useEffect(() => {
    const storedOrder = localStorage.getItem("order");
    if (storedOrder) {
      const parsedOrder = JSON.parse(storedOrder);
      const now = new Date();
      const orderDate = new Date(parsedOrder.date);
      const difference = now.getTime() - orderDate.getTime();
      const hoursDifference = difference / (1000 * 3600);

      if (hoursDifference < 24) {
        setOrderId(parsedOrder.orderId);
        QRCode.toDataURL(parsedOrder.orderId).then(setQrImage);
      }
    }
  }, []);

  const confirmRefresh = () => {
    useEffect(() => {
      const unloadCallback = (event: {
        preventDefault: () => void;
        returnValue: string;
      }) => {
        event.preventDefault();
        event.returnValue = "";
        return "";
      };

      window.addEventListener("beforeunload", unloadCallback);
      return () => window.removeEventListener("beforeunload", unloadCallback);
    }, []);
  };

  const addItem = (item: Item) => {
    setCurrentOrder((prevOrder) => {
      const existingItem = prevOrder.find(
        (orderItem) => orderItem._id === item._id
      );
      if (existingItem) {
        return prevOrder.map((orderItem) =>
          orderItem._id === item._id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      } else {
        return [...prevOrder, { _id: item._id, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setCurrentOrder((prevOrder) => {
      const updatedOrder = prevOrder.map((orderItem) =>
        orderItem._id === itemId ? { ...orderItem, quantity } : orderItem
      );
      return updatedOrder.filter((orderItem) => orderItem.quantity > 0);
    });
  };

  const removeItem = (itemId: string) => {
    setCurrentOrder((prevOrder) =>
      prevOrder.filter((orderItem) => orderItem._id !== itemId)
    );
  };

  const clearOrder = () => {
    setCurrentOrder([]);
  };

  const generateQr = (orderId: string) => {
    try {
      QRCode.toDataURL(orderId).then(setQrImage);
      setOrderId(orderId);
      const orderData = { orderId, date: new Date().toISOString() };
      localStorage.setItem("order", JSON.stringify(orderData));
    } catch (error) {
      console.error("Error generating QR code: ", error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        items,
        setItems,
        currentOrder,
        setCurrentOrder,
        addItem,
        updateQuantity,
        removeItem,
        clearOrder,
        generateQr,
        qrImage,
        orderId,
        confirmRefresh,
      }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};

export interface OrderItem {
  _id: string;
  quantity: number;
}
