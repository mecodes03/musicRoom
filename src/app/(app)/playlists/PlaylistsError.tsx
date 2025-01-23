"use client";

import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";

const ErrorPlaylists = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary
      errorComponent={({
        error,
        reset,
      }: {
        error: Error;
        reset: () => void;
      }) => <CustomErrorBoundary error={error} reset={reset} />}
    >
      {children}
    </ErrorBoundary>
  );
};

export { ErrorPlaylists };

interface CustomErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

function CustomErrorBoundary({ error, reset }: CustomErrorBoundaryProps) {
  console.log(error.message);

  return (
    <div className="grid border border-zinc-700 rounded-xl p-5">
      <div className="grid gap-y-5">
        <p className="text-red-600">Something went wrong!!</p>
        <div className="flex items-center gap-x-5">
          <Button variant={"outline"}>back to homepage</Button>
          <Button variant={"secondary"} onClick={() => reset()}>
            try again
          </Button>
        </div>
      </div>
    </div>
  );
}
