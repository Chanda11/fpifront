import { ChangeEvent, useState } from "react";
import { FileText } from "lucide-react";

interface FileUploadProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
}

const FileUpload = ({
  label = "Upload File",
  value,
  onChange,
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);

  const handleChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "http://localhost:5000/api/media",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      const media = await response.json();

      onChange(media.url);

    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">

      <label className="block font-semibold">
        {label}
      </label>

      <input
        type="file"
        onChange={handleChange}
        className="block w-full border rounded-lg p-3"
      />

      {uploading && (
        <p>Uploading...</p>
      )}

      {value && (
        <div className="flex items-center gap-2 text-blue-600">
          <FileText size={18} />
          <span>File uploaded</span>
        </div>
      )}

    </div>
  );
};

export default FileUpload;