"use client";

import { Routes, Route, useLocation } from "react-router-dom";
import TableListPing from "./testing/TableListPing";
import TableListPost from "./testing/TableListPost";
import Login from "./pages/Login";
import DashboardAdmin from "./(admin)/pages/DashboardAdmin";
import SidebarAdmin from "./(admin)/components/SidebarAdmin";
import DetailClass from "./(admin)/pages/DetailClass";
import ManageClass10 from "./(admin)/pages/ManageClass10";
import ManageClass11 from "./(admin)/pages/ManageClass11";
import ManageClass12 from "./(admin)/pages/ManageClass12";
import DashboardTeacher from "./(teacher)/pages/DashboardTeacher";
import DashboardStudent from "./(student)/pages/DashboardStudent";
import ManageAccStudent from "./(admin)/pages/ManageAccStudent";
import SidebarTeacher from "./(teacher)/components/SidebarTeacher";
import ManageAccTeacher from "./(admin)/pages/ManageAccTeacher";
import CreateSubjects from "./(teacher)/pages/CreateSubjects";
import ManageTaskExam from "./(teacher)/pages/ManageTaskExam";
import ManageSubjects10 from "./(teacher)/pages/ManageSubjects10";
import ManageSubjects11 from "./(teacher)/pages/ManageSubjects11";
import ManageSubjects12 from "./(teacher)/pages/ManageSubjects12";
import CreateSubjects10 from "./(teacher)/pages/CreateSubjects10";
import CreateSubjects11 from "./(teacher)/pages/CreateSubjects11";
import CreateSubjects12 from "./(teacher)/pages/CreateSubjects12";
import EditSubjects from "./(teacher)/pages/EditSubjects";
import DetailSubjects from "./(teacher)/pages/DetailSubjects";
import SidebarStudent from "./(student)/components/SidebarStudent";
import MyClasses from "./(student)/pages/MyClasses";
import GroupDiscussions from "./(student)/pages/GroupDiscussions";
import CreateDiscussions from "./(student)/pages/CreateDiscussions";
import MyDetailClasses from "./(student)/pages/MyDetailClasses";
import MyDetailSubject from "./(student)/pages/MyDetailSubject";
import CreateExercise from "./(teacher)/pages/CreateExercise";
import PreviewExercise from "./(teacher)/pages/PreviewExercise";
import EditExercise from "./(teacher)/pages/EditExercise";
import MyClassesTask from "./(student)/pages/MyClassesTask";
import MyClassesExam from "./(student)/pages/MyClassesExam";
import MyDetailClassesTask from "./(student)/pages/MyDetailClassesTask";
import MyTask from "./(student)/pages/MyTask";
import MyExams from "./(student)/pages/MyExams";
import PreviewAnExam from "./(teacher)/pages/PreviewAnExam";
import CreateExam from "./(teacher)/pages/CreateExam";
import EditExam from "./(teacher)/pages/EditExam";

const App = () => {
  const location = useLocation();

  const isAdminPage = [
    "/DashboardAdmin",
    "/ManageClass10",
    "/ManageClass11",
    "/ManageClass12",
    "/ManageAccStudent",
    "/ManageAccTeacher",
  ].some(path => location.pathname.startsWith(path)) || location.pathname.startsWith("/class/");

  const isTeacherPage = [
    "/DashboardTeacher",
    "/ManageSubjects10",
    "/ManageSubjects11",
    "/ManageSubjects12",
    "/ManageTaskExam",
    "/CreateSubjects",
    "/EditSubjects",
    "/DetailSubjects",
    "/CreateExercise",
    "/PreviewExercise",
    "/EditExercise",
    "/PreviewAnExam",
    "/CreateExam",
    "/EditExam",
  ].some(path => location.pathname.startsWith(path));

  const isStudentPage = [
    "/DashboardStudent",
    "/MyClasses",
    "/GroupDiscussions",
    "/CreateDiscussions",
    "/MyDetailClasses",
    "/MyDetailSubject",
    "/MyClassesTask",
    "/MyClassesExam",
    "/MyDetailClassesTask",
    "/MyTask",
    "/MyExams",
  ].some(path => location.pathname.startsWith(path));
  
  const endPointTest = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_PING_URL;
  const endPointUsers = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_USERS_URL;
  const endPointStudents = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_STUDENT_URL;
  const endPointTeachers = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_TEACHER_URL;
  const endPointClasses = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_CLASSES_URL;
  const endPointMaterials = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_MATERIALS_URL;
  const endPointDiscussions = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_DISCUSSIONS_URL;
  const endPointExercises = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_EXERCISES_URL;
  const endPointExams = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_EXAMS_URL;
  const endPointDiscussionsMaterial = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_DISCUSSIONS_MATERIAL_URL;

  return (
    <>
      {isAdminPage && <SidebarAdmin />}
      {isTeacherPage && <SidebarTeacher />}
      {isStudentPage && <SidebarStudent />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/test" element={<TableListPing endPointParams={endPointTest} />} />
        <Route path="/post" element={<TableListPost endPointParams={endPointTest} />} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/ManageClass10" element={<ManageClass10 endPointParams={endPointClasses} />} />
        <Route path="/ManageClass11" element={<ManageClass11 endPointParams={endPointClasses} />} />
        <Route path="/ManageClass12" element={<ManageClass12 endPointParams={endPointClasses} />} />
        <Route path="/class/:id" element={<DetailClass endPointParams={endPointClasses} />} />
        <Route path="/DashboardTeacher" element={<DashboardTeacher />} />
        <Route path="/ManageAccStudent" element={<ManageAccStudent endPointParams={endPointStudents} />} />
        <Route path="/ManageAccTeacher" element={<ManageAccTeacher endPointParams={endPointTeachers} />} />
        <Route path="/ManageSubjects10" element={<ManageSubjects10 endPointParams={endPointMaterials}/>} />
        <Route path="/ManageSubjects11" element={<ManageSubjects11 endPointParams={endPointMaterials}/>} />
        <Route path="/ManageSubjects12" element={<ManageSubjects12 endPointParams={endPointMaterials}/>} />
        <Route path="/CreateSubjects" element={<CreateSubjects endPointParams={endPointMaterials}/>} />
        <Route path="/CreateSubjects10" element={<CreateSubjects10 endPointParams={endPointMaterials}/>} />
        <Route path="/CreateSubjects11" element={<CreateSubjects11 endPointParams={endPointMaterials}/>} />
        <Route path="/CreateSubjects12" element={<CreateSubjects12 endPointParams={endPointMaterials}/>} />
        <Route path="/EditSubjects" element={<EditSubjects endPointParams={endPointMaterials}/>} />
        <Route path="/DetailSubjects" element={<DetailSubjects endPointParams={endPointMaterials}/>} />
        <Route path="/ManageTaskExam" element={<ManageTaskExam />} />
        <Route path="/DashboardStudent" element={<DashboardStudent />}/>
        <Route path="/MyClasses" element={<MyClasses endPointParams={endPointClasses} />}/>
        <Route path="/GroupDiscussions" element={<GroupDiscussions endPointParams={endPointDiscussions}/>} />
        <Route path="/CreateDiscussions" element={<CreateDiscussions endPointParams={endPointDiscussions}/>} />
        <Route path="/MyDetailClasses/:id" element={<MyDetailClasses endPointParams={endPointMaterials} />}/>
        <Route path="/MyDetailSubject/:id" element={<MyDetailSubject endPointParams={endPointMaterials} />}/>
        <Route path="/CreateExercise" element={<CreateExercise endPointParams={endPointExercises} />} />
        <Route path="/PreviewExercise" element={<PreviewExercise endPointParams={endPointExercises} />} />
        <Route path="/EditExercise" element={<EditExercise endPointParams={endPointExercises} />} />
        <Route path="/MyClassesTask" element={<MyClassesTask endPointParams={endPointClasses} />} />
        <Route path="/MyClassesExam" element={<MyClassesExam endPointParams={endPointClasses} />} />
        <Route path="/MyDetailClassesTask/:id" element={<MyDetailClassesTask endPointParams={endPointMaterials} />} />
        <Route path="/MyTask" element={<MyTask endPointParams={endPointExercises} />} />
        <Route path="/MyExams" element={<MyExams endPointParams={endPointExams} />} />
        <Route path="/PreviewAnExam" element={<PreviewAnExam endPointParams={endPointExams} />} />
        <Route path="/CreateExam" element={<CreateExam endPointParams={endPointExams} />} />
        <Route path="/EditExam" element={<EditExam endPointParams={endPointExams} />} />
      </Routes>
    </>
  );
};

export default App;
