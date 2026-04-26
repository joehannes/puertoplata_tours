const transferImage = {
  airport_transfer_pop_cruise: 'https://images.pexels.com/photos/1178448/pexels-photo-1178448.jpeg?auto=compress&cs=tinysrgb&w=1200',
  airport_transfer_pop_hotel: 'https://images.pexels.com/photos/2872890/pexels-photo-2872890.jpeg?auto=compress&cs=tinysrgb&w=1200',
  group_minivan_transfer: 'https://images.pexels.com/photos/1850619/pexels-photo-1850619.jpeg?auto=compress&cs=tinysrgb&w=1200',
  vip_express_transfer: 'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=1200'
};

export default function TransfersPage({ data }) {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-3xl">Reliable Transfers</h1>
      <p className="text-slate-600">From Gregorio Luperón (POP) to cruise port, hotel, or private pickup point.</p>
      <div className="grid md:grid-cols-2 gap-4">
        {data.transfers.filter((tr) => tr.availability).map((tr) => (
          <div key={tr.id} className="tropical-card space-y-3">
            <img src={transferImage[tr.id]} alt={tr.title} className="h-44 w-full object-cover shell-shape" />
            <h2 className="font-display text-xl">{tr.title}</h2>
            <p>{tr.description}</p>
            <p className="text-sm text-slate-600">Capacity {tr.capacity} • ~{tr.durationMinutes || 40} min</p>
            <p className="font-semibold text-ocean-900">From ${tr.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
