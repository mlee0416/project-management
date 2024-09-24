"use client";

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StoreProvider, { useAppSelector } from "./redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);
  return (
    <div className="bg-gray- flex min-h-screen w-full text-gray-900">
      {/* sidebar */}
      {!isSideBarCollapsed && <Sidebar />}
      <main
        className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${
          isSideBarCollapsed ? "" : "md:pl-64"
        }`}
      >
        <Navbar
          isSidebarCollapsed={isSideBarCollapsed}
          isDarkMode={isDarkMode}
        />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
