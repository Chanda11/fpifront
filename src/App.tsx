import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/contact/Contact";import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ActivityDetail from "./pages/ActivityDetail";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Activities from "./pages/admin/Activities";
import CreateActivity from "./pages/admin/CreateActivity";
import EditActivity from "./pages/admin/EditActivity";
import Hubs from "./pages/mil/Hubs";
import Brochure from "./pages/mil/Brochure";
import AboutMIL from "./pages/mil/AboutMIL";
import About from "./pages/about/AboutUs";
import Team from "./pages/team/Team";
import Sponsors from "./pages/sponsors/Sponsors";
import Partners from "./pages/partners/Partners";
import Advocacy from "./pages/programs/Advocacy";
import MediaLiteracy from "./pages/programs/MediaLiteracy";
import Research from "./pages/programs/Research";
import CapacityBuilding from "./pages/programs/CapacityBuilding";
import Newsletters from "./pages/knowledge/Newsletters";
import Reports from "./pages/knowledge/Reports";
import TeamMembers from "./pages/admin/TeamMembers";
import Projects from "./pages/admin/Projects";
import CreateProject from "./pages/admin/CreateProject";
import ProjectDetail from "./pages/Projects/ProjectDetail";
import HubDetail from "./pages/mil/Hubs/HubDetail";
import AdminHubs from "./pages/admin/Hubs";
import Provinces from "./pages/admin/Provinces";
import CreateHub from "./pages/admin/CreateHub";
import ProvinceHubs from "./pages/mil/Hubs/ProvinceHubs";
import EditHub from "./pages/admin/EditHub";
import ScrollToTop from "./components/ScrollToTop";
import Resources from "./pages/resources/Resources";
import Publications from "./pages/knowledge/Publications";
import PressStatements from "./pages/knowledge/PressStatments";
import EditProject from "./pages/admin/EditProject";
import MediaLibrary from "./pages/admin/media/MediaLibrary";
import UploadMedia from "./pages/admin/media/UploadMedia";
import EditMedia from "./pages/admin/media/EditMedia";
import CreateTeam from "./pages/admin/CreateTeam";
import RadioSpots from "./pages/mil/RadioSpots";
import SheRise from "./pages/Projects/SheRise";
import ClaimYourSpace from "./pages/Projects/ClaimYourSpace";
import Funsani from "./pages/Projects/Funsani";
import ConflictSensitiveJournalism from "./pages/Projects/ConflictSensitiveJournalism";


function AppContent() {
  const location = useLocation();

  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities/:id" element={<ActivityDetail />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/activities" element={<Activities />} />
        <Route path="/admin/activities/create"element={<CreateActivity />}/>
        <Route path="/admin/activities/:id/edit"element={<EditActivity />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/programs/advocacy" element={<Advocacy />} />
        <Route path="/programs/media-literacy" element={<MediaLiteracy />} />
        <Route path="/programs/research" element={<Research />} />
        <Route path="/programs/capacity-building" element={<CapacityBuilding />} />
        <Route path="/knowledge/newsletters" element={<Newsletters />} />
        <Route path="/knowledge/reports" element={<Reports />} />
        <Route path="/admin/team" element={<TeamMembers />} />
        <Route path="/admin/projects" element={<Projects />} />
        <Route path="/admin/projects/create" element={<CreateProject />} />
        <Route path="/mil/about" element={<AboutMIL />} />
        <Route path="/mil/brochure" element={<Brochure />} />
        <Route path="/admin/hubs" element={<AdminHubs />} />
        <Route path="/admin/hubs/:id/edit"element={<EditHub />}/>
        <Route path="/admin/provinces" element={<Provinces />} />
        <Route path="/admin/hubs/create" element={<CreateHub />}/>
        <Route path="/mil/province/:province"element={<ProvinceHubs />}/>
        <Route path="/mil/hub/:slug"element={<HubDetail />}/>
        <Route path="/mil/hubs" element={<Hubs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/knowledge/publications"element={<Publications />}/>
        <Route path="/knowledge/press-statements"element={<PressStatements />}/>
        <Route path="/admin/projects/:id/edit"element={<EditProject />}/>
        <Route path="/admin/media" element={<MediaLibrary />} />
        <Route path="/admin/media/upload" element={<UploadMedia />}/>
        <Route path="/admin/media/:id/edit" element={<EditMedia />} />
        <Route path="/admin/team/create" element={<CreateTeam />}/>
        <Route path="/mil/radio-spots" element={<RadioSpots />} />
        <Route path="/projects/sherise" element={<SheRise />} />

        <Route
          path="/projects/claim-your-space"
          element={<ClaimYourSpace />}
        />

        <Route
          path="/projects/funsani"
          element={<Funsani />}
        />

        <Route
          path="/projects/conflict-sensitive-journalism"
          element={<ConflictSensitiveJournalism />}
        />
        
         </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <ScrollToTop />
    </BrowserRouter>
  );
}