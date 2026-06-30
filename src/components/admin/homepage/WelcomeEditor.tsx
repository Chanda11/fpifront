import { useState } from "react";

import Input from "../Input";
import TextArea from "../TextArea";
import ImageUpload from "../ImageUpload";
import PrimaryButton from "../PrimaryButton";

const WelcomeEditor = () => {
  const [welcome, setWelcome] = useState({
    title: "",
    subtitle: "",
    content: "",
    image: "",
  });

  const update = (
    field: string,
    value: string
  ) => {
    setWelcome((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold text-slate-800">
        Welcome Section
      </h2>

      <Input
        label="Title"
        name="title"
        value={welcome.title}
        onChange={(e) =>
          update("title", e.target.value)
        }
      />

      <Input
        label="Subtitle"
        name="subtitle"
        value={welcome.subtitle}
        onChange={(e) =>
          update("subtitle", e.target.value)
        }
      />

      <TextArea
        label="Content"
        name="content"
        rows={8}
        value={welcome.content}
        onChange={(e) =>
          update("content", e.target.value)
        }
      />

      <ImageUpload
        label="Section Image"
        value={welcome.image}
        onChange={(url) =>
          update("image", url)
        }
      />

      <PrimaryButton>
        Save Welcome Section
      </PrimaryButton>

    </div>
  );
};

export default WelcomeEditor;