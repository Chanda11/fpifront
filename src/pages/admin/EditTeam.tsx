import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../components/admin/AdminLayout";
import PageHeader from "../../components/admin/PageHeader";
import PageCard from "../../components/admin/PageCard";
import Input from "../../components/admin/Input";
import TextArea from "../../components/admin/TextArea";
import ImageUpload from "../../components/admin/ImageUpload";
import PrimaryButton from "../../components/admin/PrimaryButton";
import SecondaryButton from "../../components/admin/SecondaryButton";

const EditTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
    bio: "",
    image: "",
  });

  const update = (key:string,value:any)=>
    setForm(prev=>({...prev,[key]:value}));

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/team/${id}`);
        const data = await res.json();

        setForm({
          name: data.name || "",
          position: data.position || "",
          email: data.email || "",
          phone: data.phone || "",
          bio: data.bio || "",
          image: data.image || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const submit = async (e:any) => {
    e.preventDefault();

    await fetch(`http://localhost:5000/api/team/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(form)
    });

    navigate("/admin/team");
  };

  return (
    <AdminLayout>

      <PageHeader
        title="Edit Team Member"
        subtitle="Update team member details"
      />

      <PageCard>

        {loading ? (
          <div className="py-20 text-center">
            Loading...
          </div>
        ) : (

          <form onSubmit={submit} className="space-y-6">

            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={(e)=>update("name",e.target.value)}
            />

            <Input
              label="Position"
              name="position"
              value={form.position}
              onChange={(e)=>update("position",e.target.value)}
            />

            <Input
              label="Email"
              name="email"
              value={form.email}
              onChange={(e)=>update("email",e.target.value)}
            />

            <Input
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={(e)=>update("phone",e.target.value)}
            />

            <TextArea
              label="Biography"
              name="bio"
              rows={6}
              value={form.bio}
              onChange={(e)=>update("bio",e.target.value)}
            />

            <ImageUpload
              label="Profile Photo"
              value={form.image}
              onChange={(v:any)=>update("image",v)}
            />

            <div className="flex gap-4 pt-2">

              <PrimaryButton type="submit">
                Update Team Member
              </PrimaryButton>

              <SecondaryButton
                type="button"
                onClick={()=>navigate("/admin/team")}
              >
                Cancel
              </SecondaryButton>

            </div>

          </form>

        )}

      </PageCard>

    </AdminLayout>
  );
};

export default EditTeam;
