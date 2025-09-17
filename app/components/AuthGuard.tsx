'use client';

import { useSession } from "next-auth/react";
import UnauthorizedButton from "./UnauthorizedButton";
import { useEffect, useState } from "react";

export default function AuthGuard({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading during SSR and initial client load
  if (!isClient || status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show unauthorized if no session
  if (status === 'unauthenticated' || !session) {
    return <UnauthorizedButton home />;
  }

  // Show children if authenticated
  return <>{children}</>;
}