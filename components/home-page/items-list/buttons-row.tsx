import { useRecoilState } from "recoil";
import { listState } from "../../../data/listData";
import styles from "./buttons-row.module.css";

type Props = {
  active: string;
};

export default function ButtonRow(props: Props) {
  const [activeBtn, setActiveShop] = useRecoilState(listState);
  return (
    <div className={styles.container}>
      <button
        className={`${activeBtn === "lidl" && styles.active}`}
        onClick={() => setActiveShop("lidl")}
      >
        Lidl
      </button>
      <button
        className={`${activeBtn === "kaufland" && styles.active}`}
        onClick={() => setActiveShop("kaufland")}
      >
        Kaufland
      </button>
      <button
        className={`${activeBtn === "mega" && styles.active}`}
        onClick={() => setActiveShop("mega")}
      >
        Mega{" "}
      </button>
      <button
        className={`${activeBtn === "pharmacy" && styles.active}`}
        onClick={() => setActiveShop("pharmacy")}
      >
        Tei
      </button>
      <button
        className={`${activeBtn === "grocery" && styles.active}`}
        onClick={() => setActiveShop("grocery")}
      >
        Piata
      </button>
      <button
        className={`${activeBtn === "cora" && styles.active}`}
        onClick={() => setActiveShop("cora")}
      >
        Cora
      </button>
      <button
        className={`${activeBtn === "carefour" && styles.active}`}
        onClick={() => setActiveShop("carefour")}
      >
        Carefour
      </button>
      <button
        className={`${activeBtn === "other" && styles.active}`}
        onClick={() => setActiveShop("other")}
      >
        Altele
      </button>
    </div>
  );
}
