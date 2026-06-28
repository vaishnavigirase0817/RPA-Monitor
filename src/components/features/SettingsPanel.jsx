import { useState } from 'react';
import { SETTINGS_SECTIONS } from '../../data/mockData';
import Toggle from '../ui/Toggle';
import Card from '../ui/Card';
import { useToast } from '../ui/ToastContext';

export default function SettingsPanel() {
  const { addToast } = useToast();
  const [settings, setSettings] = useState(() => {
    const flat = {};
    SETTINGS_SECTIONS.forEach(section => {
      section.settings.forEach(s => { flat[s.id] = s.value; });
    });
    return flat;
  });

  const handleToggle = (id, val, label) => {
    setSettings(prev => ({ ...prev, [id]: val }));
    addToast({
      title: 'Setting Updated',
      message: `${label} has been ${val ? 'enabled' : 'disabled'}.`,
      type: val ? 'success' : 'info'
    });
  };

  return (
    <div className="space-y-6">
      {SETTINGS_SECTIONS.map(section => (
        <Card key={section.id} glass>
          <h3 className="text-base font-semibold text-[var(--warm-gray-300)] mb-4">{section.title}</h3>
          <div className="space-y-4">
            {section.settings.map(setting => (
              <Toggle
                key={setting.id}
                id={setting.id}
                label={setting.label}
                description={setting.description}
                checked={settings[setting.id]}
                onChange={(val) => handleToggle(setting.id, val, setting.label)}
              />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
