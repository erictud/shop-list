import TrashIcon from "../../icons/TrashIcon";
import styles from "./postItem.module.css";

export default function PostItem(props: any) {
  const { data } = props;
  const { description, name, username, image, quantity } = data;
  console.log(data);
  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <h5>{username || "user"} </h5>
        <h6>14:30 22.05.2022 </h6>
      </div>
      <div className={styles.body}>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className={styles.img}>
        <img src={image} alt="product img" />
      </div>
      <div className={styles.btn}>
        <TrashIcon />
      </div>
    </div>
  );
}
