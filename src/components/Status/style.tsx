import styled from "styled-components";

// Define o componente de estilo para o círculo pequeno
export const SmallCircle = styled.div`
  width: 16px;
  height: 16px;
  background-color: ${(props) => props.color};
  border-radius: 50%; /* Transforma o elemento em um círculo */
`;
