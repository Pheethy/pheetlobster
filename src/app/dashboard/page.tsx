"use client";

import { useEffect, useState } from "react";
import { User } from "@/models/users";
import { ProductsResp } from "@/models/products";
import { fetchAllProducts } from "@/services/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faBox,
  faUser,
  faCreditCard,
  faFileAlt,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [productStats, setProductStats] = useState<ProductsResp | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("overview");

  useEffect(() => {
    // Check if user is logged in (could retrieve from localStorage or context)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Fetch product stats
    const loadProductStats = async () => {
      try {
        const response = await fetchAllProducts({
          search_word: "",
          page: 1,
          per_page: 10,
        });
        setProductStats(response);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProductStats();
  }, []);

  // Mock data for dashboard stats
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

  // Mock data for recent activities
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

  const getActivityIcon = (type: string) => {
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
    <div className="bg-surface min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">
              Welcome back, {user?.username || "User"}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-2 bg-gray-800 rounded-lg shadow p-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "overview"
                    ? "bg-primary text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "analytics"
                    ? "bg-primary text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-300">Total Sales</p>
                {renderTrendIndicator(stats.trends.sales)}
              </div>
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-900 text-blue-300 mr-4">
                  <FontAwesomeIcon icon={faChartLine} className="w-6 h-6" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {stats.totalSales.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-1" />
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-300">Revenue</p>
                {renderTrendIndicator(stats.trends.revenue)}
              </div>
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-900 text-green-300 mr-4">
                  <FontAwesomeIcon icon={faCreditCard} className="w-6 h-6" />
                </div>
                <p className="text-2xl font-bold text-white">
                  ${stats.totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-600 to-green-400 h-1" />
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-300">New Users</p>
                {renderTrendIndicator(stats.trends.users)}
              </div>
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-900 text-purple-300 mr-4">
                  <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {stats.newUsers.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-purple-400 h-1" />
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-300">
                  Pending Orders
                </p>
                {renderTrendIndicator(stats.trends.orders)}
              </div>
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-amber-900 text-amber-300 mr-4">
                  <FontAwesomeIcon icon={faBox} className="w-6 h-6" />
                </div>
                <p className="text-2xl font-bold text-white">
                  {stats.pendingOrders.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-amber-600 to-amber-400 h-1" />
          </div>
        </div>

        {/* Products and Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Products */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  Recent Products
                </h2>
                <button className="text-sm text-primary font-medium hover:underline">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400 border-b border-gray-700">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400 border-b border-gray-700">
                        Price
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400 border-b border-gray-700">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productStats?.products.map((product) => (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-700 transition-colors"
                      >
                        <td className="py-3 px-4 text-sm text-gray-300">
                          {product.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-300 font-medium">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-400">
                          {new Date(product.created_at).toLocaleDateString(
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
                    {(!productStats || productStats.products.length === 0) && (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center py-6 text-gray-400"
                        >
                          No products found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  Recent Activities
                </h2>
                <button className="text-sm text-primary font-medium hover:underline">
                  View All
                </button>
              </div>
              <div className="space-y-5">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start pb-4 border-b border-gray-700 last:border-0 last:pb-0"
                  >
                    <div className="p-2 rounded-full bg-gray-700 text-primary mr-3">
                      <FontAwesomeIcon
                        icon={getActivityIcon(activity.type)}
                        className="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-300 font-medium">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
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
