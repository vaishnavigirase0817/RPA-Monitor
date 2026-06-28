import PageLayout from '../components/layout/PageLayout';
import SettingsPanel from '../components/features/SettingsPanel';

export default function Settings() {
  return (
    <div className="max-w-[900px]">
      <PageLayout
        title="Settings"
        subtitle="Configure your dashboard preferences"
        className="page-section-gap"
      >
        <SettingsPanel />
      </PageLayout>
    </div>
  );
}
