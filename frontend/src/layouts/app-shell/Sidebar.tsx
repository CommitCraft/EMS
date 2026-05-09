import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";
import { SidebarNavItem } from "./SidebarNavItem";
import { NavSection } from "./types";

type SidebarProps = {
  sections: NavSection[];
  pathname: string;
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: (value: boolean) => void;
  openMenuLabel: string | null;
  setOpenMenuLabel: Dispatch<SetStateAction<string | null>>;
  shouldUseExactMatch: (path?: string) => boolean;
  logoUrl?: string | null;
  faviconUrl?: string | null;
};

export const Sidebar = ({
  sections,
  pathname,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  openMenuLabel,
  setOpenMenuLabel,
  shouldUseExactMatch,
  logoUrl,
  faviconUrl,
}: SidebarProps) => {
  const navigate = useNavigate();
  const showDesktopSectionTitles = !collapsed;
  return (
    <>
      <aside
        className={`relative z-40 hidden shrink-0 overflow-visible bg-[#2f3440] px-3 py-3 xl:flex xl:flex-col xl:transition-all ${
          collapsed ? "xl:w-20" : "xl:w-[315px]"
        }`}
      >
        <div className="sticky top-0 z-20 mb-2 flex items-center justify-between bg-[#2f3440] py-1">
          {!collapsed ? (
            <div
              className="flex min-h-[48px] items-center cursor-pointer transition hover:opacity-80"
              onClick={() => navigate("/dashboard")}
            >
              {logoUrl ? (
                <img src={logoUrl} alt="Company Logo" className="h-[44px] w-auto object-contain" />
              ) : (
                <div className="text-xl font-bold text-white">MES</div>
              )}
            </div>
          ) : (
            <div
              className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 cursor-pointer transition hover:bg-white/20"
              onClick={() => navigate("/dashboard")}
            >
              {faviconUrl ? (
                <img src={faviconUrl} alt="Company Icon" className="h-8 w-8 rounded-lg object-contain" />
              ) : (
                <span className="text-sm font-bold text-white">M</span>
              )}
            </div>
          )}

          <button
            className="absolute -right-7 top-2 z-[9999] grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-[#252a34] text-white shadow-lg transition hover:bg-[#3a404d]"
            onClick={() => setCollapsed((value) => !value)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>
        </div>

        <nav className={`flex-1 overflow-y-auto pr-1 ${collapsed ? "space-y-1" : "space-y-1.5"}`}>
          {sections.map((section) => (
            <div
              key={section.title}
              className={`rounded-lg border border-white/10 ${collapsed ? "p-1" : "space-y-0.5 p-2"}`}
            >
              {showDesktopSectionTitles ? (
                <div className="border-b border-white/10 px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  {section.title}
                </div>
              ) : (
                <span className="sr-only">{section.title}</span>
              )}

              <div className={collapsed ? "space-y-1" : "space-y-0.5"}>
                {section.items.map((item) => (
                  <SidebarNavItem
                    key={item.label}
                    item={item}
                    collapsed={collapsed}
                    pathname={pathname}
                    isOpen={openMenuLabel ? openMenuLabel === item.label : false}
                    setOpenMenuLabel={setOpenMenuLabel}
                    setMobileOpen={setMobileOpen}
                    shouldUseExactMatch={shouldUseExactMatch}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[92vw] max-w-[360px] flex-col bg-[#2f3440] px-3 py-3 transition-transform duration-300 ease-out xl:hidden sm:w-[340px] ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-2 flex min-h-[48px] items-center justify-between">
          <div
            className="flex items-center cursor-pointer transition hover:opacity-80"
            onClick={() => navigate("/dashboard")}
          >
            {logoUrl ? (
              <img src={logoUrl} alt="Company Logo" className="h-[44px] w-auto object-contain" />
            ) : (
              <div className="text-xl font-bold text-white">QMS</div>
            )}
          </div>

          <button
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
            onClick={() => setMobileOpen(false)}
            title="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
          {sections.map((section) => (
            <div key={`mobile-section-${section.title}`} className="space-y-0.5 rounded-lg border border-white/10 p-2">
              <div className="border-b border-white/10 px-2 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                {section.title}
              </div>

              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <SidebarNavItem
                    key={`mobile-${item.label}`}
                    item={item}
                    collapsed={false}
                    isMobile
                    pathname={pathname}
                    isOpen={openMenuLabel ? openMenuLabel === item.label : false}
                    setOpenMenuLabel={setOpenMenuLabel}
                    setMobileOpen={setMobileOpen}
                    shouldUseExactMatch={shouldUseExactMatch}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};
