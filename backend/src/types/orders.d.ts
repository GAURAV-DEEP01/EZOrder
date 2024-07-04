interface OrderedItems {
  itemId: string;
  quantity: number;
}

interface Orders_t {
  orderNo: Number;
  items: OrderedItems[];
  status: "current" | "ordered" | "confirmed" | "finished";
  date: Date;
}
