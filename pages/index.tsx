import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import ItemCounter from "@/components/ItemCounter";
import useGlobalState, { initialState } from "@/hooks/useGlobalState";
import { use, useEffect, useState } from "react";

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
  //ball upgrades
  "morph",
  "boost",
  "spider",
  "bomb",
  "space_jump",

  //beam upgrades
  "varia",
  "gravity",
  "phazon",
  "power_bomb",
  "grapple",

  //suits
  "charge",
  "wave",
  "ice",
  "plasma",
  "thermal",

  //visors
  "super_missile",
  "wavebuster",
  "ice_spreader",
  "flamethrower",
  "xray",
];

const snakeToTitleCase = (str: string) => {
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function Home() {
  const [state, dispatch] = useGlobalState();
  const [collected, setCollected] = useState(state.collected);

  useEffect(() => {
    if (typeof localStorage.getItem("progress") === "string") {
      setCollected(
        JSON.parse(localStorage.getItem("progress") as string).collected
      );
    }
  }, []);

  useEffect(() => {
    dispatch((state) => {
      state.collected = collected;
    });
  }, [collected]);

  useEffect(() => {
    console.log("state changed", state);
    if (JSON.stringify(state) !== JSON.stringify(initialState)) {
      console.log("changing local storage");
      localStorage.setItem("progress", JSON.stringify(state));
    }
  }, [state]);

  return (
    <>
      <Head>
        <title>Metroid Prime 3 Item Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.allitems}>
          <div className={styles.collection}>
          <h2 className={`${styles.collectionheader} ${inter.className}`}>Artifacts</h2>
            <div className={styles.artifactcontainer}>
              {Object.entries(artifacts).map(
                ([artifactName, artifactLocations]) => (
                  <div
                    style={{
                      position: "absolute",
                      left: artifactLocations[0],
                      top: artifactLocations[1],
                      width: artifactLocations[2],
                      height: artifactLocations[3],
                      backgroundImage: `url(/icons/artifacts/${artifactName}_${
                        collected.includes(artifactName) ? "c" : "u"
                      }.png)`,
                    }}
                    onClick={() => {
                      if (collected.includes(artifactName))
                        setCollected(
                          collected.filter((i) => i !== artifactName)
                        );
                      else setCollected([...collected, artifactName]);
                    }}
                    title={snakeToTitleCase(artifactName)}
                  ></div>
                )
              )}
            </div>
          </div>
          <div className={styles.collection}>
            <h2 className={`${styles.collectionheader} ${inter.className}`}>Normal Items</h2>
            <div className={styles.grid}>
              {upgrades.map((item) => (
                <img
                  className={`${styles.mpitem} ${
                    collected.includes(item) ? styles.collected : ""
                  }`}
                  key={`hyper-${item}`}
                  src={`/icons/items/${item}.png`}
                  onClick={() => {
                    if (collected.includes(item))
                      setCollected(collected.filter((i) => i !== item));
                    else setCollected([...collected, item]);
                  }}
                  title={snakeToTitleCase(item)}
                />
              ))}
            </div>
          </div>
          <div className={styles.collection}>
            <h2 className={`${styles.collectionheader} ${inter.className}`}>Expansions</h2>
            {[
              { name: "energy_tank", max: 14 },
              { name: "missile", max: 50 },
              { name: "power_bomb_pack", max: 4 },
            ].map(({ name, max }) => (
              <ItemCounter itemName={name} maxNum={max}></ItemCounter>
            ))}
          </div>
        </div>
        <br />
        <br />
        <button
          onClick={() => {
            console.log(JSON.parse(JSON.stringify(initialState)));
            dispatch((state) => {
              state.collected = ["morph_ball"];
              state.energy_tank = 0;
              state.missile = 0;
              state.power_bomb_pack = 0;
            });
            setCollected(["morph_ball"]);
            localStorage.setItem("progress", JSON.stringify(initialState));
          }}
        >
          Reset
        </button>
      </main>
    </>
  );
}
