import { useState } from "react";

import Input from "../Input";
import PrimaryButton from "../PrimaryButton";

const StatisticsEditor = () => {
  const [stats, setStats] = useState({
    stat1Title: "",
    stat1Value: "",
    stat2Title: "",
    stat2Value: "",
    stat3Title: "",
    stat3Value: "",
    stat4Title: "",
    stat4Value: "",
  });

  const update = (
    field: string,
    value: string
  ) => {
    setStats((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-8">

      <h2 className="text-2xl font-bold text-slate-800">
        Homepage Statistics
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <Input
          label="Statistic 1 Title"
          name="stat1Title"
          value={stats.stat1Title}
          onChange={(e) =>
            update("stat1Title", e.target.value)
          }
        />

        <Input
          label="Statistic 1 Value"
          name="stat1Value"
          value={stats.stat1Value}
          onChange={(e) =>
            update("stat1Value", e.target.value)
          }
        />

        <Input
          label="Statistic 2 Title"
          name="stat2Title"
          value={stats.stat2Title}
          onChange={(e) =>
            update("stat2Title", e.target.value)
          }
        />

        <Input
          label="Statistic 2 Value"
          name="stat2Value"
          value={stats.stat2Value}
          onChange={(e) =>
            update("stat2Value", e.target.value)
          }
        />

        <Input
          label="Statistic 3 Title"
          name="stat3Title"
          value={stats.stat3Title}
          onChange={(e) =>
            update("stat3Title", e.target.value)
          }
        />

        <Input
          label="Statistic 3 Value"
          name="stat3Value"
          value={stats.stat3Value}
          onChange={(e) =>
            update("stat3Value", e.target.value)
          }
        />

        <Input
          label="Statistic 4 Title"
          name="stat4Title"
          value={stats.stat4Title}
          onChange={(e) =>
            update("stat4Title", e.target.value)
          }
        />

        <Input
          label="Statistic 4 Value"
          name="stat4Value"
          value={stats.stat4Value}
          onChange={(e) =>
            update("stat4Value", e.target.value)
          }
        />

      </div>

      <PrimaryButton>
        Save Statistics
      </PrimaryButton>

    </div>
  );
};

export default StatisticsEditor;