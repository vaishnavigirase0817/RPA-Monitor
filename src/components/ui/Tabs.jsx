import { useState } from 'react';

export default function Tabs({ tabs, defaultTab, onChange, className = '' }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <div className={className}>
      {/* Tab header */}
      <div className="flex gap-1 p-1 rounded-lg bg-[var(--light-beige)]/60" role="tablist" aria-label="Tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => handleTabChange(tab.id)}
            className={`
              flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
              ${activeTab === tab.id
                ? 'bg-white text-[var(--primary-300)] shadow-sm'
                : 'text-[var(--warm-gray-200)] hover:text-[var(--warm-gray-300)]'
              }
            `.trim()}
          >
            {tab.icon && <span className="mr-1.5">{tab.icon}</span>}
            {tab.label}
            {tab.count !== undefined && (
              <span className={`ml-1.5 px-1.5 py-0.5 text-[10px] rounded-full ${
                activeTab === tab.id ? 'bg-[var(--primary-100)] text-[var(--primary-300)]' : 'bg-[var(--warm-gray-100)]/30 text-[var(--warm-gray-200)]'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab panel */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className="mt-4"
      >
        {activeTabData?.content}
      </div>
    </div>
  );
}
