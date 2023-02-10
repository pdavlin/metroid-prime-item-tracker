import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import useGlobalState from "../hooks/useGlobalState";
import {
  CounterContainer,
  CounterLabel,
  GameItem,
  SubtractButton,
} from "./styled/CommonComponents";

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
  ["missile", "Missile"],
  ["power_bomb_pack", "Power Bomb"],
  ["missile_launcher", "Missile"],
  ["ship_missile", "Ship Missile"],
  ["energy_cell", "Energy Cell"],
]);

const ItemCounter = ({
  customItemCalculation,
  game,
  itemName,
  maxNum,
  subtractable = false,
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


  return (
    <CounterContainer>
      <GameItem
        collected={true}
        src={`/prime-${game}/${itemName}.png`}
        onClick={() => {
          collected < maxNum && setCollected(collected + 1);
        }}
      />
      <CounterLabel className={inter.className}>
        <span>
          {itemNameMap.get(itemName)}: {collected}/{maxNum}{" "}
        </span>
        <span>
          {!itemName.includes("energy") &&
            `(total: ${customItemCalculation(collected)})`}
        </span>
      </CounterLabel>
      {subtractable && (
        <SubtractButton
          className={inter.className}
          onClick={() => {
            collected > 0 && setCollected(collected - 1);
          }}
        >
          Subtract
        </SubtractButton>
      )}
    </CounterContainer>
  );
};
export default ItemCounter;
