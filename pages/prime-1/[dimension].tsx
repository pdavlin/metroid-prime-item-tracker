import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import ItemCounter from "@/components/ItemCounter";
import useGlobalState, { initialState } from "@/hooks/useGlobalState";
import { use, useEffect, useState } from "react";
import {
  AllItems,
  GameItem,
  ItemCollection,
  ItemGrid,
} from "../../components/styled/CommonComponents";
import {
  Artifact,
  ArtifactContainer,
} from "../../components/styled/Prime1Components";
import ResetButton from "../../components/ResetButton";
import UpgradeGrid from "../../components/UpgradeGrid";

const inter = Inter({ subsets: ["latin"] });

const artifacts = {
  chozo: [40, 0, 48, 49],
  nature: [2, 37, 40, 30],
  world: [0, 68, 33, 26],
  newborn: [26, 88, 35, 41],
  spirit: [68, 81, 43, 52],
  sun: [88, 53, 14, 28],
  life_giver: [52, 76, 13, 19],
  truth: [64, 56, 18, 16],
  wild: [37, 53, 19, 18],
  warrior: [44, 72, 12, 10],
  strength: [51, 50, 17, 15],
  elder: [63, 72, 16, 16],
};

const upgrades = [
  "morph",
  "boost",
  "spider",
  "bomb",
  "space_jump",
  "varia",
  "gravity",
  "phazon",
  "power_bomb",
  "grapple",
  "charge",
  "wave",
  "ice",
  "plasma",
  "thermal",
  "super_missile",
  "wavebuster",
  "ice_spreader",
  "flamethrower",
  "xray",
];

const expansions = [
  { name: "energy_tank", max: 14, multiplier: 1 },
  { name: "missile", max: 50, multiplier: 5 },
  { name: "power_bomb_pack", max: 4, multiplier: 1 },
];

const snakeToTitleCase = (str: string) => {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function Prime1Tracker() {
  const [state, dispatch] = useGlobalState();
  const [collected, setCollected] = useState(state.prime1.collected);

  useEffect(() => {
    if (typeof localStorage.getItem("prime1") === "string") {
      setCollected(
        JSON.parse(localStorage.getItem("prime1") as string).collected
      );
    }
  }, []);

  useEffect(() => {
    dispatch((state) => {
      state.prime1.collected = collected;
    });
  }, [collected]);

  useEffect(() => {
    if (JSON.stringify(state) !== JSON.stringify(initialState)) {
      console.log("changing local storage");
      localStorage.setItem("prime1", JSON.stringify(state.prime1));
    }
  }, [state.prime1]);

  return (
    <>
      <Head>
        <title>Metroid Prime Item Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <AllItems>
          <ItemCollection>
            <h2 className={inter.className}>Artifacts</h2>
            <ArtifactContainer>
              {Object.entries(artifacts).map(
                ([artifactName, artifactLocations]) => (
                  <Artifact
                    key={`artifact-${artifactName}`}
                    artifactName={artifactName}
                    dimensions={artifactLocations}
                    collected={collected.includes(artifactName)}
                    onClick={() => {
                      if (collected.includes(artifactName))
                        setCollected(
                          collected.filter((i) => i !== artifactName)
                        );
                      else setCollected([...collected, artifactName]);
                    }}
                    title={snakeToTitleCase(artifactName)}
                  />
                )
              )}
            </ArtifactContainer>
          </ItemCollection>
          <UpgradeGrid
            title="Items"
            game={1}
            upgrades={upgrades}
            collected={collected}
            handleClick={(item) => {
              if (collected.includes(item))
                setCollected(collected.filter((i) => i !== item));
              else setCollected([...collected, item]);
            }}
          />
          <ItemCollection>
            <h2 className={inter.className}>Expansions</h2>
            {expansions.map(({ name, max, multiplier }) => (
              <ItemCounter
                itemName={name}
                maxNum={max}
                game={1}
                key={`mp1-${name}`}
                customItemCalculation={(collected) => collected * multiplier}
              ></ItemCounter>
            ))}
          </ItemCollection>
        </AllItems>
        <ResetButton
          game={1}
          handleClick={() => {
            setCollected(["initial"]);
          }}
        />
      </main>
    </>
  );
}
