import styles from "@/styles/Home.module.css";
import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import useGlobalState from "../hooks/useGlobalState";

const inter = Inter({ subsets: ["latin"] });

interface ItemCounterProps {
  itemName: string;
  maxNum: number;
}

const itemNameMap = new Map<string, string>([
  ["energy_tank", "Energy Tank"],
  ["missile", "Missile Expansion"],
  ["power_bomb_pack", "Power Bomb Expansion"],
]);

const ItemCounter = ({ itemName, maxNum }: ItemCounterProps) => {
  const [state, dispatch] = useGlobalState();
  const [collected, setCollected] = useState(state[itemName]);

  useEffect(() => {
    if (typeof localStorage.getItem("progress") === "string") {
      setCollected(
        JSON.parse(localStorage.getItem("progress") as string)[itemName]
      );
    }
  }, []);

  useEffect(() => {
    console.log(`${itemName} changed to ${state[itemName]}`);
    setCollected(state[itemName]);
  }, [state[itemName]]);

  useEffect(() => {
    dispatch((state) => {
      state[itemName] = collected;
    });
  }, [collected]);

  const calculateItemTotal = (itemName: string) => {
    if (itemName === "missile") {
      return state["missile"] * 5;
    } else if (itemName === "power_bomb_pack") {
      return state["power_bomb_pack"] * 1;
    }
  };

  return (
    <div className={styles.countercontainer}>
      <img
        className={`${styles.mpitem} ${styles.collected}`}
        src={`/icons/items/${itemName}.png`}
        onClick={() => {
          collected < maxNum && setCollected(collected + 1);
        }}
      />
      <div className={`${inter.className} ${styles.counterlabel}`}>
        <span>
          {itemNameMap.get(itemName)}: {collected}/{maxNum}{" "}
        </span>
        <span>
          {!itemName.includes("energy") &&
            `(total: ${calculateItemTotal(itemName)})`}
        </span>
      </div>
    </div>
  );
};
export default ItemCounter;
