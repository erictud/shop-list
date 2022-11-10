import ImageIcon from "../icons/ImageIcon";
import styles from "./addItemForm.module.css";

export default function AddItemForm() {
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
        <div className={styles["button-group"]}>
          <button>Adauga produs</button>{" "}
          <div>
            <div className={styles["upload-img"]}>
              <input type="file" />
            </div>
            <ImageIcon />
          </div>
        </div>
      </form>
    </div>
  );
}
