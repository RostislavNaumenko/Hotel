import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "assets/theme";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Layout from "scenes/layout";
import  Dashboard  from "scenes/dashboard";
import Navbar from "components/Navbar";
import Room from  "scenes/room"
import Workers from "scenes/workers"
import WorkList from "scenes/plan"
import Schedule from "scenes/Schedule";
import WorkerPlan from "scenes/workerPlan"
import Login from "scenes/login";
import WorkerSchedule from "scenes/workerSchedule";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme  = useMemo(() => createTheme(themeSettings(mode)), [mode])


  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route element={<Layout />}>

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/rooms" element={<Room />} />
              <Route path="/workers" element={<Workers />} />
              <Route path="/workList" element={<WorkList />} />
              <Route path="/makeschedule" element={<Schedule />} />
              <Route path="/dailyplan" element={<WorkerPlan />} />
              <Route path="/weeklyschedule" element={<WorkerSchedule />} />
              
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
