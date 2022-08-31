import React from "react";
import {
  Conteiner,
  Header,
  Title,
  Content,
  Amount,
  Icon,
  LastTransaction
} from "./styles";


interface Props {
  title: string;
  amount: string;
  lastTransaction: string;
  type: 'up' | 'down' | 'total';
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign'
}


export function HighlightCard({ title, amount, lastTransaction, type }: Props) {
  return (
    <Conteiner type={type}>

      <Header>
        <Title type={type} >{title}</Title>
        <Icon
          name={icon[type]}
          type={type}
        />
      </Header>

      <Content>
        <Amount type={type} >
          {amount}
        </Amount>
        <LastTransaction type={type}>
          {lastTransaction}
        </LastTransaction>
      </Content>

    </Conteiner>
  )
}