import { useState, useEffect } from "react";
import { NavProvider, Tabs, StatusBar, type Tab } from "@droak/wterm";
import { Home } from "./pages/home/Home";
import { Experience } from "./pages/experience/Experience";
import { Blog } from "./pages/blog/Blog";
import { Login } from "./pages/login/Login";

const tabIds = ["home", "experience", "writings", "login"] as const;
type TabId = (typeof tabIds)[number];

interface Route {
  tab: TabId;
  postSlug: string | null;
  tag: string | null;
}

function parsePath(pathname: string): Route {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first === "experience") return { tab: "experience", postSlug: null, tag: null };
  if (first === "writings") {
    if (segments[1] === "tag") {
      return {
        tab: "writings",
        tag: segments[2] ?? null,
        postSlug: segments[3] ?? null,
      };
    }
    return { tab: "writings", postSlug: segments[1] ?? null, tag: null };
  }
  if (first === "login") return { tab: "login", postSlug: null, tag: null };
  return { tab: "home", postSlug: null, tag: null };
}

function tabToPath(tab: TabId): string {
  return tab === "home" ? "/" : `/${tab}`;
}

function buildBlogPath(tag: string | null, slug: string | null): string {
  if (tag && slug) return `/writings/tag/${tag}/${slug}`;
  if (tag) return `/writings/tag/${tag}`;
  if (slug) return `/writings/${slug}`;
  return "/writings";
}

export default function App() {
  const [{ tab, postSlug, tag }, setRoute] = useState<Route>(() =>
    parsePath(location.pathname),
  );

  useEffect(() => {
    const onPop = () => setRoute(parsePath(location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (path: string, next: Route) => {
    if (location.pathname !== path) history.pushState(null, "", path);
    setRoute(next);
  };

  const onChange = (id: string) => {
    const tabId = (tabIds as readonly string[]).includes(id) ? (id as TabId) : "home";
    navigate(tabToPath(tabId), { tab: tabId, postSlug: null, tag: null });
  };

  const onPostChange = (slug: string | null) => {
    navigate(buildBlogPath(tag, slug), { tab: "writings", postSlug: slug, tag });
  };

  const onTagChange = (newTag: string | null) => {
    navigate(buildBlogPath(newTag, null), {
      tab: "writings",
      postSlug: null,
      tag: newTag,
    });
  };

  const tabs: Tab[] = [
    { id: "home", label: "Home", content: <Home /> },
    { id: "experience", label: "Experience", content: <Experience /> },
    {
      id: "writings",
      label: "Writings",
      content: (
        <Blog
          postSlug={postSlug}
          tag={tag}
          onPostChange={onPostChange}
          onTagChange={onTagChange}
        />
      ),
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
