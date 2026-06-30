import { useState } from "react";

import Input from "../Input";
import TextArea from "../TextArea";
import ImageUpload from "../ImageUpload";
import PrimaryButton from "../PrimaryButton";

const AboutEditor = () => {
  const [about, setAbout] = useState({
    title: "",
    subtitle: "",
    content: "",
    mission: "",
    vision: "",
    image: "",
  });

  const update = (
    field: string,
    value: string
  ) => {
    setAbout((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold text-slate-800">
        About FPI
      </h2>

      <Input
        label="Section Title"
        name="title"
        value={about.title}
        onChange={(e) =>
          update("title", e.target.value)
        }
      />

      <Input
        label="Subtitle"
        name="subtitle"
        value={about.subtitle}
        onChange={(e) =>
          update("subtitle", e.target.value)
        }
      />

      <TextArea
        label="About Content"
        name="content"
        rows={8}
        value={about.content}
        onChange={(e) =>
          update("content", e.target.value)
        }
      />

      <TextArea
        label="Mission"
        name="mission"
        rows={4}
        value={about.mission}
        onChange={(e) =>
          update("mission", e.target.value)
        }
      />

      <TextArea
        label="Vision"
        name="vision"
        rows={4}
        value={about.vision}
        onChange={(e) =>
          update("vision", e.target.value)
        }
      />

      <ImageUpload
        label="About Image"
        value={about.image}
        onChange={(url) =>
          update("image", url)
        }
      />

      <PrimaryButton>
        Save About Section
      </PrimaryButton>

    </div>
  );
};

export default AboutEditor;