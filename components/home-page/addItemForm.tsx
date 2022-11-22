import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../../data/authData";
import { modalState } from "../../data/modalData";
import { stateBar } from "../../data/stateData";
import { determineUser } from "../../lib/auth";
import ErrorIcon from "../icons/ErrorIcon";
import ImageIcon from "../icons/ImageIcon";
import Spinner from "../layout/spinner";
import styles from "./addItemForm.module.css";

export default function AddItemForm() {
  const filePickerRef = useRef<any>(null);
  const [_, setModalData] = useRecoilState(modalState);
  const [__, setStateBarVal] = useRecoilState(stateBar);
  const [authData, ___] = useRecoilState(authState);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [inputName, setInputName] = useState<string | "">("");
  const [inputQuantity, setInputQuantity] = useState<string | "">("");
  const [inputDescription, setInputDescription] = useState<string | "">("");
  const [inputShop, setInputShop] = useState<string | "">("");
  const [nameHasError, setNameHasError] = useState(false);
  const [quantityHasError, setQuantityHasError] = useState(false);

  useEffect(() => {
    setInputShop("lidl");
  }, [setInputShop]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStateBarVal("loading");
    if (!inputName.trim()) {
      setNameHasError(true);
      setLoading(false);
      return;
    }
    if (!inputQuantity.trim()) {
      setQuantityHasError(true);
      setLoading(false);
      return;
    }
    if (!inputShop.trim()) return;
    setNameHasError(false);
    setQuantityHasError(false);
    if (selectedFile == null) setSelectedFile(null);
    const username = determineUser(authData.email);
    const req = await fetch("/api/senditem", {
      method: "POST",
      body: JSON.stringify({
        name: inputName,
        quantity: inputQuantity,
        description: inputDescription,
        image: selectedFile,
        shop: inputShop,
        data: new Date().toString(),
        username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!req.ok) {
      setSelectedFile(null);
      setInputName("");
      setInputDescription("");
      setInputQuantity("");
      setStateBarVal("error");
      setModalData(false);
      setLoading(false);
      return;
    }
    const data = await req.json();
    setSelectedFile(null);
    setInputName("");
    setInputDescription("");
    setInputQuantity("");
    setStateBarVal("success");
    setModalData(false);
    setLoading(false);
  };

  const addImageToPost = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent: any) => {
      setSelectedFile(readerEvent.target.result);
    };
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submitForm}>
        <div className={styles["input-group"]}>
          <label htmlFor="name">Nume produs</label>
          <input type="text" id="name" onChange={(e) => setInputName(e.target.value)} />
          {nameHasError && (
            <div className={styles["error-div"]}>
              <ErrorIcon />
              <p>Email invalid!</p>
            </div>
          )}
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="quantity">Cantitate</label>
          <input type="text" id="quantity" onChange={(e) => setInputQuantity(e.target.value)} />
          {quantityHasError && (
            <div className={styles["error-div"]}>
              <ErrorIcon />
              <p>Email invalid!</p>
            </div>
          )}
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="shop">Magazin</label>
          <select
            name="shop"
            id="shop"
            onChange={(e) => {
              setInputShop(e.target.value);
            }}
          >
            <option value="lidl">Lidl</option>
            <option value="kaufland">kaufland</option>
            <option value="megaimage">mega image</option>
            <option value="farmacia">farmacia tei</option>
            <option value="piata">piata</option>
            <option value="cora">cora</option>
            <option value="carefour">carefour</option>
            <option value="altele">altele</option>
          </select>
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
          <button>
            {loading && (
              <span>
                <Spinner />
              </span>
            )}
            {!loading && <span>Adauga produs</span>}
          </button>
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
