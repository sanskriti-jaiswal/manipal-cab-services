import React from "react";
import { Link } from "react-router-dom";
const Start  = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1596857028033-e323a15ad16e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYWZmaWMlMjBzaWduYWx8ZW58MHx8MHx8fDA%3D)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400">
        <img className="w-16 ml-8" src="/logo.png" alt="Manipal Logo"  />
        <div className="bg-white py-4 px-4"><h2 className="text-3xl font-bold">Get started with Manipal-Cabs</h2>
        <Link to='/login' className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link></div>
      </div>
    </div>


  )

};

export default Start;
