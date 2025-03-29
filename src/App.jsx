import { useState } from "react";
import { Route,BrowserRouter as  Router, Routes, useNavigate } from "react-router-dom";
import Schedule from "./pages/schedule";
const App = () => {
  const [open, setOpen] = useState(true);
  const [selectedTile, setSelectedTile] = useState("Home Page");
  const navigate = useNavigate();
  const Menus = [
    { title: "Dashboard", src: "Chart_fill",path:'' },
    { title: "Inbox", src: "Chat" },
    { title: "Accounts", src: "User", gap: true },
    { title: "Schedule ", src: "Calendar" ,path:"/schedule"},
    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];

  return (


  
    <div className="flex">
      <div
        className={` ${
          open ? "w-60" : "w-20 "
        } bg-purple-700 h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-purple-700
          border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logo.png"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
        Raymond
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-stone-200/50 text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                selectedTile === Menu.title ? "bg-stone-200/50":""
              } `}
              onClick={() =>{ setSelectedTile(Menu.title); 
                navigate(Menu.path)}}
              
            >
              <img src={`./src/assets/${Menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
 {/* add remaining Routes */}
     
        <Routes>
          <Route path="/schedule" element={<Schedule/>}/>
          <Route path="/" element={<h1>Welcome to Dashboard</h1>} />
        </Routes>
        
      </div>
    </div>

    

  );
};
export default App;
