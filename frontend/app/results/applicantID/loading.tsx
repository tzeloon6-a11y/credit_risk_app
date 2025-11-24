// frontend/app/results/[applicantId]/loading.tsx

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

// This file uses the components you installed (Card and Skeleton)
export default function Loading() {
  return (
    <div className="container mx-auto p-8 space-y-8 max-w-4xl">
      <h1 className="text-3xl font-bold">
        {/* Title Placeholder */}
        <Skeleton className="h-8 w-80" /> 
      </h1>
      <p className="text-lg text-muted-foreground">
        {/* Status/Loading Message Placeholder */}
        <Skeleton className="h-6 w-96" />
      </p>

      {/* Main Recommendation Card Skeleton */}
      <Card className="shadow-md">
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            {/* Recommendation Box Placeholder */}
            <Skeleton className="h-10 w-40" /> 
            {/* Risk Score Circle Placeholder */}
            <Skeleton className="h-12 w-12 rounded-full" /> 
          </div>
          <h3 className="font-semibold mb-2">
             <Skeleton className="h-5 w-40" />
          </h3>
          {/* Justification Text Lines Placeholder */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[90%]" />
            <Skeleton className="h-4 w-[80%]" />
          </div>
        </CardContent>
      </Card>
      
      {/* Detailed Analysis Sections Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[75%]" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[75%]" />
          </CardContent>
        </Card>
      </div>

      {/* Granular Progress Bar Placeholder (Task 5.2) */}
      <div className="pt-4">
        <h3 className="text-sm font-medium mb-1"><Skeleton className="h-4 w-40" /></h3>
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  );
}