import Image from "next/image";
import PostItem from "../item-design/postItem";
import styles from "./item-group.module.css";

type Props = {
  name: string;
  logoSrc: string;
  logoAlt: string;
  products: any[];
};

export default function ItemGroup(props: Props) {
  return (
    <section className={styles["shop-list"]}>
      <div className={styles["shop-list-header"]}>
        {props.logoSrc.trim() && (
          <Image src={props.logoSrc} alt={props.logoAlt} width={30} height={30} />
        )}
        <h5>{props.name}</h5>
      </div>
      {props.products.length >= 1 ? (
        props.products.map((el: any) => {
          return <PostItem data={el} key={el.id} />;
        })
      ) : (
        <p>Niciun produs de cumparat de la {props.name}!</p>
      )}
    </section>
  );
}
