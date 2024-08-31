import { FC } from 'react';
import Overview from './Overview';
import Expenses from './Expenses';
import Income from './Income';
import Budgets from './Budgets';
import Investments from './Investments';

interface DashboardProps {
  activeSection: string;
}

const Dashboard: FC<DashboardProps> = ({ activeSection }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">
        {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
      </h2>
      {activeSection === 'overview' && <Overview />}
      {activeSection === 'expenses' && <Expenses />}
      {activeSection === 'income' && <Income />}
      {activeSection === 'budgets' && <Budgets />}
      {activeSection === 'investments' && <Investments />}
    </div>
  );
};

export default Dashboard;