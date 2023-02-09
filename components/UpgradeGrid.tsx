import { ItemCollection, ItemGrid, GameItem } from "./styled/CommonComponents";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

const snakeToTitleCase = (str: string) => {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

interface UpgradeGridProps {
  title: string
  game: number;
  upgrades: string[];
  collected: string[];
  handleClick: (item: string) => void;
}

const UpgradeGrid = ({ title, upgrades, collected, handleClick, game }) => {
  return (
    <ItemCollection>
      <h2 className={inter.className}>{title}</h2>
      <ItemGrid columns={upgrades.length % 5 === 0 ? 5 : 4}>
        {upgrades.map((item) => (
          <GameItem
            key={`mp${game}-${item}`}
            collected={collected.includes(item)}
            src={`/prime-${game}/${item}.png`}
            onClick={() => handleClick(item)}
            title={snakeToTitleCase(item)}
          />
        ))}
      </ItemGrid>
    </ItemCollection>
  );
};
export default UpgradeGrid;
