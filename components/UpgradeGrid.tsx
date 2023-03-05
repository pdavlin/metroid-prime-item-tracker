import { ItemCollection, ItemGrid, GameItem, ItemButton } from "./styled/CommonComponents";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

const snakeToTitleCase = (str: string) => {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

interface UpgradeGridProps {
  title: string;
  game: number;
  upgrades: string[];
  collected: string[];
  handleClick: (item: string) => void;
  oneColumn?: boolean;
  isHorizontal?: boolean;
}

const UpgradeGrid = ({
  title,
  upgrades,
  collected,
  handleClick,
  game,
  oneColumn = false,
  isHorizontal = false,
}) => {
  return (
    <ItemCollection
      columns={oneColumn ? 1 : upgrades.length % 5 === 0 ? 5 : 4}
      isHorizontal={isHorizontal}
    >
      <h2 className={inter.className}>{title}</h2>
      <ItemGrid columns={oneColumn ? 1 : upgrades.length % 5 === 0 ? 5 : 4}>
        {upgrades.map((item) => (
          <ItemButton onClick={() => handleClick(item)}>
            <GameItem
              key={`mp${game}-${item}`}
              collected={collected.includes(item)}
              src={`/prime-${game}/${item}.png`}
              title={snakeToTitleCase(item)}
            />
          </ItemButton>
        ))}
      </ItemGrid>
    </ItemCollection>
  );
};
export default UpgradeGrid;
