import React, { useState, useEffect } from "react";
import "./AdminProfile.css";
import Sidebar from "./Sidebar";
import axios from "axios";

const API_URL = "http://localhost:8080/backend-portfolio/profile.php";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    skills: "",
    details: "",
    avatarFile: null,
    avatarPreview: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(API_URL);
      if (res.data) {
        setProfile(res.data);
      } else {
        setProfile(null);
      }
    } catch (err) {
      console.error("Fetch profile error", err);
    }
  };

  const openFormForCreate = () => {
    setFormData({
      id: 0,
      name: "",
      skills: "",
      details: "",
      avatarFile: null,
      avatarPreview: "",
    });
    setShowForm(true);
  };

  const openFormForEdit = (p) => {
    setFormData({
      id: p.id || 0,
      name: p.name || "",
      skills: p.skills || "",
      details: p.details || "",
      avatarFile: null,
      avatarPreview: p.avatar ? `${window.location.origin}/${p.avatar}` : "",
    });
    setShowForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Avatar should be smaller than 2MB.");
      return;
    }
    setFormData((s) => ({
      ...s,
      avatarFile: file,
      avatarPreview: URL.createObjectURL(file),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const skillsArray = formData.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (skillsArray.length < 1 || skillsArray.length > 5) {
      alert("Please provide between 1 and 5 skills (comma separated).");
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("action", "save");
      if (formData.id) fd.append("id", formData.id);
      fd.append("name", formData.name);
      fd.append("skills", skillsArray.join(", "));
      fd.append("details", formData.details);
      if (formData.avatarFile) fd.append("avatar", formData.avatarFile);

      const res = await axios.post(API_URL, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data && res.data.success) {
        await fetchProfile();
        setShowForm(false);
      } else {
        alert("Save failed. Check server logs.");
      }
    } catch (err) {
      console.error("Save error", err);
      alert("An error occurred while saving.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;
    try {
      const fd = new FormData();
      fd.append("action", "delete");
      if (profile && profile.id) fd.append("id", profile.id);
      const res = await axios.post(API_URL, fd);
      if (res.data && res.data.success) {
        setProfile(null);
      } else {
        alert("Delete failed.");
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="profilePage">
        <h2>Profile</h2>

        {!profile && (
          <div className="addProfileBox">
            <button className="btnPrimary" onClick={openFormForCreate}>
              Add Profile Details
            </button>
          </div>
        )}

        {profile && (
          <div className="profileBox">
            <div className="avatarBox">
              <img
                src={
                  profile.avatar
                    ? `http://localhost:8080/${profile.avatar}`
                    : "https://i.pravatar.cc/150?img=12"
                }
                alt="Avatar"
              />
            </div>

            <div className="profileDetails">
              <h3>{profile.name}</h3>
              <p>
                <b>Skills:</b>{" "}
                {profile.skills ? profile.skills : <i>No skills listed</i>}
              </p>
              <p>
                <b>Details:</b> {profile.details || <i>—</i>}
              </p>

              <div className="actionButtons">
                <button
                  className="btnEdit"
                  onClick={() => openFormForEdit(profile)}
                >
                  Update
                </button>
                <button className="btnDelete" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {showForm && (
          <div className="popupOverlay" onMouseDown={() => setShowForm(false)}>
            <div className="popupBox" onMouseDown={(e) => e.stopPropagation()}>
              <h3>{formData.id ? "Update Profile" : "Add Profile"}</h3>
              <form className="profileForm" onSubmit={handleSave}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />

                <label>Skills (comma separated, min 1 max 5)</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  required
                />

                <label>Details</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  required
                />

                <label>Avatar (png/jpg) — optional</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />

                {formData.avatarPreview && (
                  <div className="avatarPreview">
                    <img src={formData.avatarPreview} alt="preview" />
                  </div>
                )}

                <div className="formActions">
                  <button type="submit" className="btnSave" disabled={submitting}>
                    {submitting ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className="btnCancel"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
