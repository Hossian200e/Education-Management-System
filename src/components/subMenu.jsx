import React from "react";
import { Link } from "react-router-dom";
import SubMenu from "./subMenu";

// Menu Items
const menuItems = [
  { title: "Dashboard", icon: "fa fa-home", path: "/AdminDashboard" },
  { title: "Institute Setup", icon: "fa fa-university", path: "/InstituteSetup" },
  { title: "Accounts", icon: "fa fa-calculator", path: "/Accounts" },
  {
    title: "Teacher & Staff Setup",
    icon: "fa fa-user-tie",
    subMenu: [
      { title: "Teacher List", path: "/TeacherList" },
      { title: "Staff List", path: "/StaffList" },
    ],
  },
  {
    title: "Student Setup",
    icon: "fa fa-graduation-cap",
    subMenu: [
      { title: "Student List", path: "/StudentList" },
      { title: "Student Class Mapping", path: "/ClassMapping" },
    ],
  },
  { title: "SMS Setup", icon: "fa fa-envelope", path: "/SMSSetup" },
  { title: "Candidates", icon: "fa fa-users", path: "/Candidates" },
  { title: "Calendar View", icon: "fa fa-calendar", path: "/CalendarView" },
  { title: "Class Routine", icon: "fa fa-calendar-alt", path: "/ClassRoutine" },
  { title: "Exam & Result", icon: "fa fa-clipboard", path: "/ExamResult" },
  { title: "Lesson Plan", icon: "fa fa-book", path: "/LessonPlan" },
  { title: "All Reports", icon: "fa fa-folder", path: "/AllReports" },
  { title: "Attendance Management", icon: "fa fa-check-square", path: "/Attendance" },
  { title: "Library Management", icon: "fa fa-book-reader", path: "/Library" },
  { title: "Hostel Management", icon: "fa fa-home", path: "/Hostel" },
  { title: "Web Manager", icon: "fa fa-globe", path: "/WebManager" },
  { title: "Certificates", icon: "fa fa-certificate", path: "/Certificates" },
];

const SidebarMenu = () => {
  return (
    <nav className="sidebar">
      <div className="menu-heading">MAIN MENU</div>
      <ul>
        {menuItems.map((item, index) =>
          item.subMenu ? <SubMenu key={index} item={item} /> : (
            <li key={index}>
              <Link to={item.path} className="menu-link">
                <i className={item.icon} /> {item.title}
              </Link>
            </li>
          )
        )}
      </ul>

      <style>{`
        .sidebar {
          width: 250px;
          background: #ffffff;
          height: 100vh;
          display: flex;
          flex-direction: column;
          font-family: "Poppins", sans-serif;
          border-right: 1px solid #e5e7eb;
          overflow-y: auto;
        }
        .menu-heading {
          font-weight: bold;
          font-size: 13px;
          color: #777;
          padding: 10px 15px;
          border-bottom: 1px solid #e5e7eb;
          text-transform: uppercase;
        }
        ul { list-style: none; margin: 0; padding: 0; }
        li { padding: 5px 0; }
        a.menu-link {
          display: flex;
          align-items: center;
          padding: 10px 15px;
          color: #333;
          text-decoration: none;
        }
        a.menu-link i {
          margin-right: 10px;
        }
      `}</style>
    </nav>
  );
};

export default SidebarMenu;
