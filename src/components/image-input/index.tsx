"use client";

import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import ImageInputLabel from "./image-input-label";
import Image from "next/image";
import { convertToBase64 } from "@/lib/utils";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ImageInput {
  name: string;
  id: string;
  className?: string;
  value: File | null;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ImageInput = ({ className, name, id, onChange, value }: ImageInput) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<any>(value);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const base64: any = await convertToBase64(file);
    setImage(base64);
    const newEvent: any = {
      ...e,
      target: { ...e.target, value: file },
    };
    onChange(newEvent);
    e.target.value = "";
  };

  const handleImageClick = () => {
    imageInputRef.current?.click();
  };

  const cardStyle = !image ? "border-dashed border-2 border-gray-400" : "";

  return (
    <div className={cn("md:w-60 w-52", className)}>
      <div
        className={`p-6 h-60 w-full mb-4 bg-gray-100 ${cardStyle} rounded-lg flex items-center justify-center mx-auto text-center cursor-pointer`}
      >
        <input
          ref={imageInputRef}
          id={id}
          name={name}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageChange}
        />
        {image && value ? (
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt="Image preview"
              layout="fill"
              objectFit="cover"
              priority={true}
              fill={true}
              onClick={handleImageClick}
            />
          </div>
        ) : (
          <ImageInputLabel htmlFor={id} />
        )}
      </div>
    </div>
  );
};

export default ImageInput;
