import React, { useState, useEffect } from "react";
import "./AdminMessage.css";
import Sidebar from "./Sidebar";
import { FaSearch, FaTrashAlt, FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  // ✅ Fetch messages from backend
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8080/backend-portfolio/get_messages.php")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  // ✅ Mark message as read
  const handleRowClick = (id) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id && !msg.read ? { ...msg, read: true } : msg
      )
    );
  };

  // ✅ Delete message (frontend + backend)
  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this message?")) {
      // frontend update
      setMessages((prev) => prev.filter((msg) => msg.id !== id));

      // backend delete
      fetch(`http://localhost:8080/backend-portfolio/delete_message.php?id=${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log("Message deleted successfully");
          } else {
            alert("Failed to delete from database!");
            // Revert the frontend change if backend deletion failed
            fetch("http://localhost:8080/backend-portfolio/get_messages.php")
              .then((res) => res.json())
              .then((data) => setMessages(data))
              .catch((err) => console.error("Error refetching messages:", err));
          }
        })
        .catch((err) => {
          console.error("Error deleting message:", err);
          alert("Error deleting message. Please try again.");
          // Revert the frontend change if backend deletion failed
          fetch("http://localhost:8080/backend-portfolio/get_messages.php")
            .then((res) => res.json())
            .then((data) => setMessages(data))
            .catch((err) => console.error("Error refetching messages:", err));
        });
    }
  };

  // ✅ Filter messages by search term
  const filteredMessages = messages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const paginatedMessages = filteredMessages.slice(startIndex, startIndex + itemsPerPage);

  // ✅ Format date for better readability
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Sidebar />
      <div className="container">
        <header>
          <div className="header-title">
            <h1>Contact Messages</h1>
            <p className="message-subtitle">Messages from your portfolio contact form</p>
          </div>
          <div className="header-controls">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="messages-card">
          {isLoading ? (
            <div className="loading">Loading messages...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : filteredMessages.length === 0 ? (
            <div className="no-messages">
              {searchTerm ? "No messages match your search." : "No messages yet."}
            </div>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Received</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMessages.map((msg) => (
                    <tr 
                     style={{height:"30px"}}
                    >
                    
                      <td>{msg.name}</td>
                      <td>
                        <a href={`mailto:${msg.email}`} className="email-link">
                          {msg.email}
                        </a>
                      </td>
                      <td className="msg-preview">
                        {msg.message.length > 40
                          ? msg.message.substring(0, 40) + "..."
                          : msg.message}
                      </td>
                      <td>{formatDate(msg.created_at)}</td>
                      <td>
                        <button
                          className="action-btn delete"
                          onClick={(e) => handleDelete(e, msg.id)}
                          title="Delete"
                        >
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-btn"
                    disabled={activePage === 1}
                    onClick={() => setActivePage(activePage - 1)}
                  >
                    &laquo;
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      className={`pagination-btn ${activePage === index + 1 ? "active" : ""}`}
                      onClick={() => setActivePage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button
                    className="pagination-btn"
                    disabled={activePage === totalPages}
                    onClick={() => setActivePage(activePage + 1)}
                  >
                    &raquo;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ContactMessages;