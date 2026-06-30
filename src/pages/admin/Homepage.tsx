import { useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import PageHeader from "../../components/admin/PageHeader";
import { homepageService } from "../../services/homepageService";
import HomepageEditor from "../../components/admin/homepage/HomepageEditor";

const Homepage = () => {
  useEffect(() => {
    homepageService
      .getAll()
      .then(console.log)
      .catch(console.error);
  }, []);

  return (
    <AdminLayout>
      <PageHeader
        title="Homepage"
        subtitle="Manage homepage sections"
      />

      <div className="bg-white rounded-2xl shadow p-8">
          <HomepageEditor />
      </div>
    </AdminLayout>
  );
};

export default Homepage;