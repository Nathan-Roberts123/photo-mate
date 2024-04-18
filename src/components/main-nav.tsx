"use client";
import { useContext } from "react";
import { Button } from "./ui/button";
import { modalContext } from "./Provider";

const Navbar = () => {
  const { dispatch } = useContext(modalContext);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Photo Mate
        </span>
        <div className="">
          <Button
            onClick={() => {
              dispatch();
            }}
          >
            New Post
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
