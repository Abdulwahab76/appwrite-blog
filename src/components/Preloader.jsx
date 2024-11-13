import React from "react";
import Logo from "./../assets/logo.png";
const Preloader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-white animate-pulse">
      <img
        src={Logo}
        alt=""
        className="flex items-center justify-center h-10 w-10 text-center object-cover"
      />
      <p className="font-medium text-lg">Medi'Blogs</p>
    </div>
  );
};

export default Preloader;
