"use client";

import { useEffect, useState } from "react";
import { User } from "@/models/users";
import { ProductsResp } from "@/models/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Transaction } from "@/models/transactions";
import {
  faChartLine,
  faBox,
  faUser,
  faCreditCard,
  faFileAlt,
  faArrowUp,
  faArrowDown,
  faCircleInfo,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { fethcOrdersDahsboard } from "@/services/order";
import { OrderDashboard } from "@/models/orders";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [orders, setOrders] = useState<OrderDashboard[]>([]);

  const fetchOrdersDashboard = async () => {
    try {
      const resp = await fethcOrdersDahsboard();
      setOrders(resp);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch orders dashboard:", error);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchOrdersDashboard();
  }, []);

  const stats = {
    totalSales: 1248,
    totalRevenue: 24680,
    newUsers: 128,
    pendingOrders: 26,
    trends: {
      sales: 8.2,
      revenue: 12.5,
      users: -3.1,
      orders: 5.7,
    },
  };

  const recentActivities = [
    {
      id: 1,
      type: "order",
      message: "New order #12345 placed",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "product",
      message: 'Product "ODOR Essential" stock low',
      time: "4 hours ago",
    },
    {
      id: 3,
      type: "user",
      message: "New user registered: john@example.com",
      time: "6 hours ago",
    },
    {
      id: 4,
      type: "review",
      message: 'New 5-star review on "ODOR Premium"',
      time: "1 day ago",
    },
  ];

  const getActivityIcon = (type: string): IconDefinition => {
    switch (type) {
      case "order":
        return faCreditCard;
      case "product":
        return faBox;
      case "user":
        return faUser;
      case "review":
        return faFileAlt;
      default:
        return faFileAlt;
    }
  };

  const renderTrendIndicator = (value: number) => {
    const isPositive = value >= 0;
    return (
      <div
        className={`flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}
      >
        <FontAwesomeIcon
          icon={isPositive ? faArrowUp : faArrowDown}
          className="w-3 h-3 mr-1"
        />
        <span className="text-xs font-medium">{Math.abs(value)}%</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-surface">
        <div className="loading loading-spinner loading-lg text-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="container mx-auto px-4 py-8">
        {/* Header with minimalist styling */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
          <div>
            <h1 className="text-3xl font-light tracking-wide text-white">
              🌼 Dashboard
            </h1>
            <p className="text-zinc-400 mt-1 font-extralight tracking-wider animate-pulse">
              Welcome back, {user?.username || "PheetchY"}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-2 border border-zinc-900 p-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 text-xs tracking-widest uppercase font-light transition-all duration-300 ${activeTab === "overview" ? "text-white border-b border-zinc-500" : "text-zinc-600 hover:text-zinc-300"}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-4 py-2 text-xs tracking-widest uppercase font-light transition-all duration-300 ${activeTab === "analytics" ? "text-white border-b border-zinc-500" : "text-zinc-600 hover:text-zinc-300"}`}
              >
                Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview with minimalist styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Stats cards with minimalist styling */}
          <div className="bg-[#0a0a0a] border border-zinc-900 group hover:border-zinc-700 transition-all duration-500">
            <div className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-light tracking-widest uppercase text-zinc-500">
                  Total Sales
                </p>
                {renderTrendIndicator(stats.trends.sales)}
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faChartLine}
                  className="w-5 h-5 text-zinc-600 mr-4"
                />
                <p className="text-2xl font-light tracking-wide text-white">
                  {stats.totalSales.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-900 group hover:border-zinc-700 transition-all duration-500">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-light tracking-widest uppercase text-zinc-500">
                  Revenue
                </p>
                {renderTrendIndicator(stats.trends.revenue)}
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faCreditCard}
                  className="w-5 h-5 text-zinc-600 mr-4"
                />
                <p className="text-2xl font-light tracking-wide text-white">
                  ${stats.totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-900 group hover:border-zinc-700 transition-all duration-500">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-light tracking-widest uppercase text-zinc-500">
                  New Users
                </p>
                {renderTrendIndicator(stats.trends.users)}
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faUser}
                  className="w-5 h-5 text-zinc-600 mr-4"
                />
                <p className="text-2xl font-light tracking-wide text-white">
                  {stats.newUsers.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-zinc-900 group hover:border-zinc-700 transition-all duration-500">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-light tracking-widest uppercase text-zinc-500">
                  Pending Orders
                </p>
                {renderTrendIndicator(stats.trends.orders)}
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faBox}
                  className="w-5 h-5 text-zinc-600 mr-4"
                />
                <p className="text-2xl font-light tracking-wide text-white">
                  {stats.pendingOrders.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products and Activities with minimalist styling */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transactions with minimalist table */}
          <div className="lg:col-span-2">
            <div className="bg-[#0a0a0a] border border-zinc-900 group hover:border-zinc-700 transition-all duration-500 p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <h2 className="text-lg font-light tracking-wide text-white">
                    Transactions
                  </h2>
                  <div>
                    <FontAwesomeIcon
                      className="w-3 h-3 ml-2 text-zinc-600 hover:text-zinc-400 transition duration-300 relative"
                      icon={faCircleInfo}
                      onMouseOver={() => setIsTooltipVisible(true)}
                      onMouseOut={() => setIsTooltipVisible(false)}
                    />
                    {isTooltipVisible && (
                      <div className="absolute tooltip-content bg-[#0a0a0a] text-zinc-400 p-2 border border-zinc-800 text-xs font-extralight tracking-wide">
                        More information about this section
                      </div>
                    )}
                  </div>
                </div>
                <button className="text-xs text-zinc-500 font-light tracking-widest uppercase hover:text-zinc-300 transition-all duration-300">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-3 px-2 text-xs font-light tracking-widest uppercase text-zinc-500 border-b border-zinc-900">
                        Username
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
                        Tx.Hashing
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-light tracking-widest uppercase text-zinc-500 border-b border-zinc-900">
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((transItem) => (
                      <tr
                        key={transItem.id}
                        className="hover:bg-zinc-900 transition-colors duration-300"
                      >
                        <td className="py-3 px-4 text-sm font-light text-zinc-400">
                          {transItem.user_detail.username}
                        </td>
                        <td className="py-3 px-4 text-sm font-light text-zinc-400">
                          {transItem.user_detail.email}
                        </td>
                        <td className="py-3 px-4 text-sm font-light text-zinc-400">
                          {transItem.user_detail.role}
                        </td>
                        <td className="py-3 px-4 text-sm font-light text-zinc-400">
                          {transItem.status}
                        </td>
                        <td className="py-3 px-4 text-sm font-light text-zinc-400 truncate max-w-[150px]">
                          {transItem.tx_hashing}
                        </td>
                        <td className="py-3 px-4 text-sm font-extralight text-zinc-500">
                          {new Date(transItem.created_at).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </td>
                      </tr>
                    ))}
                    {(!orders || orders?.length === 0) && (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center py-6 text-zinc-500 font-extralight"
                        >
                          No transactions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recent Activities with minimalist styling */}
          <div className="lg:col-span-1">
            <div className="bg-[#0a0a0a] border border-zinc-900 group hover:border-zinc-700 transition-all duration-500 p-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-light tracking-wide text-white">
                  Recent Activities
                </h2>
                <button className="text-xs text-zinc-500 font-light tracking-widest uppercase hover:text-zinc-300 transition-all duration-300">
                  View All
                </button>
              </div>
              <div className="space-y-6">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start pb-6 border-b border-zinc-900 last:border-0 last:pb-0"
                  >
                    <FontAwesomeIcon
                      icon={getActivityIcon(activity.type)}
                      className="w-4 h-4 text-zinc-600 mt-1 mr-4"
                    />
                    <div>
                      <p className="text-sm font-light text-zinc-400">
                        {activity.message}
                      </p>
                      <p className="text-xs font-extralight text-zinc-600 mt-1 tracking-wide">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
