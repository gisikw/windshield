import React from 'react';
import axios from 'axios';
import { fromJS } from 'immutable';
import NutritionChart from './components/NutritionChart';

const POLLING_INTERVAL = 5000;
const styles = {
  container: { textAlign: 'center' },
  nutrition: { margin: '0 auto' },
};

class App extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = { data: fromJS({}) };
  }

  componentDidMount() {
    this.fetchData();
    setInterval(() => this.fetchData(), POLLING_INTERVAL);
  }

  shouldComponentUpdate(_, state) {
    return !state.data.equals(this.state.data);
  }

  fetchData() {
    axios.get('./data.json')
         .then(({ data }) => this.setState({ data: fromJS(data) }))
  }

  render() {
    const { nutrition } = this.state.data.toJS();
    return (
      <div style={styles.container}>
        <h1>Health Windshield</h1>
        <NutritionChart style={styles.nutrition} data={nutrition} width={800} height={400} />
      </div>
    );
  }
}

export default App;
