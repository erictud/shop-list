import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../../data/authData";
import { modalState } from "../../data/modalData";
import ImageIcon from "../icons/ImageIcon";
import styles from "./addItemForm.module.css";

export default function AddItemForm() {
  const [userData, setUserData] = useRecoilState(authState);
  const [_, setModalData] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const filePickerRef = useRef(null);
  const [inputName, setInputName] = useState<string | "">("");
  const [inputQuantity, setInputQuantity] = useState<string | "">("");
  const [inputDescription, setInputDescription] = useState<string | "">("");

  const addImageToPost = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    if (!inputQuantity.trim()) return;

    if (selectedFile == null) setSelectedFile(null);
    const req = await fetch("/api/senditem", {
      method: "POST",
      body: JSON.stringify({
        name: inputName,
        quantity: inputQuantity,
        description: inputDescription,
        image: selectedFile,
        username: "",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await req.json();
    // if(!req.ok) //do something
    setSelectedFile(null);
    setInputName("");
    setInputDescription("");
    setInputQuantity("");
    setModalData(false);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitForm}>
        <div className={styles["input-group"]}>
          <label htmlFor="name">Nume produs</label>
          <input type="text" id="name" onChange={(e) => setInputName(e.target.value)} />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="quantity">Cantitate</label>
          <input type="text" id="quantity" onChange={(e) => setInputQuantity(e.target.value)} />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="details">Detalii</label>
          <textarea
            id="details"
            rows={5}
            onChange={(e) => setInputDescription(e.target.value)}
          ></textarea>
        </div>
        {selectedFile && (
          <div className={styles["selectedFile-div"]}>
            <span onClick={() => setSelectedFile(null)}>X</span>
            <img src={selectedFile} alt="imaginea produsului" />
          </div>
        )}
        <div className={styles["button-group"]}>
          <button>Adauga produs</button>
          <div onClick={() => filePickerRef.current.click()}>
            <div className={styles["upload-img"]}>
              <input type="file" onChange={addImageToPost} hidden ref={filePickerRef} />
            </div>
            <ImageIcon />
          </div>
        </div>
      </form>
    </div>
  );
}
