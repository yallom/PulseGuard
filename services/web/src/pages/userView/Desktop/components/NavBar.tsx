import PulseGuardSidebar from "./SideBar";
import { Outlet } from "react-router-dom";

export default function NavBar() {
    return (
        <div className="flex w-full h-screen overflow-hidden">
            <PulseGuardSidebar />
            <div className="flex-1 min-w-0 h-screen overflow-hidden">
                <Outlet />
            </div>
        </div>
    );
}