import React, { useEffect, useRef } from "react";
import { CLOUDINARY_NAME, CLOUDINARY_UPLOAD_PRESEET } from "./constants";

declare global {
  interface Window {
    cloudinary?: any;
  }
}

type PropType = {
  setFormData: any;
};

const ImageUpload: React.FC<PropType> = ({ setFormData }) => {
  const cloudinaryRef: any = useRef();
  const widgetRef: any = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef?.current?.createUploadWidget(
      {
        cloudName: CLOUDINARY_NAME,
        uploadPreset: CLOUDINARY_UPLOAD_PRESEET,
      },
      (_: any, res: any) => {
        if (res.event === "success") {
          console.log(res.info.secure_url);
          setFormData((prevState: any) => ({
            ...prevState,
            imgUrls:
              prevState?.imgUrls?.length > 0
                ? [...prevState.imgUrls, res.info.secure_url]
                : [res.info.secure_url],
          }));
        }
      }
    );
  }, []);
  return (
    <>
      <button
        // onClick={(e: React.FormEvent) => {
        //   e.preventDefault();
        //   return widgetRef.current.openWidget();
        // }}
        onClick={(e) => {
          e.preventDefault();
          return widgetRef.current.open();
        }}
      >
        Upload Images
      </button>
    </>
  );
};
export default ImageUpload;
