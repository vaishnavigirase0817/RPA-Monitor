import KPICard from './KPICard';

export default function KPIGrid({ kpis }) {
  return (
    <section aria-label="Key Performance Indicators" className="stagger-children">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-6">
        {kpis.map(kpi => (
          <KPICard key={kpi.id} {...kpi} />
        ))}
      </div>
    </section>
  );
}
