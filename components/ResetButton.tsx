import useGlobalState, { initialState } from "@/hooks/useGlobalState";

interface ResetButtonProps {
  game: number;
  handleClick: () => void;
}

const ResetButton = ({ game, handleClick }: ResetButtonProps) => {
  const [state, dispatch] = useGlobalState();
  return (
    <button
      onClick={() => {
        dispatch((state) => {
          if (game === 1) {
            state.prime1.collected = ["initial"];
            state.prime1.energy_tank = 0;
            state.prime1.missile = 0;
            state.prime1.power_bomb_pack = 0;
          }
          if (game === 3) {
            state.prime3.collected = ["morph_ball"];
            state.prime3.energy_tank = 0;
            state.prime3.missile_launcher = 0;
            state.prime3.ship_missile = 0;
            state.prime3.energy_cell = 0;
          }
        });
        handleClick();
        localStorage.setItem(
          `prime${game}`,
          JSON.stringify(initialState[`prime${game}`])
        );
      }}
    >
      Reset
    </button>
  );
};

export default ResetButton;
