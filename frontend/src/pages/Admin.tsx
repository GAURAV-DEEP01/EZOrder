// src/pages/Admin.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Admin: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-black">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Page</h2>
        <p className="">Welcome to the admin page!</p>
        list of food items here-
        <br />
        <br />
        <div className="flex justify-between ">
          <button className="border" onClick={() => navigate("/admin/qr")}>
            Qr
          </button>
          <button className="border" onClick={() => alert("edit items")}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
