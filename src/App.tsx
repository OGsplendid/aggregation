import React from 'react';
import './App.css'
import { MonthTable } from './components/MonthTable/MonthTable';
import { YearTable } from './components/YearTable/YearTable';
import { SortTable } from './components/SortTable/SortTable';
import commonHOC from './components/CommonHOC/CommonHOC';
import { TListItem } from "./modules";

const MonthTableHOC = commonHOC(MonthTable)
const YearTableHOC = commonHOC(YearTable)
const SortTableHOC = commonHOC(SortTable)

export default class App extends React.Component {
  state = {
      list: [],
  };

  componentDidMount(): void {
    fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json')
      .then(response => response.json())
      .then(data => this.setState({list: [...data.list]}));
  }

  static parseDate (date: string) {
    const [year, month, day] = date.split('-')
    return {
        year,
        month,
        day
    }
  }

  groupByMonth (list: TListItem[]): TListItem[] {
    return list.reduce<TListItem[]>((acc, item) => {
        const getKey = ({ date }: TListItem) => {
            const _date = App.parseDate(date)

            return `${_date.month}.${_date.year}`
        }

        const key = getKey(item)

        const _item = acc.find(({ date }) => date === key)
        if (_item) {
            _item.amount += item.amount
            return acc;
        }

        acc.push({
            amount: item.amount,
            date: key
        })

        return acc; 
    }, [])
  }

  groupByYear (list: TListItem[]): TListItem[] {
    return list.reduce<TListItem[]>((acc, item) => {
        const getKey = ({ date }: TListItem) => {
            const { year } = App.parseDate(date)
            return year
        }

        const key = getKey(item)

        const _item = acc.find(({ date }) => date === key)
        if (_item) {
            _item.amount += item.amount
            return acc;
        }

        acc.push({
            amount: item.amount,
            date: key
        })

        return acc; 
    }, [])
  }

  sortList (list: TListItem[]): TListItem[] {
    // TODO: вот тут нужно добавить сортировку, учтите, .sort меняет исходный массив (если что есть .toSorted)
    return list
  }

  render() {
      const {list} = this.state;
      return (
          <div id="app">
              <MonthTableHOC mapper={this.groupByMonth} list={list} />
              <YearTableHOC mapper={this.groupByYear} list={list} />
              <SortTableHOC mapper={this.sortList} list={list} />
          </div>
      );
  }
}
