import styled from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Conteiner = styled(TextInput)`
  width: 100%;
  padding : 16px 18px;
  font-size: ${RFValue(14)}px;
  background: ${( { theme }) => theme.colors.shape};
  border-radius: 5px;
  margin-bottom: 8px ;
  font-family: ${ ( { theme } ) => theme.fonts.regular};
  color : ${ ( { theme } ) => theme.colors.text_dark};
`;