import styled from "styled-components";
import { ItemCollection } from "./CommonComponents";

export const ArtifactContainer = styled(ItemCollection)`
  max-width: 240px;
  h2 {
    text-align: ${({ isHorizontal }) => (isHorizontal ? "center" : "left")};
  }
`;

export const ArtifactWrapper = styled.div`
  height: 133px;
  margin-top: 0.5rem;
  position: relative;
  width: 111px;
`;

export const Artifact = styled.div<{
  artifactName: string;
  dimensions: number[];
  collected: boolean;
}>`
  position: absolute;
  left: ${({ dimensions }) => dimensions[0]}px;
  top: ${({ dimensions }) => dimensions[1]}px;
  width: ${({ dimensions }) => dimensions[2]}px;
  height: ${({ dimensions }) => dimensions[3]}px;
  background-image: ${({ artifactName, collected }) =>
    `url(/prime-1/${artifactName}${collected ? "_c" : "_u"}.png)`};
    cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(1.1);
    border: none;
    outline: none;
  }
`;
