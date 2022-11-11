import { useRef, useState } from "react";
import ImageIcon from "../icons/ImageIcon";
import styles from "./addItemForm.module.css";

export default function AddItemForm() {
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(null);
  const filePickerRef = useRef(null);

  const addImageToPost = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent) setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles["input-group"]}>
          <label htmlFor="name">Nume produs</label>
          <input type="text" id="name" />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="quantity">Cantitate</label>
          <input type="text" id="quantity" />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="details">Detalii</label>
          <textarea id="details" rows={5}></textarea>
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
