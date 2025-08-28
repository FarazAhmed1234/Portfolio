import React, { useState, useEffect } from "react";
import "./AdminInfomation.css";
import Sidebar from "./Sidebar";

const ButtonsToggle = () => {
    const [active, setActive] = useState("social");

    // 🔹 Social Links
    const [links, setLinks] = useState([]);
    const [platform, setPlatform] = useState("");
    const [url, setUrl] = useState("");
    const [editId, setEditId] = useState(null);

    // 🔹 Information
    const [infos, setInfos] = useState([]);
    const [label, setLabel] = useState("");
    const [value, setValue] = useState("");
    const [editInfoId, setEditInfoId] = useState(null);

    // ✅ Fetch Social Links
    const fetchLinks = () => {
        fetch("http://localhost:8080/backend-portfolio/getSocialLinks.php")
            .then((res) => res.json())
            .then((data) => setLinks(data))
            .catch((err) => console.error("Error fetching links:", err));
    };

    // ✅ Fetch Information
    const fetchInfos = () => {
        fetch("http://localhost:8080/backend-portfolio/getInfo.php")
            .then((res) => res.json())
            .then((data) => setInfos(data))
            .catch((err) => console.error("Error fetching info:", err));
    };

    useEffect(() => {
        fetchLinks();
        fetchInfos();
    }, []);

    // ✅ Save Social Link (Add/Update)
    const handleSaveLink = (e) => {
        e.preventDefault();
        const endpoint = editId ? "updateSocialLink.php" : "addSocialLink.php";

        fetch(`http://localhost:8080/backend-portfolio/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: editId, platform, url }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    alert(editId ? "Link updated!" : "Link added!");
                    fetchLinks();
                    setPlatform("");
                    setUrl("");
                    setEditId(null);
                } else {
                    alert("Failed: " + data.message);
                }
            })
            .catch((err) => console.error("Error saving link:", err));
    };

    // ✅ Edit Social Link
    const handleEdit = (link) => {
        setPlatform(link.platform);
        setUrl(link.url);
        setEditId(link.id);
    };

    // ✅ Delete Social Link
    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this link?")) return;

        fetch("http://localhost:8080/backend-portfolio/deleteSocialLink.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    alert("Link deleted!");
                    setLinks(links.filter((l) => l.id !== id));
                } else {
                    alert("Failed: " + data.message);
                }
            })
            .catch((err) => console.error("Error deleting link:", err));
    };

    // ✅ Save Info (Add/Update)
    const handleSaveInfo = (e) => {
        e.preventDefault();
        const endpoint = editInfoId ? "updateInfo.php" : "addInfo.php";

        fetch(`http://localhost:8080/backend-portfolio/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: editInfoId, label, value }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    alert(editInfoId ? "Info updated!" : "Info added!");
                    fetchInfos();
                    setLabel("");
                    setValue("");
                    setEditInfoId(null);
                } else {
                    alert("Failed: " + data.message);
                }
            })
            .catch((err) => console.error("Error saving info:", err));
    };

    // ✅ Edit Info
    const handleEditInfo = (info) => {
        setLabel(info.label);
        setValue(info.value);
        setEditInfoId(info.id);
    };

    // ✅ Delete Info
    const handleDeleteInfo = (id) => {
        if (!window.confirm("Are you sure you want to delete this info?")) return;

        fetch("http://localhost:8080/backend-portfolio/deleteInfo.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    alert("Info deleted!");
                    setInfos(infos.filter((i) => i.id !== id));
                } else {
                    alert("Failed: " + data.message);
                }
            })
            .catch((err) => console.error("Error deleting info:", err));
    };

    return (
        <>
            <Sidebar />
            <div className="bt-container">
                <h2 className="bt-title">Quick Access</h2>

                {/* Toggle Buttons */}
                <div className="bt-buttons">
                    <button
                        className={`bt-btn ${active === "social" ? "active" : ""}`}
                        onClick={() => setActive("social")}
                    >
                        Social Links
                    </button>
                    <button
                        className={`bt-btn ${active === "info" ? "active" : ""}`}
                        onClick={() => setActive("info")}
                    >
                        Information
                    </button>
                </div>

                {/* Panels */}
                <div className="bt-panels">
                    {active === "social" && (
                        <section className="bt-panel show">
                            <h3>Connect With Me</h3>
                            <ul className="bt-links">
                                {links.map((link) => (
                                    <li key={link.id}>
                                        <a href={link.url} target="_blank" rel="noreferrer">
                                            {link.platform}
                                        </a>
                                        <button
                                            className="bt-btn edit"
                                            onClick={() => handleEdit(link)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bt-btn delete"
                                            onClick={() => handleDelete(link.id)}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <form className="bt-form" onSubmit={handleSaveLink}>
                                <h4>{editId ? "Edit Social Link" : "Add New Social Link"}</h4>
                                <input
                                    type="text"
                                    placeholder="Platform (e.g. LinkedIn)"
                                    value={platform}
                                    onChange={(e) => setPlatform(e.target.value)}
                                    required
                                />
                                <input
                                    type="url"
                                    placeholder="Profile URL"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    required
                                />
                                <button type="submit" className="bt-btn active">
                                    {editId ? "Update Link" : "Add Link"}
                                </button>
                                {editId && (
                                    <button
                                        type="button"
                                        className="bt-btn cancel"
                                        onClick={() => {
                                            setEditId(null);
                                            setPlatform("");
                                            setUrl("");
                                        }}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </form>
                        </section>
                    )}

                    {active === "info" && (
                        <section className="bt-panel show">
                            <h3>About / Information</h3>
                            <ul className="bt-links">
                                {infos.map((info) => (
                                    <li key={info.id}>
                                        <span>
                                            <b>{info.label}:</b> {info.value}
                                        </span>
                                        <button
                                            className="bt-btn edit"
                                            onClick={() => handleEditInfo(info)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bt-btn delete"
                                            onClick={() => handleDeleteInfo(info.id)}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <form className="bt-form" onSubmit={handleSaveInfo}>
                                <h4>{editInfoId ? "Edit Information" : "Add New Information"}</h4>
                                <input
                                    type="text"
                                    placeholder="Label (e.g. Phone No, Location)"
                                    value={label}
                                    onChange={(e) => setLabel(e.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Value (e.g. +92..., Pakistan)"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    required
                                />
                                <button type="submit" className="bt-btn active">
                                    {editInfoId ? "Update Info" : "Add Info"}
                                </button>
                                {editInfoId && (
                                    <button
                                        type="button"
                                        className="bt-btn cancel"
                                        onClick={() => {
                                            setEditInfoId(null);
                                            setLabel("");
                                            setValue("");
                                        }}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </form>
                        </section>
                    )}
                </div>
            </div>
        </>
    );
};

export default ButtonsToggle;
