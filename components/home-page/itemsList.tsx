import styles from "./itemsList.module.css";
import Image from "next/image";
import PostItem from "./postItem";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

export default function ItemsList() {
  const [posts, setPosts] = useState<any>([]);
  const [lidlItems, setLidlItems] = useState<any>([]);
  const [kauflandItems, setKauflandItems] = useState<any>([]);
  const [megaimageItems, setMegaimageItems] = useState<any>([]);
  const [pharmacyItems, setPharmacyItems] = useState<any>([]);
  const [groceryItems, setGroceryItems] = useState<any>([]);
  const [coraItems, setCoraItems] = useState<any>([]);
  const [carefourItems, setCarefourItems] = useState<any>([]);
  const [others, setOthersItems] = useState<any>([]);

  useEffect(
    () =>
      onSnapshot(query(collection(db, "items"), orderBy("time", "desc")), (snapshot) => {
        const postsArr: any = [];
        snapshot.docs.forEach((el) => {
          postsArr.push(el.data());
        });
        setPosts(postsArr);
      }),
    []
  );
  useEffect(() => {
    setLidlItems(posts.filter((el: any) => el.shop === "lidl"));
    setKauflandItems(posts.filter((el: any) => el.shop === "kaufland"));
    setMegaimageItems(posts.filter((el: any) => el.shop === "megaimage"));
    setPharmacyItems(posts.filter((el: any) => el.shop === "farmacia"));
    setGroceryItems(posts.filter((el: any) => el.shop === "piata"));
    setCoraItems(posts.filter((el: any) => el.shop === "cora"));
    setCarefourItems(posts.filter((el: any) => el.shop === "carefour"));
    setOthersItems(posts.filter((el: any) => el.shop === "altele"));
  }, [posts]);
  console.log(groceryItems);
  return (
    <div className={styles.list}>
      <section className={styles["shop-list"]}>
        <div className={styles["shop-list-header"]}>
          <Image src="/megaImageLogo.png" alt="mega image Logo" width={30} height={30} />
          <h5>Mega Image</h5>
        </div>
      </section>

      <section className={styles["shop-list"]}>
        <div className={styles["shop-list-header"]}>
          <Image src="/kauflandLogo.png" alt="mega image Logo" width={30} height={30} />
          <h5>Kaufland</h5>
        </div>
        <p>Nu exista produse in aceasta categorie!</p>
      </section>

      <section className={styles["shop-list"]}>
        <div className={styles["shop-list-header"]}>
          <Image src="/lidlLogo.png" alt="lidl Logo" width={30} height={30} />
          <h5>Lidl</h5>
        </div>
        <p>Nu exista produse in aceasta categorie!</p>
      </section>

      <section className={styles["shop-list"]}>
        <div className={styles["shop-list-header"]}>
          <Image src="/farmaciateiLogo.png" alt="mega image Logo" width={30} height={30} />
          <h5>Farmacia Tei</h5>
        </div>
        <p>Nu exista produse in aceasta categorie!</p>
      </section>

      <section className={styles["shop-list"]}>
        <div className={styles["shop-list-header"]}>
          <Image src="/piataLogo.png" alt="mega image Logo" width={30} height={30} />
          <h5>Piata</h5>
        </div>
        <p>Nu exista produse in aceasta categorie!</p>
      </section>

      <section className={styles["shop-list"]}>
        <div className={styles["shop-list-header"]}>
          <Image src="/coraLogo.png" alt="lidl Logo" width={50} height={30} />
          <h5>Cora</h5>
        </div>
        <p>Nu exista produse in aceasta categorie!</p>
      </section>

      <section className={styles["shop-list"]}>
        <div className={styles["shop-list-header"]}>
          <Image src="/carefourLogo.png" alt="mega image Logo" width={30} height={30} />
          <h5>Carefour</h5>
        </div>
        <p>Nu exista produse in aceasta categorie!</p>
      </section>

      <section className={styles["shop-list"]}>
        <div className={styles["shop-list-header"]}>
          <h5>Altele</h5>
        </div>
        <p>Nu exista produse in aceasta categorie!</p>
      </section>
    </div>
  );
}
