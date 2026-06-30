
import Input from "../Input";
import TextArea from "../TextArea";
import PrimaryButton from "../PrimaryButton";

import TeamImagePicker from "./TeamImagePicker";
import CategorySelect from "./CategorySelect";
import ResponsibilitiesEditor from "./ResponsibilitiesEditor";
import PublishSwitch from "./PublishSwitch";

interface Props {
  form: any;
  update: (field: string, value: any) => void;
  loading?: boolean;
  onSubmit: () => void;
}

const TeamForm = ({
  form,
  update,
  loading = false,
  onSubmit,
}: Props) => {
  return (
    <div className="space-y-8">

      <Input
        label="Full Name"
        name="fullName"
        value={form.fullName}
        onChange={(e) =>
          update("fullName", e.target.value)
        }
      />

      <Input
        label="Position"
        name="position"
        value={form.position}
        onChange={(e) =>
          update("position", e.target.value)
        }
      />

      <CategorySelect
        value={form.category}
        onChange={(value) =>
          update("category", value)
        }
      />

      <TextArea
        label="Biography"
        name="biography"
        rows={6}
        value={form.biography}
        onChange={(e) =>
          update(
            "biography",
            e.target.value
          )
        }
      />

      <ResponsibilitiesEditor
        value={form.responsibilities}
        onChange={(value) =>
          update(
            "responsibilities",
            value
          )
        }
      />

      <Input
        label="Display Order"
        name="displayOrder"
        type="number"
        value={form.displayOrder}
        onChange={(e) =>
          update(
            "displayOrder",
            Number(e.target.value)
          )
        }
      />

      <TeamImagePicker
        value={form.image}
        onChange={(url) =>
          update("image", url)
        }
      />

      <PublishSwitch
        checked={form.published}
        onChange={(checked) =>
          update("published", checked)
        }
      />

      <div className="pt-4">

        <PrimaryButton
          onClick={onSubmit}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : "Save Team Member"}
        </PrimaryButton>

      </div>

    </div>
  );
};

export default TeamForm;