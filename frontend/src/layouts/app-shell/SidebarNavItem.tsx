import { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router-dom";
import { ChevronRightIcon } from "./icons";
import { isPathActive } from "./navUtils";
import { NavItem } from "./types";

type SidebarNavItemProps = {
  item: NavItem;
  collapsed: boolean;
  isMobile?: boolean;
  pathname: string;
  isOpen: boolean;
  setOpenMenuLabel: Dispatch<SetStateAction<string | null>>;
  setMobileOpen: (value: boolean) => void;
  shouldUseExactMatch: (path?: string) => boolean;
};

export const SidebarNavItem = ({
  item,
  collapsed,
  isMobile = false,
  pathname,
  isOpen,
  setOpenMenuLabel,
  setMobileOpen,
  shouldUseExactMatch,
}: SidebarNavItemProps) => {
  const Icon = item.icon;
  const hasChildren = !!item.children?.length;
  const submenuId = `sidebar-submenu-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  const isParentActive = hasChildren
    ? item.children?.some((child) => isPathActive(pathname, child.to))
    : isPathActive(pathname, item.to);

  if (hasChildren) {
    return (
      <div key={item.label} className="relative">
        <button
          type="button"
          className={`group flex w-full items-center rounded-[8px] text-[15px] font-semibold tracking-wide transition border border-white/15 ${
            collapsed && !isMobile
              ? "justify-center px-2 py-1.5"
              : "justify-between px-3 py-2"
          } ${
            isParentActive
              ? "bg-[#4351b8] text-white shadow-sm"
              : "text-[#e6e8ec] hover:bg-[#3a404d] hover:text-white"
          }`}
          onClick={() =>
            setOpenMenuLabel((current) => (current === item.label ? null : item.label))
          }
          aria-expanded={isOpen}
          aria-controls={submenuId}
          title={collapsed && !isMobile ? item.label : undefined}
        >
          <span className={`flex items-center ${collapsed && !isMobile ? "" : "gap-4"}`}>
            <span className="grid h-6 w-6 place-items-center text-white">
              <Icon className="h-[18px] w-[18px]" />
            </span>

            {collapsed && !isMobile ? null : (
              <span className="whitespace-nowrap">{item.label}</span>
            )}
          </span>

          {collapsed && !isMobile ? null : (
            <ChevronRightIcon
              className={`h-[18px] w-[18px] text-white/90 transition-transform duration-200 ${
                isOpen ? "rotate-90" : "rotate-0"
              }`}
            />
          )}

          {collapsed && !isMobile ? (
            <span className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-md bg-[#2f3440] px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition group-hover:opacity-100">
              {item.label}
            </span>
          ) : null}
        </button>

        {collapsed && !isMobile ? (
          <div
            aria-hidden={!isOpen}
            className={`absolute left-[calc(100%+12px)] top-0 z-50 w-64 rounded-xl border border-white/10 bg-[#2f3440] p-2 shadow-2xl origin-left transition-all duration-200 ease-out motion-reduce:transition-none ${
              isOpen
                ? "pointer-events-auto translate-x-0 scale-100 opacity-100"
                : "pointer-events-none -translate-x-1 scale-[0.98] opacity-0"
            }`}
          >
            {/* <div className="mb-2 rounded-md bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#4351b8]">
              {item.label}
            </div> */}

            <div className="space-y-1">
              {item.children?.map((child) => (
                <NavLink
                  key={child.to}
                  to={child.to}
                  end={child.to === "/settings"}
                  className={({ isActive }) =>
                    `block rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? "bg-[#4351b8] text-white shadow-sm"
                        : "text-[#cfd3dc] hover:bg-[#3a404d] hover:text-white"
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {child.label}
                </NavLink>
              ))}
            </div>
          </div>
        ) : null}

        {isMobile ? (
          <div
            id={submenuId}
            aria-hidden={!isOpen}
            className={`relative z-20 ml-3 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#252a34] shadow-2xl transition-all duration-220 ease-out motion-reduce:transition-none ${
              isOpen
                ? "max-h-[32rem] translate-y-0 opacity-100"
                : "pointer-events-none max-h-0 -translate-y-1 opacity-0"
            }`}
          >
            <div className="max-h-[32rem] overflow-y-auto p-1.5">
              {/* <div className="mb-3 rounded-xl bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                {item.label}
              </div> */}

              <div className="space-y-1">
                {item.children?.map((child) => (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    end={child.to === "/settings"}
                    className={({ isActive }) =>
                      `block rounded-lg px-2.5 py-1.5 text-[13px] font-medium transition ${
                        isActive
                          ? "bg-[#4351b8] text-white shadow-sm"
                          : "bg-white/5 text-[#d8dbe3] hover:bg-white/10 hover:text-white"
                      }`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        ) : !(collapsed && !isMobile) ? (
          <div
            id={submenuId}
            aria-hidden={!isOpen}
            className={`relative z-10 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#252a34] shadow-2xl transition-all duration-220 ease-out motion-reduce:transition-none ${
              isOpen
                ? "max-h-[28rem] translate-y-0 opacity-100"
                : "pointer-events-none max-h-0 -translate-y-1 opacity-0"
            }`}
          >
            <div className="max-h-[28rem] overflow-y-auto p-1.5">
              {/* <div className="mb-3 border-b border-white/10 px-1 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                {item.label}
              </div> */}

              <div className="space-y-1">
              {item.children?.map((child) => (
                <NavLink
                  key={child.to}
                  to={child.to}
                  end={child.to === "/settings"}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-[14px] font-medium transition ${
                      isActive
                        ? "bg-[#4351b8] text-white shadow-sm"
                        : "bg-white/5 text-[#d8dbe3] hover:bg-white/10 hover:text-white"
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {child.label}
                </NavLink>
              ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <NavLink
      key={item.to}
      to={item.to || "#"}
      end={shouldUseExactMatch(item.to)}
      className={({ isActive }) =>
        `group relative flex items-center rounded-[8px] text-[15px] font-semibold tracking-wide transition border border-white/15 ${
          collapsed && !isMobile ? "justify-center px-2 py-1.5" : "justify-between px-3 py-2"
        } ${
          isActive
            ? "bg-[#4351b8] text-white shadow-sm"
            : "text-[#e6e8ec] hover:bg-[#3a404d] hover:text-white"
        }`
      }
      onClick={() => setMobileOpen(false)}
      title={collapsed && !isMobile ? item.label : undefined}
    >
      <span className={`flex items-center ${collapsed && !isMobile ? "" : "gap-4"}`}>
        <span className="grid h-6 w-6 place-items-center text-white">
          <Icon className="h-[18px] w-[18px]" />
        </span>

        {collapsed && !isMobile ? null : (
          <span className="whitespace-nowrap">{item.label}</span>
        )}
      </span>

      {collapsed && !isMobile ? null : (
        <ChevronRightIcon className="h-[18px] w-[18px] text-white/90" />
      )}

      {collapsed && !isMobile ? (
        <span className="pointer-events-none absolute left-[calc(100%+10px)] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-md bg-[#2f3440] px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition group-hover:opacity-100">
          {item.label}
        </span>
      ) : null}
    </NavLink>
  );
};
