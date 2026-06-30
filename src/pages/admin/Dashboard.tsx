import { useEffect, useState } from "react";
import {
  CalendarDays,
  FolderKanban,
  FileText,
  Users,
  Newspaper,
  MapPinned,
} from "lucide-react";

import AdminLayout from "../../components/admin/AdminLayout";
import PageHeader from "../../components/admin/PageHeader";
import PageCard from "../../components/admin/PageCard";
import StatCard from "../../components/admin/StatCard";

const Dashboard = () => {
  const [stats, setStats] = useState({
    activities: 0,
    projects: 0,
    reports: 0,
    news: 0,
    team: 0,
    hubs: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [
          activities,
          projects,
          reports,
          news,
          team,
          hubs,
        ] = await Promise.all([
          fetch("http://localhost:5000/api/activities").then((r) =>
            r.json()
          ),
          fetch("http://localhost:5000/api/projects").then((r) =>
            r.json()
          ),
          fetch("http://localhost:5000/api/reports").then((r) =>
            r.json()
          ),
          fetch("http://localhost:5000/api/news").then((r) =>
            r.json()
          ),
          fetch("http://localhost:5000/api/team").then((r) =>
            r.json()
          ),
          fetch("http://localhost:5000/api/hubs").then((r) =>
            r.json()
          ),
        ]);

        setStats({
          activities: activities.length || 0,
          projects: projects.length || 0,
          reports: reports.length || 0,
          news: news.length || 0,
          team: team.length || 0,
          hubs: hubs.length || 0,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, []);

  return (
    <AdminLayout>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome to the FPI Zambia Content Management System"
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <StatCard
          title="Activities"
          value={stats.activities}
          subtitle="Published activities"
          icon={<CalendarDays size={30} />}
          color="#C9293A"
        />

        <StatCard
          title="Projects"
          value={stats.projects}
          subtitle="Current projects"
          icon={<FolderKanban size={30} />}
          color="#C9A227"
        />

        <StatCard
          title="Reports"
          value={stats.reports}
          subtitle="Available reports"
          icon={<FileText size={30} />}
          color="#0F766E"
        />

        <StatCard
          title="News"
          value={stats.news}
          subtitle="News articles"
          icon={<Newspaper size={30} />}
          color="#2563EB"
        />

        <StatCard
          title="Team Members"
          value={stats.team}
          subtitle="Staff & Board"
          icon={<Users size={30} />}
          color="#7C3AED"
        />

        <StatCard
          title="MIL Hubs"
          value={stats.hubs}
          subtitle="Across Zambia"
          icon={<MapPinned size={30} />}
          color="#15803D"
        />

      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <PageCard title="Quick Overview">

          <div className="space-y-4 text-slate-700">

            <div className="flex justify-between border-b pb-3">
              <span>Total Activities</span>
              <strong>{stats.activities}</strong>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Total Projects</span>
              <strong>{stats.projects}</strong>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Total Reports</span>
              <strong>{stats.reports}</strong>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Total News</span>
              <strong>{stats.news}</strong>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span>Total Team Members</span>
              <strong>{stats.team}</strong>
            </div>

            <div className="flex justify-between">
              <span>Total MIL Hubs</span>
              <strong>{stats.hubs}</strong>
            </div>

          </div>

        </PageCard>

        <PageCard title="FPI Zambia CMS">

          <div className="space-y-5 text-slate-600 leading-7">

            <p>
              Welcome to the Free Press Initiative Zambia
              Content Management System.
            </p>

            <p>
              Use the menu on the left to manage Activities,
              Projects, Publications, Reports, News,
              Media & Information Literacy Hubs,
              Team Members and Website Content.
            </p>

            <div className="rounded-xl bg-red-50 border border-red-100 p-5">

              <h3 className="font-bold text-[#C9293A] mb-2">
                System Status
              </h3>

              <p>
                CMS Operational
              </p>

            </div>

          </div>

        </PageCard>

      </div>

    </AdminLayout>
  );
};

export default Dashboard;