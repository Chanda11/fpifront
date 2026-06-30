import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Users,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">
        FPI CMS
      </h1>

      <nav className="space-y-3">
        <Link
          to="/admin"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/admin/hubs"
          className="flex items-center gap-3 p-3 rounded hover:bg-slate-800"
        >
          MIL Hubs
        </Link>

        <Link
          to="/admin/activities"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <Calendar size={20} />
          Activities
        </Link>

        <Link
          to="/admin/provinces"
          className="flex items-center gap-3 p-3 rounded hover:bg-slate-800"
        >
          Provinces
        </Link>
        
        <Link
          to="/admin/team"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          Team Members
        </Link>

        <Link
          to="/admin/reports"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <FileText size={20} />
          Reports
        </Link>

        <Link
          to="/admin/team"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <Users size={20} />
          Team
        </Link>

        <Link
          to="/admin/settings"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <Settings size={20} />
          Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;