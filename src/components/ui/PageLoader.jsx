import { SkeletonCard } from './Skeleton';

export default function PageLoader() {
  return (
    <div className="w-full h-full flex flex-col gap-6 p-6 max-w-7xl mx-auto animate-fade-in-page">
      <div className="flex gap-4">
        <SkeletonCard className="flex-1 h-32" />
        <SkeletonCard className="flex-1 h-32" />
        <SkeletonCard className="flex-1 h-32" />
      </div>
      <SkeletonCard className="w-full h-64" />
      <SkeletonCard className="w-full h-96" />
    </div>
  );
}
