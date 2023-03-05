import styled from "styled-components";

export const ItemButton = styled.button`
  background: transparent;
  border: 1px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  &:hover {
    transform: scale(1.1);
    background-color: lighten(var(--background-start-rgb), 20%);
  }
  &:focus {
    transform: scale(1.1);
    background-color: lighten(var(--background-start-rgb), 20%);
  }
  &:focus:not(:focus-visible) {
    border: none;
    transform: none;
  }
`;

export const AllItems = styled.div<{ isHorizontal: boolean }>`
  display: flex;
  flex-direction: ${({ isHorizontal }) => (isHorizontal ? "row" : "column")};
  > div {
    margin: ${({ isHorizontal }) =>
      isHorizontal ? "0 1.5rem 0 0 " : "1rem 0"};
  }
`;

export const ItemCollection = styled.div<{
  columns?: number;
  isHorizontal: boolean;
}>`
  align-content: ${({ isHorizontal }) => isHorizontal && "center"};
  align-items: ${({ isHorizontal }) => isHorizontal && "center"};

  display: flex;
  flex-direction: column;
  max-height: 300px;
  max-width: 300px;
  h2 {
    text-align: ${({ isHorizontal }) => (isHorizontal ? "center" : "left")};
    margin-bottom: 0.5rem;
  }
`;

export const ExpansionCollection = styled.div<{ isHorizontal: boolean }>`
  max-height: 300px;
  display: flex;
  flex-direction: column;
  max-width: 300px;

  h2 {
    text-align: ${({ isHorizontal }) => (isHorizontal ? "center" : "left")};
    margin-bottom: 0.5rem;
  }
`;

export const ItemGrid = styled.div<{ columns?: number }>`
  flex: 0 auto;
  display: grid;
  grid-template-columns: ${({ columns }) => `repeat(${columns || 5}, auto)`};
  grid-gap: 0.5rem;
  max-width: ${({ columns }) => `${(columns || 5) * 50}px`};
`;

export const GameItem = styled.img<{ collected }>`
  max-width: 50px;
  opacity: ${({ collected }) => (collected ? 1 : 0.35)};
`;

export const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 300px;
  margin-bottom: 0.5rem;
`;

export const CounterLabel = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

export const SubtractButton = styled.button`
  margin-left: 1rem;
`;
