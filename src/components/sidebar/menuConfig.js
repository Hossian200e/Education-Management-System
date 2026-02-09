export const menuConfig = [
  {
    title: "Dashboard",
    icon: "fa fa-home",
    path: "/admin/dashboard",
    roles: ["admin", "teacher"]
  },
  {
    title: "User Management",
    icon: "fa fa-users",
    roles: ["admin"],
    children: [
      {
        title: "Teacher List",
        path: "/admin/teachers"
      },
      {
        title: "Student List",
        path: "/admin/students"
      }
    ]
  },
  {
    title: "Exam & Result",
    icon: "fa fa-graduation-cap",
    roles: ["admin", "teacher"],
    children: [
      {
        title: "Exam Setup",
        children: [
          { title: "Exam Template", path: "/exam/template" },
          { title: "Exam List", path: "/exam/list" }
        ]
      },
      {
        title: "Result Setup",
        children: [
          { title: "Pass Config", path: "/result/pass" },
          { title: "Result Config", path: "/result/config" }
        ]
      }
    ]
  }
];
