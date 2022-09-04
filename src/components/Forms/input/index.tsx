import React from "react";
import { TextInputProps } from "react-native";

import { Conteiner } from "./styles";

type Props = TextInputProps;

export function Input({...rest}: Props) {
  return (
    <Conteiner {...rest} />
  )
}