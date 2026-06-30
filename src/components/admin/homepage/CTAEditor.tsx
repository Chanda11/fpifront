import { useState } from "react";

import Input from "../Input";
import TextArea from "../TextArea";
import ImageUpload from "../ImageUpload";
import PrimaryButton from "../PrimaryButton";

const CTAEditor = () => {
  const [cta, setCta] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    image: "",
  });

  const update = (
    field: string,
    value: string
  ) => {
    setCta((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold text-slate-800">
        Call To Action
      </h2>

      <Input
        label="Title"
        name="title"
        value={cta.title}
        onChange={(e) =>
          update("title", e.target.value)
        }
      />

      <TextArea
        label="Subtitle"
        name="subtitle"
        rows={5}
        value={cta.subtitle}
        onChange={(e) =>
          update("subtitle", e.target.value)
        }
      />

      <ImageUpload
        label="Background Image"
        value={cta.image}
        onChange={(url) =>
          update("image", url)
        }
      />

      <div className="grid md:grid-cols-2 gap-6">

        <Input
          label="Button Text"
          name="buttonText"
          value={cta.buttonText}
          onChange={(e) =>
            update(
              "buttonText",
              e.target.value
            )
          }
        />

        <Input
          label="Button Link"
          name="buttonLink"
          value={cta.buttonLink}
          onChange={(e) =>
            update(
              "buttonLink",
              e.target.value
            )
          }
        />

      </div>

      <PrimaryButton>
        Save CTA Section
      </PrimaryButton>

    </div>
  );
};

export default CTAEditor;