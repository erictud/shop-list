import TrashIcon from "../../icons/TrashIcon";
import Moment from "react-moment";
import styles from "./postItem.module.css";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { deleteObject, ref } from "firebase/storage";

export default function PostItem(props: any) {
  const { data } = props;
  const { id, description, name, username, image, quantity, time } = data;

  async function deleteItem() {
    if (window.confirm("Esti sigur ca vrei sa stergi elementul din lists?")) {
      deleteDoc(doc(db, "items", id));
      if (image) {
        deleteObject(ref(storage, `items/${id}/image`));
      }
    }
  }

  return (
    <div className={styles.post}>
      <div className={styles["post-header"]}>
        <p>{username} </p>
        <p>
          <Moment fromNow>{new Date(time)}</Moment>
        </p>
      </div>
      <div className={styles["post-body"]}>
        <div className={styles["post-general-info"]}>
          <h4>{name}</h4>
          <p>{quantity}</p>
        </div>
        {(image || description) && (
          <div className={styles["post-more-info"]}>
            <details>
              <summary>Afla mai multe 👇</summary>
              {description && <p>{description}</p>}
              {image && (
                <div>
                  <img src={image} alt={name} />
                </div>
              )}
            </details>
          </div>
        )}
      </div>
      <div className={styles["post-footer"]}>
        <div onClick={deleteItem}>
          <TrashIcon />
        </div>
      </div>
    </div>
  );
}
