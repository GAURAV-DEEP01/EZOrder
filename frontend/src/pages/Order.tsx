import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { BACKEND_URL } from "../App";
import ItemCard from "../components/ItemCard";

export interface Item {
  _id: string;
  name: string;
  price: number;
  availableQuantity: number;
  soldQuantity: number;
  image: string;
}

export interface OrderItem {
  _id: string;
  quantity: number;
}

export const Order = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get<{
          success: boolean;
          msg: string;
          data: Item[];
        }>(BACKEND_URL + "/items/");
        setItems(res.data.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleAddItem = (item: Item) => {
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

  const handleQuantityChange = (itemId: string, quantity: number) => {
    setCurrentOrder((prevOrder) =>
      prevOrder.map((orderItem) =>
        orderItem._id === itemId ? { ...orderItem, quantity } : orderItem
      )
    );
  };

  useEffect(() => {
    console.log(currentOrder);
  }, [currentOrder]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar
        displaySearch={true}
        onSearch={(query) => setSearchQuery(query)}
      />
      <div className="flex justify-center mt-24">
        <div className="flex-col text-center">
          <div className="space-y-6 w-screen">
            {filteredItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                currentOrder={currentOrder}
                handleAddItem={handleAddItem}
                handleQuantityChange={handleQuantityChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
