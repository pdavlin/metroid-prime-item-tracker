import styled from "styled-components";

export const ArtifactContainer = styled.div`
  position: relative;
  width: 111px;
  height: 133px;
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
`;
