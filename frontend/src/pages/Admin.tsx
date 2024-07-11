import axios from "axios";
import { BACKEND_URL } from "../App";
import { useEffect, useState } from "react";
import { Navbar } from "../components/AdminNavbar";
interface Item {
  _id: string;
  id: string;
  name: string;
  price: number;
  availableQuantity: number;
  soldQuantity: number;
  image: string;
}

export default function Admin() {
  const [items, setItems] = useState<Item[]>([]);
  const [btnDisabled, setBtnDisabled] = useState(true);

  //fetch all items
  useEffect(() => {
    (async () => {
      const res = await axios.get<{
        success: boolean;
        msg: string;
        data: Item[];
      }>(BACKEND_URL + "/items/");
      const fetchedItems = res.data.data;
      fetchedItems?.forEach((item) => {
        item.id = item._id;
      });
      setItems(fetchedItems);
    })();
  }, []);

  //confirm refresh
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

  function handleItemChange(
    itemId: string,
    availableQuantity: number,
    price: number
  ) {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, availableQuantity, price };
      }
      return item;
    });
    setItems(updatedItems);
    setBtnDisabled(false);
  }

  function handleUpdate() {
    axios
      .patch(BACKEND_URL + "/items", items)
      .then((res) => {
        if (res.data.success) {
          alert("✅Update Successful!");
          setBtnDisabled(true);
        } else {
          alert("❌Update Failed!");
          console.error(res.data.msg);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("❌Update Failed!");
      });
  }
  return (
    <div>
      <Navbar />
      <div className="justify-center space-y-6 w-screen max-w-5xl mx-auto">
        <button
          className={
            "hover:bg-green-700 mx-5 my-3 text-white font-bold py-2 px-4 rounded" +
            (btnDisabled
              ? " bg-green-700 cursor-not-allowed"
              : " bg-green-500 cursor-pointer")
          }
          onClick={handleUpdate}
          disabled={btnDisabled}>
          Save
        </button>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            handleItemChange={handleItemChange}
          />
        ))}
      </div>
    </div>
  );
}

const ItemCard = function ({
  item,
  handleItemChange,
}: {
  item: Item;
  handleItemChange: (
    itemId: string,
    availableQuantity: number,
    price: number
  ) => void;
}) {
  return (
    <div className="relative flex items-center border p-4 mx-5 rounded-lg bg-white shadow-md text-black">
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/c/cf/Samosa-and-Chatni.jpg"
        }
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg mr-4 hidden sm:block"
      />
      <div className="flex-grow text-start mt-0">
        <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
      </div>
      <div className="grid gap-1 justify-items-end">
        <div className="flex items-center space-x-2">
          <span>Available Quantity:</span>
          <input
            type="number"
            min="0"
            value={item.availableQuantity}
            onChange={(e) =>
              handleItemChange!(item._id, parseInt(e.target.value), item.price)
            }
            className="w-16 p-2 border text-black rounded-lg text-center"
          />
        </div>
        <div className="flex items-center space-x-2">
          <span>Price: ₹</span>
          <input
            type="number"
            min="0"
            value={item.price}
            onChange={(e) =>
              handleItemChange!(
                item._id,
                item.availableQuantity,
                parseInt(e.target.value)
              )
            }
            className="w-16 p-2 border text-black rounded-lg text-center"
          />
        </div>
      </div>
    </div>
  );
};
