import './App.css';
import type { ChartData } from './shared/types';
import { TestChart } from './widgets/ABTestChart/TestChart';
import DATA from '../src/data/data.json';

function App() {
  return <TestChart data={DATA as ChartData} />;
}

export default App;
