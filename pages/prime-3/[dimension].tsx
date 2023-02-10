import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import ItemCounter from "@/components/ItemCounter";
import useGlobalState, { initialState } from "@/hooks/useGlobalState";
import { use, useEffect, useState } from "react";
import {
  AllItems,
  ExpansionCollection,
  GameItem,
  ItemCollection,
  ItemGrid,
} from "../../components/styled/CommonComponents";
import UpgradeGrid from "../../components/UpgradeGrid";
import ResetButton from "../../components/ResetButton";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

const upgrades = [
  "missile_launcher",
  "grapple_lasso",
  "ped_suit",
  "grapple_swing",
  "ice_missile",
  "ship_missile",
  "boost_ball",
  "plasma_beam",
  "screw_attack",
  "ship_grapple_beam",
  "seeker_launcher",
  "xray_visor",
  "grapple_voltage",
  "spider_ball",
  "hazard_shield",
  "nova_beam",
];

const hypermodeUpgrades = [
  "hypermode",
  "hyper_ball",
  "hyper_missile",
  "hyper_grapple",
];

const expansions = [
  {
    name: "energy_tank",
    max: 14,
    multiplier: 1,
  },
  {
    name: "missile_launcher",
    max: 50,
    multiplier: 5,
  },
  {
    name: "ship_missile",
    max: 8,
    multiplier: 1,
  },
  {
    name: "energy_cell",
    max: 9,
    multiplier: 1,
  },
];

export default function Home() {
  const [state, dispatch] = useGlobalState();
  const [collected, setCollected] = useState(state.prime3.collected);
  const router = useRouter();
  const { dimension } = router.query;
  console.log(dimension);

  useEffect(() => {
    if (typeof localStorage.getItem("prime3") === "string") {
      setCollected(
        JSON.parse(localStorage.getItem("prime3") as string).collected
      );
    }
  }, []);

  useEffect(() => {
    dispatch((state) => {
      state.prime3.collected = collected;
    });
  }, [collected]);

  useEffect(() => {
    if (JSON.stringify(state) !== JSON.stringify(initialState)) {
      console.log("changing local storage");
      localStorage.setItem("prime3", JSON.stringify(state.prime3));
    }
  }, [state.prime3]);

  const getExpansionCalculation = (name: string) => {
    switch (name) {
      case "missile_launcher":
        return (collected: number) =>
          collected * 5 +
          (state.prime3.collected.includes("missile_launcher") ? 5 : 0);
      case "ship_missile":
        return (collected: number) =>
          collected * 5 +
          (state.prime3.collected.includes("ship_missile") ? 3 : 0);
      default: 
        return (collected: number) => collected;
    }
  };

  return (
    <>
      <Head>
        <title>Metroid Prime 3 Item Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <AllItems isHorizontal={(dimension as string)?.includes("horizontal")}>
          <UpgradeGrid
            title="Normal Items"
            game={3}
            upgrades={upgrades}
            collected={collected}
            handleClick={(item) => {
              if (collected.includes(item))
                setCollected(collected.filter((i) => i !== item));
              else setCollected([...collected, item]);
            }}
            isHorizontal={(dimension as string)?.includes("horizontal")}
          />
          <UpgradeGrid
            title="Hyper Items"
            game={3}
            upgrades={hypermodeUpgrades}
            collected={collected}
            oneColumn={(dimension as string)?.includes("horizontal")}
            handleClick={(item) => {
              if (collected.includes(item))
                setCollected(collected.filter((i) => i !== item));
              else setCollected([...collected, item]);
            }}
            isHorizontal={(dimension as string)?.includes("horizontal")}
          />
          <ExpansionCollection isHorizontal={(dimension as string)?.includes("horizontal")}>
            <h2 className={inter.className}>Expansions</h2>
            {expansions.map(({ name, max }) => (
              <ItemCounter
                itemName={name}
                maxNum={max}
                game={3}
                customItemCalculation={getExpansionCalculation(name)}
              ></ItemCounter>
            ))}
          </ExpansionCollection>
        </AllItems>
        <ResetButton
          game={3}
          handleClick={() => {
            setCollected(["initial"]);
          }}
        />
      </main>
    </>
  );
}
