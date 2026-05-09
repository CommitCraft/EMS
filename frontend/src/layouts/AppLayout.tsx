import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Modal } from "../components/Modal";
import { useAuth } from "../hooks/useAuth";
import { useCompanyProfile } from "../hooks/useCompanyProfile";
import { AppHeader } from "./app-shell/AppHeader";
import { navSections } from "./app-shell/navConfig";
import {
  filterNavSectionsByPermissions,
  getActiveItem,
  getAllLinks,
  getBreadcrumbItems,
  getOpenMenuLabel,
  shouldUseExactMatch,
} from "./app-shell/navUtils";
import { Sidebar } from "./app-shell/Sidebar";
import { NavItem } from "./app-shell/types";

export const AppLayout = () => {
  const { user, logout } = useAuth();
  const { profile } = useCompanyProfile();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [openMenuLabel, setOpenMenuLabel] = useState<string | null>(null);
  const [sidebarModalItem, setSidebarModalItem] = useState<NavItem | null>(null);

  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  const allowedSections = useMemo(
    () => filterNavSectionsByPermissions(navSections, user?.permissions),
    [user?.permissions],
  );

  const navItems = useMemo(
    () => allowedSections.flatMap((section) => section.items),
    [allowedSections],
  );
  const allLinks = useMemo(() => getAllLinks(navItems), [navItems]);

  const activeItem = useMemo(() => getActiveItem(navItems, pathname), [navItems, pathname]);
  const ActiveIcon = activeItem?.icon;

  const breadcrumbItems = useMemo(() => getBreadcrumbItems(pathname), [pathname]);
  const activeMenuLabel = useMemo(() => getOpenMenuLabel(navItems, pathname), [navItems, pathname]);

  useEffect(() => {
    setOpenMenuLabel(activeMenuLabel);
  }, [activeMenuLabel]);

  const shouldUseExact = (path?: string) => shouldUseExactMatch(allLinks, path);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen();
    } else {
      void document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProfileMenuOpen(false);
        setMobileOpen(false);
        setSidebarModalItem(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setProfileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#f3f6f8] text-slate-900">
      <div
        className={`fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition xl:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      <div className="relative flex min-h-screen">
        <Sidebar
          sections={allowedSections}
          pathname={pathname}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          openMenuLabel={openMenuLabel}
          setOpenMenuLabel={setOpenMenuLabel}
          onOpenItemModal={setSidebarModalItem}
          shouldUseExactMatch={shouldUseExact}
          logoUrl={profile?.logoUrl}
          faviconUrl={profile?.faviconUrl}
        />

        <div className="flex min-h-screen flex-1 flex-col">
          <AppHeader
            ActiveIcon={ActiveIcon}
            activeLabel={activeItem?.label || "Dashboard"}
            breadcrumbItems={breadcrumbItems}
            onOpenMobileMenu={() => setMobileOpen(true)}
            onToggleFullscreen={toggleFullscreen}
            profileMenuOpen={profileMenuOpen}
            setProfileMenuOpen={setProfileMenuOpen}
            profileMenuRef={profileMenuRef}
            user={user}
            onOpenProfile={() => {
              setProfileMenuOpen(false);
              navigate("/settings/profile");
            }}
            onLogout={() => {
              setProfileMenuOpen(false);
              void logout();
            }}
          />

          <main className="relative flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>

      <Modal
        open={!!sidebarModalItem}
        title={sidebarModalItem?.label || "Menu items"}
        onClose={() => setSidebarModalItem(null)}
      >
        {sidebarModalItem?.children?.length ? (
          <div className="space-y-1">
            <div className="grid gap-1">
              {sidebarModalItem.children.map((child) => (
                <NavLink
                  key={child.to}
                  to={child.to}
                  onClick={() => setSidebarModalItem(null)}
                  className="rounded-lg px-2 py-2 text-left transition hover:bg-slate-100"
                >
                  <span className="flex items-center gap-3">
                    <span className="grid h-5 w-5 place-items-center text-slate-700">
                      <child.icon className="h-4 w-4" />
                    </span>
                    <span className="font-medium text-slate-900">{child.label}</span>
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-600">No submenu items available.</p>
        )}
      </Modal>
    </div>
  );
};
