"use client";

import { Routes, Route, useLocation } from "react-router-dom";
import TableListPing from "./testing/TableListPing";
import TableListPost from "./testing/TableListPost";
import Login from "./pages/Login";
import DashboardAdmin from "./(admin)/pages/DashboardAdmin";
import SidebarAdmin from "./(admin)/components/SidebarAdmin";
import ManageClass from "./(admin)/pages/ManageClass";
import DetailClass from "./(admin)/pages/DetailClass";
import ManageClass10 from "./(admin)/pages/ManageClass10";
import ManageClass11 from "./(admin)/pages/ManageClass11";
import ManageClass12 from "./(admin)/pages/ManageClass12";
import DashboardTeacher from "./(teacher)/pages/DashboardTeacher";
import StudentPage from "./(student)/pages/StudentPage";
import ManageAccStudent from "./(admin)/pages/ManageAccStudent";
import SidebarTeacher from "./(teacher)/components/SidebarTeacher";
import ManageAccTeacher from "./(admin)/pages/ManageAccTeacher";
import ManageSubjects from "./(teacher)/pages/ManageSubjects";
import CreateSubjects from "./(teacher)/pages/CreateSubjects";

const App = () => {
  const location = useLocation();
  const isAdminPage = 
  location.pathname === "/DashboardAdmin" ||
  location.pathname.startsWith("/class/") || 
  location.pathname === "/ManageClass10" ||
  location.pathname === "/ManageClass11" ||
  location.pathname === "/ManageClass12" ||
  location.pathname === "/ManageAccStudent" ||
  location.pathname === "/ManageAccTeacher";

  const isTeacherPage = location.pathname === "/DashboardTeacher" || location.pathname === "/ManageSubjects" || location.pathname === "/CreateSubjects";
  const isStudentPage = location.pathname === "/StudentPage";
  const endPointTest = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_PING_URL;
  const endPointUsers = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_USERS_URL;
  const endPointStudents = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_STUDENT_URL;
  const endPointTeachers = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_TEACHER_URL;
  const endPointClasses = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_CLASSES_URL; 

  return (
    <>
      {isAdminPage && <SidebarAdmin />}
      {isTeacherPage && <SidebarTeacher />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<TableListPing endPointParams={endPointTest} />} />
        <Route path="/post" element={<TableListPost endPointParams={endPointTest} />} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/ManageClass10" element={<ManageClass10 endPointParams={endPointClasses} />} />
        <Route path="/ManageClass11" element={<ManageClass11 endPointParams={endPointClasses} />} />
        <Route path="/ManageClass12" element={<ManageClass12 endPointParams={endPointClasses} />} />
        <Route path="/class/:id" element={<DetailClass endPointParams={endPointClasses} />} />
        <Route path="/ManageSubjects" element={<ManageSubjects />} />
        <Route path="/DashboardTeacher" element={<DashboardTeacher />} />
        <Route path="/StudentPage" element={<StudentPage />} />
        <Route path="/ManageAccStudent" element={<ManageAccStudent endPointParams={endPointStudents} />} />
        <Route path="/ManageAccTeacher" element={<ManageAccTeacher endPointParams={endPointTeachers} />} />
        <Route path="/ManageSubjects" element={<ManageSubjects />} />
        <Route path="/CreateSubjects" element={<CreateSubjects />} />
      </Routes>
    </>
  );
};

export default App;
