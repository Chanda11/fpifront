import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/admin/AdminLayout";
import PageHeader from "../../components/admin/PageHeader";
import PageCard from "../../components/admin/PageCard";

import ProjectForm from "../../components/admin/project/ProjectForm";

const CreateProject = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    image: "",
    category: "",
    status: "Planning",
    startDate: "",
    endDate: "",
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

      const response = await fetch(
        "http://localhost:5000/api/projects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error();
      }

      alert("Project created successfully.");

      navigate("/admin/projects");

    } catch (error) {

      console.error(error);

      alert("Unable to create project.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <AdminLayout>

      <PageHeader
        title="Create Project"
        subtitle="Create a new FPI Zambia project."
      />

      <PageCard>

        <ProjectForm
          form={form}
          update={update}
          loading={loading}
          onSubmit={submit}
        />

      </PageCard>

    </AdminLayout>
  );
};

export default CreateProject;