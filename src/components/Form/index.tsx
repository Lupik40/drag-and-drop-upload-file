import React, { useState, DragEvent } from "react";
import UploadIcon from "../../assets/image/upload.svg";
import Loader from "../Loader";
import "./styles.scss";

const Form = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = (file: any) => {
    let reader = new FileReader();

    reader.onloadstart = () => setIsUploading(true);
    reader.onload = (e: any) =>
      setTimeout(() => {
        setFile(e.target.result);
        setFileName(file.name);
        setIsUploading(false);
      }, 200);

    reader.readAsDataURL(file);
  };

  const addDragClass = (item: any) => {
    item.classList.add("drag");
  };

  const removeDragClass = (item: any) => {
    item.classList.remove("drag");
  };

  const removeSideEffects = (item: DragEvent<HTMLDivElement>) => {
    item.preventDefault();
    item.stopPropagation();
  };

  const handleUpload = (e: any) => {
    const thisFile = e.target.files[0];
    uploadFile(thisFile);
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    removeSideEffects(e);
    addDragClass(e.target);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    removeSideEffects(e);
    removeDragClass(e.target);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    removeSideEffects(e);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    removeSideEffects(e);
    const thisFile = e.dataTransfer.files[0];
    uploadFile(thisFile);
    removeDragClass(e.target);
  };

  return (
    <form className="form">
      <label className="form__label">
        <div
          className="form__block"
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <Loader />
          ) : (
            <img
              className={file ? "form__img" : "form__icon"}
              src={file ? file : UploadIcon}
              alt="icon-upload"
            />
          )}
          <p className="form__name">
            {fileName.length > 0 ? fileName : "Upload file (drag or click)"}
          </p>
          <input
            type="file"
            className="form__input"
            onChange={handleUpload}
            accept="image/*"
          />
        </div>
      </label>
    </form>
  );
};

export default Form;
