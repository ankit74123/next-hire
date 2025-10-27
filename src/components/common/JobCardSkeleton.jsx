const JobCardSkeleton = ({ gridView = true }) => {
  if (!gridView) {
    // List View Skeleton
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 animate-pulse">
        <div className="flex items-start">
          <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4"></div>
          <div className="flex-1">
            <div className="h-6 bg-gray-200 rounded w-2/3 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="flex gap-4 mb-4">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Skeleton
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
      </div>
      
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      
      <div className="space-y-3 mb-4">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
        <div className="h-6 bg-gray-200 rounded-full w-20"></div>
      </div>
      
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-gray-200 rounded w-16"></div>
        <div className="h-6 bg-gray-200 rounded w-16"></div>
        <div className="h-6 bg-gray-200 rounded w-16"></div>
      </div>
      
      <div className="h-10 bg-gray-200 rounded w-full"></div>
    </div>
  );
};

export default JobCardSkeleton;
