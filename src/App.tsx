import { useState, useEffect } from "react";
import { NavProvider, Tabs, StatusBar, type Tab } from "@droak/wterm";
import { Home } from "./pages/home/Home";
import { Experience } from "./pages/experience/Experience";
import { Blog } from "./pages/blog/Blog";
import { Login } from "./pages/login/Login";

const tabIds = ["home", "experience", "writings", "login"] as const;
type TabId = (typeof tabIds)[number];

function parsePath(pathname: string): { tab: TabId; postSlug: string | null } {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first === "experience") return { tab: "experience", postSlug: null };
  if (first === "writings") return { tab: "writings", postSlug: segments[1] ?? null };
  if (first === "login") return { tab: "login", postSlug: null };
  return { tab: "home", postSlug: null };
}

function tabToPath(tab: TabId): string {
  return tab === "home" ? "/" : `/${tab}`;
}

export default function App() {
  const [{ tab, postSlug }, setRoute] = useState(() => parsePath(location.pathname));

  useEffect(() => {
    const onPop = () => setRoute(parsePath(location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const onChange = (id: string) => {
    const tabId = (tabIds as readonly string[]).includes(id) ? (id as TabId) : "home";
    const newPath = tabToPath(tabId);
    if (location.pathname !== newPath) {
      history.pushState(null, "", newPath);
    }
    setRoute({ tab: tabId, postSlug: null });
  };

  const onPostChange = (slug: string | null) => {
    const newPath = slug ? `/writings/${slug}` : "/writings";
    if (location.pathname !== newPath) {
      history.pushState(null, "", newPath);
    }
    setRoute({ tab: "writings", postSlug: slug });
  };

  const tabs: Tab[] = [
    { id: "home", label: "Home", content: <Home /> },
    { id: "experience", label: "Experience", content: <Experience /> },
    {
      id: "writings",
      label: "Writings",
      content: <Blog postSlug={postSlug} onPostChange={onPostChange} />,
    },
    { id: "login", label: "Login", content: <Login /> },
  ];

  return (
    <NavProvider>
      <div className="tui app-shell">
        <Tabs tabs={tabs} activeId={tab} onChange={onChange} />
        <StatusBar items={["visitor@droak.sh", tab, "Cmd+K"]} />
      </div>
    </NavProvider>
  );
}
