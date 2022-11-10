import { useRecoilState } from "recoil";
import { modalState } from "../../data/modalData";
import AddItemIcon from "../icons/AddItemIcon";
import AddItemForm from "./addItemForm";
import styles from "./container.module.css";
import Modal from "react-modal";

export default function Container() {
  const [modal, setModalState] = useRecoilState(modalState);
  return (
    <div className={styles.container}>
      <Modal
        className={styles.modal}
        isOpen={modal}
        onRequestClose={() => setModalState(false)}
        ariaHideApp={false}
      >
        <button className={styles["close-btn"]} onClick={() => setModalState(false)}>
          X
        </button>
        <AddItemForm />
      </Modal>
      <button className={styles["add-btn"]} onClick={() => setModalState(true)}>
        <AddItemIcon />
      </button>
    </div>
  );
}
