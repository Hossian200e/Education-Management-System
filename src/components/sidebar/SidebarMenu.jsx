import React, { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import { useLocation } from "react-router-dom";

const SidebarMenu = ({ collapsed }) => {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState({});

const menuItems = [
  { title: "Dashboard", icon: "fa fa-home", path: "/Dashboard", key: "dashboard" },

  { title: "User Management", icon: "fa fa-users", path: "/UserManagement", key: "userMgmt" },
  { title: "System Management", icon: "fa fa-cogs", path: "/SystemManagement", key: "systemMgmt" },
  { title: "Institute Setup", icon: "fa fa-building", path: "/InstituteSetup", key: "instituteSetup" },
  { title: "Accounts", icon: "fa fa-credit-card", path: "/Accounts", key: "accounts" },
  { title: "Teacher & Staff Setup", icon: "fa fa-chalkboard-teacher", path: "/TeacherStaff", key: "teacherStaff" },
  { title: "Student Setup", icon: "fa fa-user-graduate", path: "/StudentSetup", key: "studentSetup" },
  { title: "SMS Setup", icon: "fa fa-sms", path: "/SMSSetup", key: "smsSetup" },
  { title: "Candidates", icon: "fa fa-user-friends", path: "/Candidates", key: "candidates" },
  { title: "Calendar View", icon: "fa fa-calendar", path: "/CalendarView", key: "calendarView" },
  { title: "Class Routine", icon: "fa fa-calendar-alt", path: "/ClassRoutine", key: "classRoutine" },
  { title: "Lesson Plan", icon: "fa fa-book", path: "/LessonPlan", key: "lessonPlan" },
  { title: "All Reports", icon: "fa fa-file-alt", path: "/AllReports", key: "allReports" },
  { title: "Attendance Management", icon: "fa fa-clipboard-check", path: "/AttendanceManagement", key: "attendanceMgmt" },
  { title: "Library Management", icon: "fa fa-book-reader", path: "/LibraryManagement", key: "libraryMgmt" },
  { title: "Hostel Management", icon: "fa fa-bed", path: "/HostelManagement", key: "hostelMgmt" },
  { title: "Web Manager", icon: "fa fa-globe", path: "/WebManager", key: "webManager" },
  { title: "Certificates", icon: "fa fa-certificate", path: "/Certificates", key: "certificates" },
  { title: "Settings", icon: "fa fa-sliders-h", path: "/Settings", key: "settings" },
  { title: "Payment Histories", icon: "fa fa-money-bill", path: "/PaymentHistories", key: "paymentHistories" },
  { title: "Leave Management", icon: "fa fa-plane-departure", path: "/LeaveManagement", key: "leaveMgmt" },
  { title: "Download", icon: "fa fa-download", path: "/Download", key: "download" },
  { title: "Counseling", icon: "fa fa-comments", path: "/Counseling", key: "counseling" },
  { title: "Certificate Management", icon: "fa fa-file-certificate", path: "/CertificateManagement", key: "certificateMgmt" },

  // Keep existing Exam & Result with submenus
  {
    title: "Exam & Result",
    icon: "fa fa-graduation-cap",
    key: "exam",
    subMenu: [
      {
        title: "Exam Setup",
        key: "examSetup",
        subMenu: [
          { title: "Exam Template", path: "/ExamTemplate", key: "examTemplate" },
          { title: "Exam List", path: "/ExamList", key: "examList" },
          { title: "Sub Subject List", path: "/SubSubjectList", key: "subSubjectList" },
        ]
      },
      {
        title: "Result Setup",
        key: "resultSetup",
        subMenu: [
          { title: "Pass Config", path: "/PassConfig", key: "passConfig" },
          { title: "Result Config", path: "/ResultConfig", key: "resultConfig" },
          { title: "Merit Config", path: "/MeritConfig", key: "meritConfig" },
          { title: "Grade Point", path: "/GradePoint", key: "gradePoint" },
        ]
      },
      {
        title: "Mark Entry System",
        key: "markEntrySystem",
        subMenu: [
          { title: "Marks Entry", path: "/MarksEntry", key: "marksEntry" },
          { title: "Marks Entry Format", path: "/MarksEntryFormat", key: "marksEntryFormat" },
          { title: "Teacher Mark System", path: "/TeacherMarkSystem", key: "teacherMarkSystem" },
        ]
      },
      {
        title: "Result Process",
        key: "resultProcess",
        subMenu: [
          { title: "Process Result", path: "/ProcessResult", key: "processResult" },
          { title: "Processed Exam List", path: "/ProcessedExamList", key: "processedExamList" },
          { title: "Result Archive", path: "/ResultArchive", key: "resultArchive" },
          { title: "Archived Result List", path: "/ArchivedResultList", key: "archivedResultList" },
        ]
      },
      {
        title: "Exam Report",
        key: "examReport",
        subMenu: [
          { title: "Minimal Admit Card", path: "/MinimalAdmitCard", key: "minimalAdmitCard" },
          { title: "Admit Card Overview", path: "/AdmitCardOverview", key: "admitCardOverview" },
          { title: "Marksheet", path: "/Marksheet", key: "marksheet" },
          { title: "Result Summary", path: "/ResultSummary", key: "resultSummary" },
          { title: "Combined Result", path: "/CombinedResult", key: "combinedResult" },
          { title: "Tabulation Sheet", path: "/TabulationSheet", key: "tabulationSheet" },
          { title: "Subject Wise Result", path: "/SubjectWiseResult", key: "subjectWiseResult" },
          { title: "Exam Mark View", path: "/ExamMarkView", key: "examMarkView" },
        ]
      }
    ]
  }
];


  // Auto-open based on current URL
  useEffect(() => {
    const newKeys = {};
    const findActive = (items, level = 1) => {
      for (let item of items) {
        if (item.path === location.pathname) return [item.key];
        if (item.subMenu) {
          const childKeys = findActive(item.subMenu, level + 1);
          if (childKeys) {
            newKeys[level] = item.key;
            childKeys.forEach((k, i) => (newKeys[level + i + 1] = k));
            return childKeys;
          }
        }
      }
      return null;
    };
    findActive(menuItems);
    setOpenKeys(newKeys);
  }, [location.pathname]);

  return (
    <nav className={`sidebar-menu ${collapsed ? "collapsed" : ""}`}>
      {!collapsed && <h4 className="menu-title">MAIN MENU</h4>}
      {menuItems.map(item => (
        <SidebarItem
          key={item.key}
          item={item}
          collapsed={collapsed}
          level={1}
          openKeys={openKeys}
          setOpenKeys={setOpenKeys}
          dot=""
        />
      ))}

      <style>{`
        .sidebar-menu { flex:1; height:100vh; overflow-y:auto; background:#fff; padding:20px 10px; color:#1f2937; font-family: 'Inter', sans-serif; transition: width 0.3s ease; }
        .sidebar-menu.collapsed { width: 60px; padding: 20px 5px; }
        .menu-title { font-size: 12px; font-weight: 600; color: #6b7280; margin-bottom: 15px; text-transform: uppercase; padding-left: 12px; }
        .sidebar-menu::-webkit-scrollbar { width: 6px; }
        .sidebar-menu::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
        .sidebar-menu::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
        @media (max-width: 768px) { .sidebar-menu { position: fixed; z-index: 50; left: -240px; width: 240px; transition: left 0.3s; } .sidebar-menu.open { left: 0; } }
        
      `}</style>
    </nav>
  );
};

export default SidebarMenu;
