import { FC } from 'react';

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const sections = ['overview', 'expenses', 'income', 'budgets', 'investments'];

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Finance Tracker</h1>
      </div>
      <nav>
        <ul>
          {sections.map((section) => (
            <li key={section}>
              <button
                className={`w-full text-left p-4 ${
                  activeSection === section ? 'bg-blue-100 text-blue-600' : ''
                }`}
                onClick={() => setActiveSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;