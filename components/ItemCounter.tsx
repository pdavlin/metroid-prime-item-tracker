import styles from "@/styles/Home.module.css";
import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import useGlobalState from "../hooks/useGlobalState";

const inter = Inter({ subsets: ["latin"] });

interface ItemCounterProps {
  itemName: string;
  maxNum: number;
  game: number;
  subtractable?: boolean;
  customItemCalculation: (collected: number) => number;
}

const itemNameMap = new Map<string, string>([
  ["energy_tank", "Energy Tank"],
  ["missile", "Missile Expansion"],
  ["power_bomb_pack", "Power Bomb Expansion"],
  ["missile_launcher", "Missile Expansion"],
  ["ship_missile", "Ship Missile Expansion"],
  ["energy_cell", "Energy Cell"],
]);

const ItemCounter = ({
  customItemCalculation,
  game,
  itemName,
  maxNum,
  subtractable = false
}: ItemCounterProps) => {
  const [state, dispatch] = useGlobalState();
  const [collected, setCollected] = useState(state[`prime${game}`][itemName]);

  useEffect(() => {
    console.log(`${itemName} changed to ${state[itemName]}`);
    setCollected(state[`prime${game}`][itemName]);
  }, [state[`prime${game}`][itemName]]);

  useEffect(() => {
    dispatch((state) => {
      state[`prime${game}`][itemName] = collected;
    });
  }, [collected]);

  const calculateItemTotal = (collected, multiplier) => collected * multiplier;

  return (
    <div className={styles.countercontainer}>
      <img
        className={`${styles.mpitem} ${styles.collected}`}
        src={`/prime-${game}/${itemName}.png`}
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
            `(total: ${customItemCalculation(collected)})`}
        </span>
      </div>
      {subtractable && (
        <button
          className={`${inter.className} ${styles.subtractbutton}`}
          onClick={() => {
            collected > 0 && setCollected(collected - 1);
          }}
        >
          Subtract
        </button>
      )}
    </div>
  );
};
export default ItemCounter;
