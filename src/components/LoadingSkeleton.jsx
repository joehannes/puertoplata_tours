export default function LoadingSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-4 animate-pulse">
      {[1, 2, 3, 4].map((i) => <div key={i} className="tropical-card h-40 bg-slate-100" />)}
    </div>
  );
}
