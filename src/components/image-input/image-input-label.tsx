const ImageInputLabel = ({ htmlFor }: { htmlFor: string }) => {
  return (
    <label htmlFor={htmlFor} className="cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-8 h-8 text-gray-700 mx-auto mb-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
        />
      </svg>
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
        Upload picture
      </h5>
      <p className="font-normal text-sm text-gray-400 md:px-6">
        Choose photo size should be less than{" "}
        <b className="text-gray-600">2mb</b>
      </p>
      <p className="font-normal text-sm text-gray-400 md:px-6">
        and should be in <b className="text-gray-600">JPG, PNG, or GIF</b>{" "}
        format.
      </p>
      <span id="filename" className="text-gray-500 bg-gray-200 z-50"></span>
    </label>
  );
};

export default ImageInputLabel;
