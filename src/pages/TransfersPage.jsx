import { tr } from '../lib/i18n';

const transferImage = {
  airport_transfer_pop_cruise: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
  airport_transfer_pop_hotel: 'https://images.pexels.com/photos/1178448/pexels-photo-1178448.jpeg?auto=compress&cs=tinysrgb&w=1200',
  group_minivan_transfer: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1200&q=80',
  vip_express_transfer: 'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=1200'
};

export default function TransfersPage({ data, lang }) {
  return (
    <div className="space-y-4">
      <h1 className="font-heading text-3xl">{tr(lang, 'transfers.title')}</h1>
      <p className="text-slate-600">{tr(lang, 'transfers.desc')}</p>
      <div className="grid md:grid-cols-2 gap-4">
        {data.transfers.filter((trf) => trf.availability).map((trf) => (
          <div key={trf.id} className="tropical-card space-y-3">
            <img src={transferImage[trf.id]} alt={trf.title} className="h-44 w-full object-cover shell-shape image-widget" />
            <h2 className="font-display text-xl">{trf.title}</h2>
            <p>{trf.description}</p>
            <p className="text-sm text-slate-600">{tr(lang, 'transfers.capacity')} {trf.capacity} • ~{trf.durationMinutes || 40} min</p>
            <p className="font-semibold text-ocean-900">{tr(lang, 'transfers.from')} ${trf.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
