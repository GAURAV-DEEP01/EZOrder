import KitchenOrder from "../components/KitchenOrder";

export const Kitchen = () => {
  return (
    <div>
      <div className="flex justify-center">
        <h2>Orders</h2>
        <div>
          <KitchenOrder/>
          <KitchenOrder/>
        </div>
      </div>
    </div>
  );
};
