export default function TransfersPage({ data }) {
  return (
    <div>
      <h1 className="font-heading text-3xl mb-4">Airport Transfers</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {data.transfers.map((tr) => (
          <div key={tr.id} className="card">
            <h2 className="font-semibold text-xl">{tr.title}</h2>
            <p>{tr.description}</p>
            <p className="mt-2">Capacity: {tr.capacity} • ${tr.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
