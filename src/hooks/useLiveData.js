import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { dataStream } from '../data/dataStream';

/**
 * Custom hook that connects to the high-performance dataStream.
 * Handles pause/resume and minimizes re-renders using ref tracking for unmounted states.
 */
export function useLiveData() {
  const [data, setData] = useState(dataStream.data);
  const [isPaused, setIsPaused] = useState(!dataStream.isRunning);

  useEffect(() => {
    // Subscriber callback
    const handleData = (newData) => {
      // Only set state if not manually paused from this hook instance, though dataStream.pause() stops it globally.
      setData(newData);
    };

    // Subscribe to the stream
    const unsubscribe = dataStream.subscribe(handleData);

    // Sync paused state on mount
    setIsPaused(!dataStream.isRunning);

    return () => {
      unsubscribe();
    };
  }, []);

  const togglePause = useCallback(() => {
    if (dataStream.isRunning) {
      dataStream.pause();
      setIsPaused(true);
    } else {
      dataStream.start();
      setIsPaused(false);
    }
  }, []);

  // Compute KPIs from the massive dataset, memoized to prevent re-renders in child components
  const kpis = useMemo(() => [
    { id: 'kpi-1', title: 'Total Bots', value: data.length, unit: '', icon: '🤖', color: 'var(--info)' },
    { id: 'kpi-2', title: 'Running Bots', value: data.filter(d => d.status === 'Running').length, unit: '', icon: '⚡', color: 'var(--success)' },
    { id: 'kpi-3', title: 'Failed Bots', value: data.filter(d => d.status === 'Failed').length, unit: '', icon: '❌', color: 'var(--error)' },
    { id: 'kpi-4', title: 'Completed Tasks', value: data.filter(d => d.status === 'Completed').length, unit: '', icon: '✅', color: 'var(--primary-300)' },
    { id: 'kpi-5', title: 'CPU Usage', value: Math.round(data.reduce((acc, d) => acc + d.cpu, 0) / (data.length || 1)), unit: '%', icon: '💻', color: 'var(--warning)' },
    { id: 'kpi-6', title: 'Memory Usage', value: Math.round(data.reduce((acc, d) => acc + d.memory, 0) / 1024), unit: 'GB', icon: '🧠', color: 'var(--primary-200)' },
    { id: 'kpi-7', title: 'Avg Runtime', value: Math.round(data.reduce((acc, d) => acc + d.duration, 0) / (data.length || 1)), unit: 'min', icon: '⏱️', color: 'var(--warm-gray-200)' },
    { id: 'kpi-8', title: 'Revenue', value: data.reduce((acc, d) => acc + d.revenue, 0), unit: 'USD', icon: '💰', color: 'var(--success)' },
  ], [data]);

  return {
    data,
    kpis,
    isPaused,
    togglePause
  };
}
