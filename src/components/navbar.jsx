import React, { useEffect, useState, useRef } from "react";
import { 
  FaSun, FaMoon, FaBell, FaEnvelope, FaTimes, 
  FaUser, FaSignOutAlt, FaCog, FaQuestionCircle 
} from "react-icons/fa";
import { fetchNotifications, fetchMessages } from "../services/navbarService";

const Navbar = () => {
  const [time, setTime] = useState("");
  const [greeting, setGreeting] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);

  const profileRef = useRef(null);
  const notifyRef = useRef(null);
  const messageRef = useRef(null);

  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);

  // Update time every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Dhaka",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      });
      setTime(formatter.format(now));

      const hour = now.getHours();
      if (hour < 5) setGreeting("Good Night");
      else if (hour < 12) setGreeting("Good Morning");
      else if (hour < 17) setGreeting("Good Afternoon");
      else if (hour < 20) setGreeting("Good Evening");
      else setGreeting("Good Night");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch notifications/messages
  useEffect(() => {
    const fetchData = async () => {
      const notifs = await fetchNotifications();
      const msgs = await fetchMessages();
      setNotifications(notifs);
      setMessages(msgs);
    };
    fetchData();
    const polling = setInterval(fetchData, 15000);
    return () => clearInterval(polling);
  }, []);

  // Click outside dropdown handler
  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifyRef.current && !notifyRef.current.contains(e.target)) setNotifyOpen(false);
      if (messageRef.current && !messageRef.current.contains(e.target)) setMessagesOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [theme]);

  const toggleTheme = () => {
    const t = theme === "dark" ? "light" : "dark";
    setTheme(t);
    localStorage.setItem("theme", t);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const unreadNotifications = notifications.filter(n => n.unread).length;
  const unreadMessages = messages.filter(m => m.unread).length;

  const markAllRead = (type) => {
    if (type === "notifications") setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    if (type === "messages") setMessages(prev => prev.map(m => ({ ...m, unread: false })));
  };

  const markRead = (type, id) => {
    if (type === "notifications") setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    if (type === "messages") setMessages(prev => prev.map(m => m.id === id ? { ...m, unread: false } : m));
  };

  const deleteItem = (type, id) => {
    if (type === "notifications") setNotifications(prev => prev.filter(n => n.id !== id));
    if (type === "messages") setMessages(prev => prev.filter(m => m.id !== id));
  };

  return (
    <>
      <style>{`
        :root {
          --bg-navbar: ${theme === "dark" ? "#1f2937" : "#ffffff"};
          --bg-surface: ${theme === "dark" ? "#374151" : "#f9fafb"};
          --border-color: ${theme === "dark" ? "#4b5563" : "#e5e7eb"};
          --text-secondary: ${theme === "dark" ? "#9ca3af" : "#6b7280"};
        }
        body.dark-mode { background:#111827; color:#f3f4f6; }

        .navbar { 
          height:64px; 
          background: var(--bg-navbar); 
          border-bottom:1px solid var(--border-color); 
          display:flex; 
          justify-content:space-between; 
          align-items:center; 
          padding:0 24px; 
          flex-wrap: wrap;
        }

        .navbar-left { display:flex; flex-direction:column; }
        .navbar-left h2 { font-size:18px; font-weight:600; color: ${theme==="dark"?"#f3f4f6":"#111827"}; }
        .navbar-left span { font-size:12px; color:var(--text-secondary); }

        .navbar-right { display:flex; align-items:center; gap:18px; flex-wrap: wrap; }
        .time-badge { padding:6px 10px; background: var(--bg-surface); border:1px solid var(--border-color); border-radius:8px; font-size:12px; color:${theme==="dark"?"#f3f4f6":"#111827"}; }

        .icon-btn { font-size:18px; cursor:pointer; position:relative; transition: transform 0.2s; color: ${theme==="dark"?"#f3f4f6":"#111827"}; flex-shrink:0; }
        .icon-btn.shake { animation: shake 0.5s; }
        @keyframes shake { 0%,100%{transform:rotate(0deg);}25%{transform:rotate(-15deg);}50%{transform:rotate(15deg);}75%{transform:rotate(-10deg);} }

        .badge { position:absolute; top:-6px; right:-8px; background:#ef4444; color:#fff; font-size:9px; padding:2px 5px; border-radius:10px; }

        /* Dropdowns */
        .dropdown { 
          position:absolute; top:45px; right:0; width:280px; background: var(--bg-surface); 
          border:1px solid var(--border-color); border-radius:12px; 
          box-shadow:0 10px 30px rgba(0,0,0,.25); overflow:hidden; z-index:10; 
          opacity:0; transform:translateY(-10px); 
          transition: all 0.3s ease;
        }
        .dropdown.open { opacity:1; transform:translateY(0); }

        .dropdown h4 { padding:10px 12px; font-size:13px; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; }
        .dropdown h4 button { background:none; border:none; cursor:pointer; font-size:11px; color:#3b82f6; }
        .dropdown-list { max-height:250px; overflow-y:auto; }

        .dropdown-item { padding:10px 12px; font-size:12px; display:flex; align-items:center; justify-content:flex-start; gap:8px; cursor:pointer; }
        .dropdown-item.unread { background: rgba(59,130,246,.08); font-weight:500; }
        .dropdown-item button { background:none; border:none; color:#ef4444; cursor:pointer; font-size:12px; }

        .profile-btn { display:flex; align-items:center; gap:8px; cursor:pointer; }
        .avatar { width:32px; height:32px; border-radius:50%; background:#12418d; color:#fff; display:flex; align-items:center; justify-content:center; font-weight:600; }

        .profile-menu button { 
          width:100%; padding:10px; display:flex; align-items:center; gap:8px; 
          background:none; border:none; text-align:left; cursor:pointer; 
          color:${theme==="dark"?"#f3f4f6":"#111827"}; transition: background 0.2s; 
        }
        .profile-menu button:hover { background: rgba(59,130,246,.1); }
        .profile-menu .logout-btn { color:#ef4444; font-weight:500; }
        .profile-menu .logout-btn:hover { background: rgba(239,68,68,0.1); }

        @media(max-width:768px){
          .navbar-left { flex-direction:column; margin-bottom:8px; }
          .navbar-right { gap:12px; }
          .dropdown { width:220px; right:0; }
        }
        @media(max-width:480px){
          .navbar-left h2 { font-size:16px; }
          .navbar-left span { font-size:11px; }
          .dropdown { width:180px; }
          .time-badge { font-size:11px; padding:4px 8px; }
          .icon-btn { font-size:16px; }
        }
      `}</style>

      <div className="navbar">
        <div className="navbar-left">
          <h2>{greeting}, Super!</h2>
          <span>{new Date().toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric", year:"numeric" })}</span>
        </div>

        <div className="navbar-right">
          <div className="time-badge">{time}</div>

          {/* Notifications */}
          <div
            className={`icon-btn ${unreadNotifications > 0 ? "shake" : ""}`}
            ref={notifyRef}
            onClick={() => setNotifyOpen(!notifyOpen)}
          >
            <FaBell />
            {unreadNotifications > 0 && <span className="badge">{unreadNotifications}</span>}
            <div className={`dropdown ${notifyOpen ? "open" : ""}`}>
              <h4>
                Notifications
                {unreadNotifications > 0 && <button onClick={() => markAllRead("notifications")}>Mark all read</button>}
              </h4>
              <div className="dropdown-list">
                {notifications.length === 0 && <div style={{ padding:"10px", fontSize:"12px", color:"var(--text-secondary)" }}>No notifications</div>}
                {notifications.map(n => (
                  <div key={n.id} className={`dropdown-item ${n.unread ? "unread" : ""}`}>
                    <span onClick={() => markRead("notifications", n.id)}>{n.text}</span>
                    <button onClick={() => deleteItem("notifications", n.id)}><FaTimes /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            className={`icon-btn ${unreadMessages > 0 ? "shake" : ""}`}
            ref={messageRef}
            onClick={() => setMessagesOpen(!messagesOpen)}
          >
            <FaEnvelope />
            {unreadMessages > 0 && <span className="badge">{unreadMessages}</span>}
            <div className={`dropdown ${messagesOpen ? "open" : ""}`}>
              <h4>
                Messages
                {unreadMessages > 0 && <button onClick={() => markAllRead("messages")}>Mark all read</button>}
              </h4>
              <div className="dropdown-list">
                {messages.length === 0 && <div style={{ padding:"10px", fontSize:"12px", color:"var(--text-secondary)" }}>No messages</div>}
                {messages.map(m => (
                  <div key={m.id} className={`dropdown-item ${m.unread ? "unread" : ""}`}>
                    <span onClick={() => markRead("messages", m.id)}>{m.text}</span>
                    <button onClick={() => deleteItem("messages", m.id)}><FaTimes /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Theme */}
          <div className="icon-btn" onClick={toggleTheme}>
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </div>

          {/* Profile */}
          <div className="icon-btn" ref={profileRef}>
            <div className="profile-btn" onClick={() => setProfileOpen(!profileOpen)}>
              <div className="avatar">S</div>
              <div>
                <div style={{ fontSize:"13px" }}>Super Admin</div>
                <div style={{ fontSize:"11px", color:"var(--text-secondary)" }}>super admin</div>
              </div>
            </div>

            <div className={`dropdown profile-menu ${profileOpen ? "open" : ""}`}>
              <button onClick={() => { setProfileOpen(false); navigate("/profile"); }}>
  <FaUser /> Profile
</button>

              <button><FaCog /> Settings</button>
              <button><FaQuestionCircle /> Help</button>
              <button className="logout-btn" onClick={logout}><FaSignOutAlt /> Logout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
