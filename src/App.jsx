import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSkeleton from './components/LoadingSkeleton';
import { useAppData } from './hooks/useAppData';
import { useLanguage } from './hooks/useLanguage';
import { useTranslatedCatalog } from './hooks/useTranslatedCatalog';
import LandingPage from './pages/LandingPage';
import ToursPage from './pages/ToursPage';
import TourDetailPage from './pages/TourDetailPage';
import CustomPage from './pages/CustomPage';
import TransfersPage from './pages/TransfersPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const { data, updateData, loading } = useAppData();
  const { lang, setLang } = useLanguage();
  const localizedData = useTranslatedCatalog(data, lang);

  return (
    <Layout lang={lang} setLang={setLang} settings={localizedData?.settings}>
      {loading ? <LoadingSkeleton /> : (
        <Routes>
          <Route path="/" element={<LandingPage lang={lang} data={localizedData} />} />
          <Route path="/tours" element={<ToursPage lang={lang} data={localizedData} />} />
          <Route path="/tours/:id" element={<TourDetailPage lang={lang} data={localizedData} />} />
          <Route path="/custom" element={<CustomPage lang={lang} data={localizedData} />} />
          <Route path="/transfers" element={<TransfersPage lang={lang} data={localizedData} />} />
          <Route path="/checkout" element={<CheckoutPage data={localizedData} lang={lang} />} />
          <Route path="/admin" element={<AdminPage lang={lang} data={data} updateData={updateData} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </Layout>
  );
}
