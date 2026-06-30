import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/admin/AdminLayout";
import PageHeader from "../../components/admin/PageHeader";
import PageCard from "../../components/admin/PageCard";

import ActivityForm from "../../components/admin/activity/ActivityForm";

const CreateActivity = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    date: "",
    location: "",
    participants: 0,
    category: "",
    program: "",
    published: true,
  });

  const update = (
    field: string,
    value: any
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submit = async () => {
    try {
      setLoading(true);

      const payload = {
        title: form.title,
        description: form.description,
        content: form.content,
        image: form.image,
        program: form.program,
        category: form.category,
        location: form.location,
        participants: form.participants,
        date: form.date,
        published: form.published,
      };

      const response = await fetch(
        "http://localhost:5000/api/activities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create activity");
      }

      alert("Activity created successfully.");

      navigate("/admin/activities");
    } catch (error) {
      console.error(error);
      alert("Unable to create activity.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Create Activity"
        subtitle="Create a new FPI Zambia activity."
      />

      <PageCard>
        <ActivityForm
          form={form}
          update={update}
          loading={loading}
          onSubmit={submit}
        />
      </PageCard>
    </AdminLayout>
  );
};

export default CreateActivity;