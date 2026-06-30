import { useState } from "react";

import SectionTabs from "./SectionTabs";

import HeroEditor from "./HeroEditor";
import WelcomeEditor from "./WelcomeEditor";
import AboutEditor from "./AboutEditor";
import StatisticsEditor from "./StatisticsEditor";
import CTAEditor from "./CTAEditor";

const HomepageEditor = () => {
  const [activeTab, setActiveTab] =
    useState("Hero");

  return (
    <div>

      <SectionTabs
        active={activeTab}
        onChange={setActiveTab}
      />

      <div className="mt-8">

        {activeTab === "Hero" && (
          <HeroEditor />
        )}

        {activeTab === "Welcome" && (
          <WelcomeEditor />
        )}

        {activeTab === "About" && (
          <AboutEditor />
        )}

        {activeTab === "Statistics" && (
          <StatisticsEditor />
        )}

        {activeTab === "CTA" && (
          <CTAEditor />
        )}

      </div>

    </div>
  );
};

export default HomepageEditor;