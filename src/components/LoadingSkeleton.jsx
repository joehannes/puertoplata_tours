export default function LoadingSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3].map((i) => <div key={i} className="card h-48 bg-slate-100" />)}
    </div>
  );
}
