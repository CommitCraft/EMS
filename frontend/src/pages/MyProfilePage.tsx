import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PageHeader } from "../components/PageHeader";
import { FormField } from "../components/FormField";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/authService";

const MyProfilePage = () => {
  const { user, hydrate } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setMobile(user?.mobile || "");
    setProfileImage(
      (user as any)?.profileImage || (user as any)?.profile_image || "",
    );
  }, [user]);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    try {
      setSaving(true);
      await authService.updateProfile({
        name: name.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        profileImage: profileImage || undefined,
      });
      await hydrate();
      toast.success("Profile updated successfully");
    } catch {
      toast.error("Unable to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        description="Update your personal account information."
      />
      <div className="panel max-w-3xl p-5">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="col-span-1 flex flex-col items-center">
            <div className="mb-4 w-full">
              <FormField
                field={{
                  name: "profileImage",
                  label: "Profile Image",
                  type: "asset",
                  uploadEndpoint: "/auth/profile/avatar",
                  buttonText: "Upload Avatar",
                  previewWidth: 180,
                  previewHeight: 180,
                }}
                value={profileImage}
                onChange={(_n, v) => setProfileImage(v)}
              />
            </div>
          </div>

          <div className="col-span-2">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FormField
                  field={{ name: "Username", label: "Username", type: "text" }}
                  value={user?.username || ""}
                  onChange={() => {}}
                />
              </div>
              <div>
                <FormField
                  field={{
                    name: "name",
                    label: "Name",
                    type: "text",
                    required: true,
                  }}
                  value={name}
                  onChange={(_n, v) => setName(v)}
                />
              </div>
              <div>
                <FormField
                  field={{
                    name: "email",
                    label: "Email",
                    type: "email",
                    required: true,
                  }}
                  value={email}
                  onChange={(_n, v) => setEmail(v)}
                />
              </div>

              <div>
                <FormField
                  field={{
                    name: "mobile",
                    label: "Mobile",
                    type: "text",
                    placeholder: "Optional",
                  }}
                  value={mobile}
                  onChange={(_n, v) => setMobile(v)}
                />
              </div>

              <div>
                <FormField
                  field={{ name: "roleName", label: "Role", type: "text" }}
                  value={user?.roleName || (user as any)?.role?.name || ""}
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className="mt-6 border-t border-slate-200 pt-4">
              <div className="flex items-center justify-end gap-3">
                <button
                  className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
                  disabled={saving}
                  onClick={() => void handleSubmit()}
                >
                  {saving ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Saving...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
