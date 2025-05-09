import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from "react-router-dom";

import MainContent from "./MainContent";
import AddUser from "./pages/AddUser";
import Schedule from "./components/ScheduleComponent";

import Login from "./pages/Login";
import { jwtDecode } from 'jwt-decode'
import AddStore from "./pages/AddStore";
import Client from "./pages/Client";
import AdminFormControl from "./components/Forms/AdminFormControl";
const App = () => {
  const [open, setOpen] = useState(true);
  const [selectedTile, setSelectedTile] = useState("Home Page");
  const [role, setRole] = useState(null); // Default role
  const navigate = useNavigate();
  const location = useLocation();
  const Menus = [
    { title: "Dashboard", src: "Chart_fill", path: '' },
    { title: "Schedule ", src: "Calendar", path: "/schedule" },
    { title: "Inbox", src: "Chat" },
    { title: "Users", src: "User", gap: true, path: "/users" },
    { title: "Clients", src: "User", path: "/clients" },
    {title:"Store",src:"Store",path:"/store"},

    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" ,path:'/formControl'},
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
    { title: "Inspection", src: "Inspection", path: "/inspection" }, // New tab for Technician
    { title: "Installation", src: "tools", path: "/installation" },
  ];
  const isLoginPage = location.pathname === "/login";
  const logout = () => {
    console.log("click")
    localStorage.removeItem("token");
    setRole(null);
    navigate("/login");
    window.location.reload();
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentPath = location.pathname
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role)
        console.log(decodedToken.role);
        if(currentPath === '/login') {
          navigate('/');
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }else{
      if(currentPath !== '/login') {
        navigate("/login");
      }
    }
  });

  const filteredMenus = Menus.filter((menu) => {
    if (role === 'technician') {
      return (
        menu.title === "Dashboard" ||
        menu.title === "Inbox" ||
        menu.title === "Inspection" ||
        menu.title === "Installation" ||
        menu.title === 'Settings'
      );
    }
    if (role === 'admin') {
      return menu.title !== "Inspection" &&
        menu.title !== "Installation" ;
    }
    return true
  })
  return (
    <div className="flex">
      {!isLoginPage && (
        <div
          className={`bg-purple-700 h-screen p-5 pt-8 fixed ${open ? "w-60" : "w-20"}`}

        >
          <img
            src="./src/assets/control.png"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-purple-700
          border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <img
              onClick={logout}
              src="./src/assets/logo.png"
              className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                }`}
            />
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                }`}
            >
              Raymond
            </h1>
          </div>
          <ul className="pt-6">
            {filteredMenus.map((Menu, index) => (
              <li
                key={index}
                className={`flex  rounded-md p-2 cursor-pointer hover:bg-stone-200/50 text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${selectedTile === Menu.title ? "bg-stone-200/50" : ""
                  } `}
                onClick={() => {
                  setSelectedTile(Menu.title);
                  navigate(Menu.path)
                }}

              >
                <img src={`./src/assets/${Menu.src}.png`} />
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={`h-screen flex-1 ${isLoginPage ? '' : 'p-7'}`}>
        {/* add remaining Routes */}
        {!isLoginPage ? (
          <MainContent sidebarOpen={open}>
            <Routes>
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/users" element={<AddUser />} />
              <Route path="/clients" element={<Client />} />
              <Route path="/store" element={<AddStore />} />
              <Route path="/formControl" element={<AdminFormControl/>} />
              <Route path="/" element={<h1>Welcome to Dashboard</h1>} />

            </Routes>
          </MainContent>
        ) : (
          <Routes>
            <Route path='/login' element={<Login />} />
          </Routes>

        )}
      </div>
    </div>



  );
};
export default App;
