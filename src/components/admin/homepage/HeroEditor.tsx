import { useState } from "react";

import Input from "../Input";
import TextArea from "../TextArea";
import ImageUpload from "../ImageUpload";
import PrimaryButton from "../PrimaryButton";

const HeroEditor = () => {
  const [hero, setHero] = useState({
    title: "",
    subtitle: "",
    image: "",
    buttonText: "",
    buttonLink: "",
  });

  const update = (
    field: string,
    value: string
  ) => {
    setHero((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold text-slate-800">
        Hero Section
      </h2>

      <Input
        label="Hero Title"
        name="title"
        value={hero.title}
        onChange={(e) =>
          update("title", e.target.value)
        }
      />

      <TextArea
        label="Hero Subtitle"
        name="subtitle"
        rows={4}
        value={hero.subtitle}
        onChange={(e) =>
          update("subtitle", e.target.value)
        }
      />

      <ImageUpload
        label="Background Image"
        value={hero.image}
        onChange={(url) =>
          update("image", url)
        }
      />

      <div className="grid md:grid-cols-2 gap-6">

        <Input
          label="Button Text"
          name="buttonText"
          value={hero.buttonText}
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
          value={hero.buttonLink}
          onChange={(e) =>
            update(
              "buttonLink",
              e.target.value
            )
          }
        />

      </div>

      <PrimaryButton>
        Save Hero Section
      </PrimaryButton>

    </div>
  );
};

export default HeroEditor;