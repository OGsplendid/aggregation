import React from 'react';
import './App.css'
// import { MonthTable } from './components/MonthTable/MonthTable';
import { YearTable } from './components/YearTable/YearTable';
import { SortTable } from './components/SortTable/SortTable';
// import { TListItem } from './modules';
import { MonthTableHOC } from './components/CommonHOC/CommonHOC';

export default class App extends React.Component {
  state = {
      list: [],
  };

  componentDidMount(): void {
    fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hoc/aggregation/data/data.json')
      .then(response => response.json())
      .then(data => this.setState({list: [...data.list]}));
  }

  render() {
      const {list} = this.state;
      return (
          <div id="app">
              <MonthTableHOC list={list} />
              <YearTable list={list} />
              <SortTable list={list} />
          </div>
      );
  }
}
