import { useAppLogic } from "./useAppLogic.js";
import StatusBar from "./screens/StatusBar.jsx";
import BottomNav from "./screens/BottomNav.jsx";
import AuthScreens from "./screens/AuthScreens.jsx";
import StudentHomeScreens from "./screens/StudentHomeScreens.jsx";
import StudentLearnScreens from "./screens/StudentLearnScreens.jsx";
import StudentLibraryWorkScreens from "./screens/StudentLibraryWorkScreens.jsx";
import CommonScreens from "./screens/CommonScreens.jsx";
import TeacherScreens from "./screens/TeacherScreens.jsx";
import ParentScreens from "./screens/ParentScreens.jsx";

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
        <CommonScreens v={v} />
        <TeacherScreens v={v} />
        <ParentScreens v={v} />
      </div>
      <BottomNav v={v} />
    </div>
  );
}
