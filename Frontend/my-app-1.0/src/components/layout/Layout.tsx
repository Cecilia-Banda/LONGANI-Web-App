import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
const Layout: React.FC = () => {
  return <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>;
};
export default Layout;
