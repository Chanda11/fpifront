import ImageUpload from "../ImageUpload";

interface ActivityImagePickerProps {
  value: string;
  onChange: (url: string) => void;
}

const ActivityImagePicker = ({
  value,
  onChange,
}: ActivityImagePickerProps) => {
  return (
    <ImageUpload
      label="Featured Image"
      value={value}
      onChange={onChange}
    />
  );
};

export default ActivityImagePicker;