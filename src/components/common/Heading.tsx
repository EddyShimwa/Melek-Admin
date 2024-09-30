import React from "react";
import { BiBell } from "react-icons/bi";

const Heading: React.FC = () => {
  const adminPhotoUrl = "";

  return (
    <div className="ml-64 h-20 w-[calc(100%-16rem)] bg-app-gray flex items-center justify-end px-4">
      <div className="flex items-center p-5">
        {adminPhotoUrl ? (
          <img
            src={adminPhotoUrl}
            alt="Admin"
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-white">
            <span className="material-icons text-lg"></span>
          </div>
        )}
        <span className="ml-4 text-lg md:text-base font-semibold">Admin</span>
      </div>

      <div className="flex items-center">
        <button className="mr-4 relative">
		  <BiBell className="text-2xl text-app-green" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
      </div>
    </div>
  );
};

export default Heading;
