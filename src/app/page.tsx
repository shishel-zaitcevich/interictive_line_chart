import DATA from '@/data/data.json';
import { ChartData } from '@/shared/types';
import { TestChart } from '@/widgets/ABTestChart/TestChart';

export default function Home() {
  return <TestChart data={DATA as ChartData} />;
}
