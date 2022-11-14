import TrashIcon from "../icons/TrashIcon";
import styles from "./postItem.module.css";

export default function PostItem() {
  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <h5>Eric Tudorica</h5>
        <h6>14:30 22.05.2022 </h6>
      </div>
      <div className={styles.body}>
        <h3>Lorem ipsum dolor sit.</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo quibusdam, quod quam harum
          beatae autem maiores est doloremque neque consequatur?
        </p>
      </div>
      <div className={styles.img}>
        <img src="./cart.jpg" alt="product img" />
      </div>
      <div className={styles.btn}>
        <TrashIcon />
      </div>
    </div>
  );
}
