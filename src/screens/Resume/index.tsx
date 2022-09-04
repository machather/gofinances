import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VictoryPie } from 'victory-native';
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from 'styled-components/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { addMonths, subMonths } from 'date-fns';
import { ActivityIndicator } from "react-native";

import { HistoryCard } from "../../components/HistoryCard";


import {
  Conteiner,
  Header,
  Title,
  Content,
  ChartConteiner,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer
} from "./styles";
import { categories } from "../../utils/categories";
import { useAuth } from "../../hooks/auth";

export interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryDate {
  key: string;
  name: string,
  total: number,
  totalFormatted: string,
  color: string,
  percent: string
}

export function Resume() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryDate[]>([]);

  const theme = useTheme();
  const { user } = useAuth();

  function handleDateChange(action: 'next' | 'prev') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadDate() {
    setIsLoading(true);
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const expensives = transactions.filter((expensive: TransactionData) =>
      expensive.type == 'negative' &&
      new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
      new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives.reduce(
      (acumullator: number, expensive: TransactionData) => {
        return acumullator + Number(expensive.amount);
      }, 0);

    const totalByCategory: CategoryDate[] = [];

    categories.forEach(category => {
      let categorySum = 0;
      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category == category.key) {
          categorySum += Number(expensive.amount);
        }
      });
      if (categorySum > 0) {
        const totalFormatted = categorySum
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          totalFormatted,
          color: category.color,
          percent
        });
      }

    })
    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadDate();
  }, [selectedDate]));

  return (
    <Conteiner>
      <Header>
        <Title>Resumo por Categoria</Title>
      </Header>
      {
        isLoading ?
          <LoadContainer>
            <ActivityIndicator color={theme.colors.primary}
              size='large'
            />
          </LoadContainer>
          :

          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: useBottomTabBarHeight(),
            }}
          >
            <MonthSelect>
              <MonthSelectButton onPress={() => handleDateChange('prev')}>
                <MonthSelectIcon name="chevron-left" />
              </MonthSelectButton>

              <Month>{selectedDate.toLocaleString('pt-BR', { month: 'long' }).toUpperCase() + ' ' + selectedDate.getFullYear()}</Month>

              <MonthSelectButton onPress={() => handleDateChange('next')}>
                <MonthSelectIcon name="chevron-right" />
              </MonthSelectButton>
            </MonthSelect>

            <ChartConteiner>
              <VictoryPie
                data={totalByCategories}
                colorScale={totalByCategories.map(category => category.color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colors.shape
                  }
                }}
                labelRadius={80}
                x="percent"
                y="total"
              />
            </ChartConteiner>
            {
              totalByCategories.map((category: CategoryDate) => (
                <HistoryCard key={category.key} title={category.name} amount={category.totalFormatted} color={category.color} />
              )
              )
            }
          </Content>
      }
    </Conteiner>
  )
}