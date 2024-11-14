const Budgets = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Budget Planner</h3>
      <div className="space-y-4">
        <p className="text-gray-600">Your budgets will appear here.</p>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => alert('Button clicked!')}
        >
          Add New Budget
        </button>
      </div>
    </div>
  );
};

export default Budgets;