"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faSpinner,
  faExclamationTriangle,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  organization: string;
  profileImage: string;
}

type FilterOption = {
  label: string;
  value: string;
};

const AdminUserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedOrg, setSelectedOrg] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const organizations: FilterOption[] = [
    { label: 'All Organizations', value: 'all' },
    { label: 'Acme Corp', value: 'acme' },
    { label: 'Stark Industries', value: 'stark' },
    { label: 'Wayne Enterprises', value: 'wayne' },
  ];

  const statuses: FilterOption[] = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Active', value: 'Active' },
    { label: 'Inactive', value: 'Inactive' },
  ];

  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Admin",
        status: "Active",
        lastLogin: "2024-03-20",
        organization: "Acme Corp",
        profileImage: "https://picsum.photos/id/237/200/300"
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "User",
        status: "Active",
        lastLogin: "2024-03-19",
        organization: "Stark Industries",
        profileImage: "https://picsum.photos/seed/picsum/200/300"
      },
      {
        id: 3,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        role: "User",
        status: "Inactive",
        lastLogin: "2024-03-15",
        organization: "Wayne Enterprises",
        profileImage: "https://picsum.photos/200/300/?blur"
      },
    ];

    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-surface">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          className="text-zinc-400 w-10 h-10"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-surface">
        <div className="text-red-500">
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="w-10 h-10 mr-2"
          />
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col mb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-light tracking-wide text-white">
                🌼 User Management
              </h1>
              <p className="text-zinc-400 mt-1 font-extralight tracking-wider">
                Manage user accounts and permissions
              </p>
            </div>
            <button className="bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 px-6 py-2 text-xs tracking-widest uppercase font-light transition-all duration-300">
              Add New User
            </button>
          </div>
          {/* Search and Filter Section */}
          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-zinc-800 px-4 py-2 text-zinc-400 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 rounded-lg transition-all duration-300"
              />
            </div>
            <div className="flex-1 flex gap-4">
              <select
                value={selectedOrg}
                onChange={(e) => setSelectedOrg(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-zinc-800 px-4 py-2 text-zinc-400 focus:outline-none focus:border-zinc-600 rounded-lg transition-all duration-300"
              >
                {organizations.map((org) => (
                  <option key={org.value} value={org.value} className="bg-[#0a0a0a]">
                    {org.label}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-zinc-800 px-4 py-2 text-zinc-400 focus:outline-none focus:border-zinc-600 rounded-lg transition-all duration-300"
              >
                {statuses.map((status) => (
                  <option key={status.value} value={status.value} className="bg-[#0a0a0a]">
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-[#0a0a0a] border border-zinc-900 group hover:border-zinc-700 transition-all duration-500 p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-light tracking-widest uppercase text-zinc-500 border-b border-zinc-900">
                    Profile
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-light tracking-widest uppercase text-zinc-500 border-b border-zinc-900">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-light tracking-widest uppercase text-zinc-500 border-b border-zinc-900">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-light tracking-widest uppercase text-zinc-500 border-b border-zinc-900">
                    Role
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-light tracking-widest uppercase text-zinc-500 border-b border-zinc-900">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-light tracking-widest uppercase text-zinc-500 border-b border-zinc-900">
                    Organization
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-light tracking-widest uppercase text-zinc-500 border-b border-zinc-900">
                    Last Login
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-light tracking-widest uppercase text-zinc-500 border-b border-zinc-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                users
                  .filter((user) => {
                    const matchesSearch =
                      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      user.role.toLowerCase().includes(searchTerm.toLowerCase());

                    const matchesOrg = selectedOrg === 'all' ||
                      user.organization.toLowerCase().includes(selectedOrg.toLowerCase());

                    const matchesStatus = selectedStatus === 'all' ||
                      user.status === selectedStatus;

                    return matchesSearch && matchesOrg && matchesStatus;
                  })
                  .map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-zinc-900 transition-colors duration-300"
                  >
                    <td className="py-3 px-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={user.profileImage}
                          alt={`${user.name}'s profile`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-light text-zinc-400">
                      {user.name}
                    </td>
                    <td className="py-3 px-4 text-sm font-light text-zinc-400">
                      {user.email}
                    </td>
                    <td className="py-3 px-4 text-sm font-light text-zinc-400">
                      {user.role}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs font-light rounded-full ${
                        user.status === 'Active'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-light text-zinc-400">
                      {user.organization}
                    </td>
                    <td className="py-3 px-4 text-sm font-light text-zinc-400">
                      {user.lastLogin}
                    </td>
                    <td className="py-3 px-4 text-sm font-light">
                      <div className="flex space-x-3">
                        <button className="text-blue-500 hover:text-blue-400 transition-colors duration-300">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className="text-red-500 hover:text-red-400 transition-colors duration-300">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!users || users.length === 0) && (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center py-6 text-zinc-500 font-extralight"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserList;
