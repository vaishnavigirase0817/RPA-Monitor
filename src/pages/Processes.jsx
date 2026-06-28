import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import ProcessTable from '../components/dashboard/ProcessTable';
import { PROCESSES } from '../data/mockData';

export default function Processes() {
  const [processes] = useState(PROCESSES);

  return (
    <PageLayout
      title="Processes"
      subtitle="Monitor and manage all RPA processes"
      className="page-section-gap"
    >
      <ProcessTable processes={processes} />
    </PageLayout>
  );
}
