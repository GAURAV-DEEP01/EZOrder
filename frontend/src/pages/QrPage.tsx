import { useEffect, useState } from "react";
import QRCode from "qrcode";

export const QrPage = () => {
  const [srci, setSrci] = useState();
  const id = "x123"; //change to id from backend
  useEffect(() => {
    QRCode.toDataURL(id).then();
  }, []);
  return (
    <div className="flex justify-center">
      <div className="flex-col justify-center">
        <div className="text-center">QR Page</div>
        <p>ID : {id}</p>
        <img src={srci} alt={"QR ID: " + id} />
      </div>
    </div>
  );
};
