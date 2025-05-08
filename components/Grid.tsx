export default function Grid({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 ${className}`}>
      {children}
    </div>
  );
}
