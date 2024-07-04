import { Document } from "mongoose";

interface Items_t extends Document`` {
  id: string;
  name: string;
  price: number;
  availableQuantity: number;
  soldQuantity: number;
  image: string;
}

export default Items_t;
