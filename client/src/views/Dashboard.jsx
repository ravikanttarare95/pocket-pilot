import React from "react";
import Navbar from "./../components/Navbar";
import Button from "./../components/Button";
import { House } from "lucide-react";
import { useNavigate } from "react-router";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <Button
          btnTitle={<House />}
          size="sm"
          customStyle="px-2! py-2 rounded-full!"
          onBtnClick={() => {
            setTimeout(() => {
              navigate("/");
            }, 300);
          }}
        />
        <h2 className="text-xl font-bold mb-4 mt-5">Sidebar</h2>
        <ul className="space-y-2">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            Menu 1
          </li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            Menu 2
          </li>
        </ul>
      </aside>
      <main className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-4">Main Content</h1>
        <p className="text-gray-700">
          This is the main container on the right side of the sidebar.
        </p>
      </main>
    </div>
  );
}

export default Dashboard;
