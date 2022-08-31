import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import {
  Conteiner,
  Header,
  UserWrapper,
  UseInfo,
  Photo,
  User,
  UserGretting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList
} from "./styles";



export interface DataListProps extends TransactionCardProps {
  id: string;
}


export function Dashboard() {
  const data : DataListProps[] = [{
    id: "1",
    type: 'positive',
    title: "Desenvolvimento de Site",
    amount: "R$ 17.400,00",
    category: {
      name: 'Vendas',
      icon: 'dollar-sign'
    },
    date: "16-04-2022",
  }, 
  {
    id: "2",
    type: 'negative',
    title: "Hamburguer Delivery",
    amount: "R$ 400,00",
    category: {
      name: 'Alimentação',
      icon: 'coffee'
    },
    date: "12-04-2022",
  }, 
  {
    id: "3",
    type: 'negative',
    title: "Aluguel",
    amount: "R$ 1.200,00",
    category: {
      name: 'Casa',
      icon: 'shopping-bag'
    },
    date: "12-04-2022",
  }

];

  return (
    <Conteiner>
      <Header >
        <UserWrapper>
          <UseInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/27297830?v=4' }} />
            <User>
              <UserGretting>Olá, </UserGretting>
              <UserName>Deyvison</UserName>
            </User>
          </UseInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada foi dia 13 de abril"
          type='up'
        />
        <HighlightCard
          title="Saidas"
          amount="R$ 2.400,00"
          lastTransaction="Última saída foi dia 16 de abril"
          type='down'
        />
        <HighlightCard
          title="Total"
          amount="R$ 15.000,00"
          lastTransaction="teste"
          type='total'
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={ ({ item } ) => <TransactionCard data={item} /> }
        />
      </Transactions>

    </Conteiner>
  )
}
