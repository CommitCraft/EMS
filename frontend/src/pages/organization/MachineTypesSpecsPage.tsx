import { useState } from 'react';
import { CrudPage } from '../entity/CrudPage';
import { machineTypesConfig, machineSpecificationsConfig } from '../entity/entityConfigs';

const MachineTypesSpecsPage = () => {
  const [activeTab, setActiveTab] = useState<'types' | 'specs'>('types');

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <button
          onClick={() => setActiveTab('types')}
          className={`flex-1 px-4 py-3 font-medium transition-colors ${
            activeTab === 'types'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Machine Types
        </button>
        <button
          onClick={() => setActiveTab('specs')}
          className={`flex-1 px-4 py-3 font-medium transition-colors ${
            activeTab === 'specs'
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Machine Specifications
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg">
        {activeTab === 'types' && (
          <div key="machine-types">
            <CrudPage config={machineTypesConfig} />
          </div>
        )}
        {activeTab === 'specs' && (
          <div key="machine-specs">
            <CrudPage config={machineSpecificationsConfig} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MachineTypesSpecsPage;
