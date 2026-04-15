import { useState, useEffect } from "react";
import { NavProvider, Tabs, StatusBar, type Tab } from "@droak/wterm";
import { Home } from "./pages/home/Home";
import { Experience } from "./pages/experience/Experience";
import { Blog } from "./pages/blog/Blog";
import { Login } from "./pages/login/Login";

const tabs: Tab[] = [
  { id: "home", label: "Home", content: <Home /> },
  { id: "experience", label: "Experience", content: <Experience /> },
  { id: "writings", label: "Writings", content: <Blog /> },
  { id: "login", label: "Login", content: <Login /> },
];

function getHashTab(): string {
  const hash = location.hash.replace("#", "");
  return tabs.some((t) => t.id === hash) ? hash : "home";
}

export default function App() {
  const [activeTab, setActiveTab] = useState(getHashTab);

  useEffect(() => {
    const onHash = () => setActiveTab(getHashTab());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const onChange = (id: string) => {
    setActiveTab(id);
    location.hash = id;
  };

  return (
    <NavProvider>
      <div className="tui app-shell">
        <Tabs tabs={tabs} activeId={activeTab} onChange={onChange} />
        <StatusBar items={["visitor@droak.sh", activeTab, "Cmd+K"]} />
      </div>
    </NavProvider>
  );
}
