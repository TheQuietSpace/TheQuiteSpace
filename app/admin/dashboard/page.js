"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import RetreatsComponent from "@/app/components/RetreatsComponent";
import WorkshopComponent from "@/app/components/WorkshopComponent";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  UserCheck, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X,
  Eye,
  Presentation,
  Search,
  Pencil,
  Trash2,
  TrendingUp
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const StatCard = ({ title, value, icon: Icon, trend, color = "indigo" }) => (
  <div className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium tracking-tight">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        {trend && (
          <div className="flex items-center mt-3 text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-500 mr-2" />
            <span className="text-emerald-600 font-medium">{trend}% from last month</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-lg bg-${color}-100`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
    </div>
  </div>
);

const DashboardComponent = ({ user }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-gray-600 mt-2 text-lg">Welcome back, {user?.email?.split('@')[0] || 'Admin'}</p>
      </div>
    </div>
    {/* No hard-coded data, components can be added later */}
  </div>
);



const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, key: "Dashboard" },
  { name: "Retreats", icon: Calendar, key: "Retreats" },
  { name: "Workshop", icon: Presentation, key: "Workshop" },
  { name: "Participants", icon: Users, key: "Participants" },
  { name: "Instructors", icon: UserCheck, key: "Instructors" },
  { name: "Content", icon: FileText, key: "Content" },
  { name: "Inquiries", icon: MessageSquare, key: "Inquiries" },
  { name: "Settings", icon: Settings, key: "Settings" }
];

const Sidebar = ({ activeComponent, setActiveComponent, isOpen, setIsOpen, user }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin";
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-60 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-amber-100 lg:bg-transparent
        transform transition-transform duration-300 ease-in-out lg:shadow-none shadow-2xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Profile Section */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6 lg:mb-4">
              <button
                onClick={() => setIsOpen(false)}
                className="lg:hidden text-gray-600 hover:text-amber-600 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">
                  {user?.email?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 font-semibold text-base truncate">
                  {user?.email?.split('@')[0] || 'Admin'}
                </p>
                <p className="text-gray-500 text-sm truncate">
                  {user?.email || 'admin@example.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => {
                      setActiveComponent(item.key);
                      setIsOpen(false);
                    }}
                    className={`
                      w-full flex items-center px-4 py-3 rounded-full text-left transition-all duration-200 font-medium
                      ${activeComponent === item.key 
                        ? 'bg-blue-500 text-white shadow-sm' 
                        : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer - Logout */}
          <div className="p-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-full transition-all duration-200 text-sm font-medium"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const PlaceholderComponent = ({ title }) => (
  <div className="bg-white rounded-2xl shadow-md p-10 text-center">
    <div className="max-w-md mx-auto">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Eye className="w-10 h-10 text-gray-400" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">{title}</h2>
      <p className="text-gray-600 text-lg">This section is under development. Content will be added soon.</p>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/admin");
      } else {
        setUser(data.user);
      }
    };
    checkUser();
  }, [router]);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <DashboardComponent user={user} />;
      case "Retreats":
        return <RetreatsComponent />;
      case "Workshop":
        return <WorkshopComponent />;
      case "Participants":
        return <PlaceholderComponent title="Participants Management" />;
      case "Instructors":
        return <PlaceholderComponent title="Instructors Management" />;
      case "Content":
        return <PlaceholderComponent title="Content Management" />;
      case "Inquiries":
        return <PlaceholderComponent title="Inquiries Management" />;
      case "Settings":
        return <PlaceholderComponent title="Settings" />;
      default:
        return <DashboardComponent user={user} />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-amber-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-100">
      <div className="flex h-screen">
        <Sidebar 
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          user={user}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <div className="lg:hidden bg-transparent p-4 sticky top-0 z-30">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-amber-600 transition-colors duration-200"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
          
          {/* Content Area */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-10 w-full">
            {renderComponent()}
          </main>
        </div>
      </div>
    </div>
  );
}