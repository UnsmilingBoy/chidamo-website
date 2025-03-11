export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-300 rounded-full border-t-primary animate-spin"></div>
      <p className="mt-2 text-gray-600">در حال بارگیری محصولات...</p>
    </div>
  );
}
