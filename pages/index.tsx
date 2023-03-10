import Head from "next/head";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {


  return (
    <>
      <Head>
        <title>Metroid Prime 3 Item Tracker</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2 className={inter.className}>Metroid Prime Item Trackers</h2>
      </main>
    </>
  );
}
