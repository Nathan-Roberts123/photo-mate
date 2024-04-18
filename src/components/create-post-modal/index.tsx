"use client";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import Xicon from "../icons/x-icon";
import PostForm from "./post-form";
import { useContext } from "react";
import { modalContext } from "../Provider";
import { useRef } from "react";

interface CreatePostModalProps {
  id: string;
  ariaHiddedn: boolean;
}

const CreatePostModal = ({ id, ariaHiddedn }: CreatePostModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { state, dispatch } = useContext(modalContext);

  const showModal =
    (state as { status: string }).status == "opened" ? "" : "hidden";

  useEffect(() => {
    let mouseDownHandler = (e: any) => {
      if (!modalRef.current!.contains(e.target)) {
        if ((state as { status: string }).status == "opened") {
          dispatch();
        }
      }
    };
    document.addEventListener("mousedown", mouseDownHandler);
    return () => {
      document.removeEventListener("mousedown", mouseDownHandler);
    };
  });

  return (
    <div
      className={`${showModal} fixed bottom-0 top-0 left-0 right-0 z-10 bg-black bg-opacity-25 flex justify-center items-center`}
    >
      <div
        id={id}
        ref={modalRef}
        aria-hidden={ariaHiddedn}
        className="overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-2/3 md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-h-full">
          <div className="relative bg-white rounded-lg w-full shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Product
              </h3>
              <Button
                variant="xicon"
                onClick={() => {
                  dispatch();
                }}
              >
                <Xicon />
                <span className="sr-only">Close modal</span>
              </Button>
            </div>
            <PostForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
