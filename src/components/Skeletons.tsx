import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function SummaryCardSkeleton() {
  return (
    <Card className="p-5">
      <Skeleton className="h-4 w-24 mb-3" />
      <Skeleton className="h-8 w-32 mb-2" />
      <Skeleton className="h-3 w-20" />
    </Card>
  );
}

export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <Card className={`p-6 ${className || ""}`}>
      <Skeleton className="h-5 w-40 mb-4" />
      <Skeleton className="h-[250px] w-full rounded-lg" />
    </Card>
  );
}

export function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full rounded-lg" />
      ))}
    </div>
  );
}
