'use client';

import * as React from 'react';
// import { cn } from '@/lib/utils'; // Assuming cn utility is available for class merging

// Removed interface declaration and type annotation for className prop
const Spinner = React.forwardRef( ({ className, variant = 'default', ...props }, ref) => {

  const renderSpinner = () => {
    switch (variant) {
      case 'bars':
        return (
          <div className="flex items-end space-x-1">
            <div className="h-4 w-1 animate-pulse rounded-full bg-black delay-0"></div>
            <div className="h-5 w-1 animate-pulse rounded-full bg-black delay-100"></div>
            <div className="h-6 w-1 animate-pulse rounded-full bg-black delay-200"></div>
          </div>
        );
      case 'circle':
        return <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent text-black dark:text-gray-200" />;
      // Add more cases for other variants if needed
      case 'default':
      default:
        return <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent text-black dark:text-gray-200" />;
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      {...props}
    >
      {renderSpinner()}
    </div>
  );
});
Spinner.displayName = 'Spinner';

export { Spinner };
