"use client";
import React, { useEffect, useRef, useState } from "react";
import pic1 from "../../../public/images/image-1.webp";
import pic2 from "../../../public/images/image-2.webp";
import pic3 from "../../../public/images/image-3.webp";
import pic4 from "../../../public/images/image-4.webp";
import pic5 from "../../../public/images/image-5.webp";
import pic6 from "../../../public/images/image-6.webp";
import pic7 from "../../../public/images/image-7.webp";
import pic8 from "../../../public/images/image-8.webp";
import pic9 from "../../../public/images/image-9.webp";
import pic10 from "../../../public/images/image-10.jpeg";
import pic11 from "../../../public/images/image-11.jpeg";
import Image from "next/image";

const data = [
  {
    id: 1,
    photo: pic1,
  },
  {
    id: 2,
    photo: pic2,
  },
  {
    id: 3,
    photo: pic3,
  },
  {
    id: 4,
    photo: pic4,
  },
  {
    id: 5,
    photo: pic5,
  },
  {
    id: 6,
    photo: pic6,
  },
  {
    id: 7,
    photo: pic7,
  },
  {
    id: 8,
    photo: pic8,
  },
  {
    id: 9,
    photo: pic9,
  },
  {
    id: 10,
    photo: pic10,
  },
  {
    id: 11,
    photo: pic11,
  },
];

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(data);
  }, []);

  // initialized ref
  const dragPhoto = useRef(0);
  const draggedPhoto = useRef(0);

  //sort function and handle drag item
  const handleDrag = () => {
    // copy array
    const imagesClone = [...images];

    //remove and save the dragged item
    const temp = imagesClone.splice(dragPhoto.current, 1)[0];

    // exchange position
    imagesClone.splice(draggedPhoto.current, 0, temp);

    //reset ref
    dragPhoto.current = null;
    draggedPhoto.current = null;
    setImages(imagesClone);
  };

  // handle selected item
  const handleCheck = (e) => {
    const { value, checked } = e.target;
    console.log(value, checked);

    // insert isChecked attributes in the array of object
    const temp1 = images.map((item) =>
      item.id === Number(value) ? { ...item, isChecked: checked } : item
    );
    setImages(temp1);
  };

  // count the selected image
  const count = images.filter((item) => item?.isChecked === true);

  // delete function and update array
  const handleDelete = () => {
    const countDelete = images.filter((item) => item?.isChecked != true);
    setImages(countDelete);
  };

  return (
    <div className=" bg-slate-100 p-5">
      <div className="m-1 md:m-3 bg-white rounded-md shadow-md">
        {count.length > 0 ? (
          <div className=" flex justify-between p-5">
            <h1 className=" flex items-center font-bold">
              <input type="checkbox" className=" me-2" checked />
              {count.length }
              {count.length > 1 ? " Files Selected" : " File Selected"}
            </h1>
            <button
              className=" text-red-500 hover:underline"
              onClick={handleDelete}
            >
              {count.length > 1 ? "Delete Files" : "Delete File"}
            </button>
          </div>
        ) : (
          <h1 className="p-5 font-bold">Gallery</h1>
        )}
        <hr />
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-5">
          {images.map((pic, index) => (
            <div
              key={index}
              className={`border rounded-md relative group shadow-sm cursor-grabbing transition-all duration-200  ${
                index === 0 ? "row-span-2 col-span-2" : ""
              }`}
              draggable
              onDragStart={() => (dragPhoto.current = index)}
              onDragEnter={() => (draggedPhoto.current = index)}
              onDragEnd={handleDrag}
              onDragOver={(e) => e.preventDefault()}
            >
              <Image src={pic.photo} alt="img" className=" rounded-md" />

              <div
                className={` absolute h-full w-full bg-slate-400 opacity-0 group-hover:opacity-80 top-0 rounded-md transition-all duration-150 ${
                  pic?.isChecked == true ? "absolute opacity-40" : ""
                }`}
              >
                <input
                  type="checkbox"
                  value={pic.id}
                  checked={pic?.isChecked || false}
                  className="m-2"
                  onChange={handleCheck}
                />
              </div>
            </div>
           
          ))}
           <div>
              <label className=" h-40 w-44 border-2 border-dashed rounded-md shadow-sm cursor-pointer flex justify-center items-center sm:h-full sm:w-full">Add Images
              
              <input type="file" name="images" multiple style={{display:'none'}} />
              </label>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
