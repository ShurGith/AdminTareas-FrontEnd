import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import CreateProjectView from "./views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import Page404 from "./views/Page404";
import ProjectDetailsView from "./views/ProjectDetailsView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  element={<AppLayout />} >
        <Route path="/" element={<DashboardView />} index />
        <Route path="/projects/create" element={<CreateProjectView />} />
        <Route path="/projects/:projectId/edit" element={<EditProjectView />} />
        <Route path="/projects/:projectId" element={<ProjectDetailsView />} />
        <Route path="/404" element={<Page404/>} />
        <Route path="*" element={<Page404/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}