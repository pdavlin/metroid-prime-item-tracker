import { createContext, use, useContext, useEffect } from "react";
import { Updater, useImmer } from "use-immer";

export const initialState = {
  prime1: {
    collected: ["initial"],
    energy_tank: 0,
    missile: 0,
    power_bomb_pack: 0,
  },
  prime3: {
    collected: ["morph_ball"],
    energy_tank: 0,
    missile_launcher: 0,
    ship_missile: 0,
    energy_cell: 0,
  }
};

type GlobalState = {
  prime1: {
    collected: string[];
    energy_tank: number;
    missile: number;
    power_bomb_pack: number;
  };
  prime3: {
    collected: string[];
    energy_tank: number;
    missile_launcher: number;
    ship_missile: number;
    energy_cell: number;
  };
};

const GlobalStateContext = createContext(initialState);
const GlobalStateDispatchContext = createContext<
  Updater<GlobalState> | undefined
>(undefined);

export function GlobalStateProvider({ children, ...appProps }) {
  const [state, dispatch] = useImmer<GlobalState>(initialState);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prime1State = localStorage.getItem("prime1");
      if (prime1State) {
        dispatch((state) => {
          Object.assign(state.prime1, JSON.parse(prime1State));
        });
      }
      const prime3State = localStorage.getItem("prime3");
      if (prime3State) {
        dispatch((state) => {
          Object.assign(state.prime3, JSON.parse(prime3State));
        });
      }
    }
  }, []);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalStateDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalStateDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
}

function useGlobalStateContext() {
  const context = useContext(GlobalStateContext);
  return context;
}

function useGlobalStateDispatch() {
  const context = useContext(GlobalStateDispatchContext);
  if (!context) {
    throw new Error(
      "useGlobalStateDispatch must be used within a GlobalStateProvider"
    );
  }
  return context;
}

export default function useGlobalState(): [GlobalState, Updater<GlobalState>] {
  return [useGlobalStateContext(), useGlobalStateDispatch()];
}
