import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white">
      {/* yahan public top navbar / banner chaho to add karo */}
      <Outlet />
      {/* yahan public footer wagaira */}
    </div>
  );
}
