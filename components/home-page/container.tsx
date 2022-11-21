import { useRecoilState } from "recoil";
import { modalState } from "../../data/modalData";
import AddItemIcon from "../icons/AddItemIcon";
import AddItemForm from "./addItemForm";
import styles from "./container.module.css";
import Modal from "react-modal";
import PageHeader from "./pageHeader";
import ItemsList from "./items-list/itemsList";
import StateBar from "../layout/StateBar";
import { stateBar } from "../../data/stateData";

export default function Container() {
  const [modal, setModalState] = useRecoilState(modalState);
  const [stateBarVal, _] = useRecoilState(stateBar);

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
      <PageHeader />
      <ItemsList />
      {stateBarVal && <StateBar state={stateBarVal} />}
    </div>
  );
}
