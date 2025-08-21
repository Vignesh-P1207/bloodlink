import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import DonorPortal from '@/components/donor-portal';
import HospitalPortal from '@/components/hospital-portal';
import AdminDashboard from '@/components/admin-dashboard';
import BloodDropBackground from '@/components/blood-drop-background';

export default function Home() {
  return (
    <>
      <BloodDropBackground />
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12 space-y-24 relative z-10">
        <DonorPortal />
        <HospitalPortal />
        <AdminDashboard />
      </main>
      <Footer />
    </>
  );
}
