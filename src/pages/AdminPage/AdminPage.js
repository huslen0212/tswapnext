import AdminHeader from '@/components/AdminHeader';
import Footer from '@/components/Footer';
import AdminNewsList from '@/components/AdminNewsList';
export default function AdminPage()
{ return (
    <div className="pageContainer">
      <AdminHeader/>
       <div>
        <AdminNewsList />
       </div>
      <Footer />
    </div>
  );
}