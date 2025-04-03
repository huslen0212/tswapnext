import Footer from '@/components/Footer';
import Header from '../components/Header';
import Charger from '@/components/Charger';
export default function Home() {
  return (
    <div className="pageContainer">
      <Header />
      <div className="content">
      <Charger/>
      </div>
      <Footer />
    </div>
  );
}
