import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminHeader from '@/components/AdminHeader';
import Footer from '@/components/Footer';
import AdminNewsList from '@/components/AdminNewsList';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || !session.user?.isAdmin) {
      router.push("/");
    }
  }, [router, session, status]);

  if (status === "loading") return <p>Уншиж байна...</p>;

  return (
    <div className="pageContainer">
      <AdminHeader/>
      <div>
        <AdminNewsList />
      </div>
      <Footer />
    </div>
  );
}
