import { createContext, useContext, useState } from "react";
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
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);

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

interface OrderItem {
  _id: string;
  quantity: number;
}
