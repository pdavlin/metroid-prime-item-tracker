import type { AppProps } from "next/app";
import { GlobalStateProvider } from "@/hooks/useGlobalState";
import GlobalStyles from "../styles/global.styles";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalStateProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </GlobalStateProvider>
  );
}
