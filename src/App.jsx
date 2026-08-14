import { useAppLogic } from "./useAppLogic.js";
import StatusBar from "./screens/StatusBar.jsx";
import BottomNav from "./screens/BottomNav.jsx";
import AuthScreens from "./screens/AuthScreens.jsx";
import StudentHomeScreens from "./screens/StudentHomeScreens.jsx";
import StudentLearnScreens from "./screens/StudentLearnScreens.jsx";
import StudentLibraryWorkScreens from "./screens/StudentLibraryWorkScreens.jsx";
import StudentWorkScreens from "./screens/StudentWorkScreens.jsx";
import CommonScreens from "./screens/CommonScreens.jsx";
import TeacherScreens from "./screens/TeacherScreens.jsx";
import ParentScreens from "./screens/ParentScreens.jsx";
import FilterSheet from "./screens/FilterSheet.jsx";
import AssignSheet from "./screens/AssignSheet.jsx";
import LangSheet from "./screens/LangSheet.jsx";

export default function App() {
  const v = useAppLogic("tabs");

  return (
    <div className="yb-frame">
      <StatusBar />
      <div className="yb-scroll yb-main" style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden", position: "relative" }}>
        <AuthScreens v={v} />
        <StudentHomeScreens v={v} />
        <StudentLearnScreens v={v} />
        <StudentLibraryWorkScreens v={v} />
        <StudentWorkScreens v={v} />
        <CommonScreens v={v} />
        <TeacherScreens v={v} />
        <ParentScreens v={v} />
      </div>
      <BottomNav v={v} />
      <FilterSheet v={v} />
      <AssignSheet v={v} />
      <LangSheet v={v} />
    </div>
  );
}
