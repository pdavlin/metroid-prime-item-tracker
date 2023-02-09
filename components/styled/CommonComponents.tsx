import styled from "styled-components";

export const AllItems = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ItemCollection = styled.div`
  margin: 1rem 0;
  max-height: 300px;

  h2 {
    margin-bottom: 0.5rem;
  }
`;

export const ItemGrid = styled.div<{columns?:number}>`
  display: grid;
  grid-template-columns: ${({columns}) => `repeat(${columns || 5}, auto)` } ;
  grid-gap: 0.5rem;
  max-width: 300px;
`;

export const GameItem = styled.img<{collected}>`
  max-width: 50px;
  opacity: ${({collected}) => collected ? 1 : 0.35};
`;

export const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 300px;
`;

export const CounterLabel = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

export const SubtractButton = styled.button`
  margin-left: 1rem;
`;
