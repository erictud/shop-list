import styles from "./itemsList.module.css";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../firebase";
import ButtonRow from "./buttons-row";
import ItemGroup from "./item-group";
import { useRecoilState } from "recoil";
import { listState } from "../../../data/listData";

export default function ItemsList() {
  const [posts, setPosts] = useState<any>([]);
  const [activeShop, _] = useRecoilState(listState);

  useEffect(
    () =>
      onSnapshot(query(collection(db, "items"), orderBy("time", "desc")), (snapshot) => {
        const postsArr: any = [];
        snapshot.docs.forEach((el) => {
          postsArr.push({ id: el.id, ...el.data() });
        });
        setPosts(postsArr);
      }),
    []
  );

  return (
    <div className={styles.list}>
      <ButtonRow active="lidl" />
      {activeShop === "mega" && (
        <ItemGroup
          name="Mega Image"
          logoSrc="/megaImageLogo.png"
          logoAlt="Mega Image logo"
          products={posts.filter((el: any) => el.shop === "megaimage")}
        />
      )}
      {activeShop === "kaufland" && (
        <ItemGroup
          name="Kaufland"
          logoSrc="/kauflandLogo.png"
          logoAlt="Kaufland logo"
          products={posts.filter((el: any) => el.shop === "kaufland")}
        />
      )}
      {activeShop === "lidl" && (
        <ItemGroup
          name="Lidl"
          logoSrc="/lidlLogo.png"
          logoAlt="Lidl logo"
          products={posts.filter((el: any) => el.shop === "lidl")}
        />
      )}
      {activeShop === "pharmacy" && (
        <ItemGroup
          name="Farmacia Tei"
          logoSrc="/farmaciateiLogo.png"
          logoAlt="Farmacia Tei logo"
          products={posts.filter((el: any) => el.shop === "farmacia")}
        />
      )}
      {activeShop === "grocery" && (
        <ItemGroup
          name="Piata"
          logoSrc="/piataLogo.png"
          logoAlt="Piata logo"
          products={posts.filter((el: any) => el.shop === "piata")}
        />
      )}
      {activeShop === "cora" && (
        <ItemGroup
          name="Cora"
          logoSrc="/coraLogo.png"
          logoAlt="Cora logo"
          products={posts.filter((el: any) => el.shop === "cora")}
        />
      )}
      {activeShop === "carefour" && (
        <ItemGroup
          name="Carefour"
          logoSrc="/carefourLogo.png"
          logoAlt="Carefour logo"
          products={posts.filter((el: any) => el.shop === "carefour")}
        />
      )}
      {activeShop === "other" && (
        <ItemGroup
          name="Altele"
          logoSrc=""
          logoAlt="altele logo"
          products={posts.filter((el: any) => el.shop === "altele")}
        />
      )}
    </div>
  );
}
