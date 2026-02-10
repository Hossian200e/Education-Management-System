import React, { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import { useLocation } from "react-router-dom";

const SidebarMenu = ({ collapsed }) => {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState({});

// Single-level top-level menus (no submenus) with uniform icon spacing
const menuItems = [
  { title: "Dashboard",             icon: "fa fa-home",                path: "/Dashboard",            key: "dashboard",            iconGap: 12 },
  
  {
  title: "User Management",
  icon: "fa fa-users",
  key: "userMgmt",
  iconGap: 12,
  subMenu: [
{
  title: "User Group List",
  path: "/user-management/user-group-list",
  key: "userGroupList"
}
,
    {
      title: "User Group Role",    
      path: "/UserGroupRoleManagement",
      key: "userGroupRoleMgmt"
    }
  ]
},

  { title: "System Management",     icon: "fa fa-cogs",                path: "/SystemManagement",    key: "systemMgmt",           iconGap: 12 },
  { title: "Institute Setup",       icon: "fa fa-building",            path: "/InstituteSetup",      key: "instituteSetup",       iconGap: 12 },
  { title: "Accounts",              icon: "fa fa-credit-card",         path: "/Accounts",            key: "accounts",             iconGap: 12 },
  { title: "Teacher & Staff Setup", icon: "fa fa-chalkboard",          path: "/TeacherStaff",        key: "teacherStaff",         iconGap: 12 },
  { title: "Student Setup",         icon: "fa fa-user-graduate",       path: "/StudentSetup",        key: "studentSetup",         iconGap: 12 },
  { title: "SMS Setup",             icon: "fa fa-comment-alt",         path: "/SMSSetup",            key: "smsSetup",             iconGap: 12 },
  { title: "Candidates",            icon: "fa fa-user-friends",        path: "/Candidates",          key: "candidates",           iconGap: 12 },
  { title: "Calendar View",         icon: "fa fa-calendar",            path: "/CalendarView",        key: "calendarView",         iconGap: 12 },
  { title: "Class Routine",         icon: "fa fa-calendar-alt",        path: "/ClassRoutine",        key: "classRoutine",         iconGap: 12 },
  { title: "Lesson Plan",           icon: "fa fa-book",                path: "/LessonPlan",          key: "lessonPlan",           iconGap: 12 },
  { title: "All Reports",           icon: "fa fa-file-alt",            path: "/AllReports",          key: "allReports",           iconGap: 12 },
  { title: "Attendance Management", icon: "fa fa-clipboard-check",     path: "/AttendanceManagement", key: "attendanceMgmt",       iconGap: 12 },
  { title: "Library Management",    icon: "fa fa-book-reader",         path: "/LibraryManagement",   key: "libraryMgmt",           iconGap: 12 },
  { title: "Hostel Management",     icon: "fa fa-bed",                 path: "/HostelManagement",    key: "hostelMgmt",           iconGap: 12 },
  { title: "Web Manager",           icon: "fa fa-globe",               path: "/WebManager",          key: "webManager",           iconGap: 12 },
  { title: "Certificates",          icon: "fa fa-certificate",         path: "/Certificates",        key: "certificates",         iconGap: 12 },
  { title: "Settings",              icon: "fa fa-sliders-h",           path: "/Settings",            key: "settings",             iconGap: 12 },
  { title: "Payment Histories",     icon: "fa fa-money-bill-alt",      path: "/PaymentHistories",    key: "paymentHistories",     iconGap: 12 },
  { title: "Leave Management",      icon: "fa fa-plane-departure",     path: "/LeaveManagement",     key: "leaveMgmt",            iconGap: 12 },
  { title: "Download",              icon: "fa fa-download",            path: "/Download",            key: "download",             iconGap: 12 },
  { title: "Counseling",            icon: "fa fa-comments",            path: "/Counseling",          key: "counseling",           iconGap: 12 },
  { title: "Certificate Management",icon: "fa fa-file-alt",            path: "/CertificateManagement", key: "certificateMgmt",    iconGap: 12 },


    // Nested menu (with submenus) – Exam & Result
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
          ],
        },
        {
          title: "Result Setup",
          key: "resultSetup",
          subMenu: [
            { title: "Pass Config", path: "/PassConfig", key: "passConfig" },
            { title: "Result Config", path: "/ResultConfig", key: "resultConfig" },
            { title: "Merit Config", path: "/MeritConfig", key: "meritConfig" },
            { title: "Grade Point", path: "/GradePoint", key: "gradePoint" },
          ],
        },
        {
          title: "Mark Entry System",
          key: "markEntrySystem",
          subMenu: [
            { title: "Marks Entry", path: "/MarksEntry", key: "marksEntry" },
            { title: "Marks Entry Format", path: "/MarksEntryFormat", key: "marksEntryFormat" },
            { title: "Teacher Mark System", path: "/TeacherMarkSystem", key: "teacherMarkSystem" },
          ],
        },
        {
          title: "Result Process",
          key: "resultProcess",
          subMenu: [
            { title: "Process Result", path: "/ProcessResult", key: "processResult" },
            { title: "Processed Exam List", path: "/ProcessedExamList", key: "processedExamList" },
            { title: "Result Archive", path: "/ResultArchive", key: "resultArchive" },
            { title: "Archived Result List", path: "/ArchivedResultList", key: "archivedResultList" },
          ],
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
          ],
        },
      ],
    },
  ];

  // Auto-open sidebar based on current URL
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
        .sidebar-menu {
          flex: 1;
          padding: 20px 10px;
          background: var(--sidebar-bg);
          color: var(--text);
          overflow-y: auto;
        }

        .menu-title {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 15px;
          padding-left: 12px;
        }

        :root {
          --sidebar-bg: #ffffff;
          --text: #1f2937;
        }

        body.dark-mode {
          --sidebar-bg: #1f2937;
          --text: #e5e7eb;
        }

        .sidebar-menu::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar-menu::-webkit-scrollbar-thumb {
          background: #6b7280;
          border-radius: 4px;
        }
      `}</style>
    </nav>
  );
};

export default SidebarMenu;
