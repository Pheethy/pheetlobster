"use client";

import { useEffect, useState } from "react";
import { User } from "@/models/users";
import { ProductsResp } from "@/models/products";
import { fetchAllProducts } from "@/services/products";
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

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [productStats, setProductStats] = useState<ProductsResp | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

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
  const mockTranstions: Transaction[] = [
    {
      id: 1,
      from: "Robert",
      to: "John",
      hash_transaction: "0x1234567890abcdef",
      price: 19.99,
      created_at: "2024-03-08T12:00:00Z",
    },
    {
      id: 2,
      from: "John",
      to: "Robert",
      hash_transaction: "0xabcdef1234567890",
      price: 29.99,
      created_at: "2024-03-09T14:30:00Z",
    },
    {
      id: 3,
      from: "Steve Rogers",
      to: "Luffy",
      hash_transaction: "0x1a2b3c4d5e6f7a8b",
      price: 9.99,
      created_at: "2024-03-10T10:45:00Z",
    },
    {
      id: 4,
      from: "Tony Stark",
      to: "Peter Parker",
      hash_transaction: "0xdeadbeefcafebabe",
      price: 49.99,
      created_at: "2024-03-11T18:20:00Z",
    },
    {
      id: 5,
      from: "Bruce Wayne",
      to: "Clark Kent",
      hash_transaction: "0xf00dcafe1337babe",
      price: 79.99,
      created_at: "2024-03-12T09:15:00Z",
    },
    {
      id: 6,
      from: "Diana Prince",
      to: "Barry Allen",
      hash_transaction: "0xfeedface0000beef",
      price: 24.99,
      created_at: "2024-03-13T11:40:00Z",
    },
    {
      id: 7,
      from: "Hal Jordan",
      to: "Arthur Curry",
      hash_transaction: "0x1337c0d31337c0de",
      price: 39.99,
      created_at: "2024-03-14T15:55:00Z",
    },
    {
      id: 8,
      from: "Black Canary",
      to: "Green Arrow",
      hash_transaction: "0x0000000000000000",
      price: 14.99,
      created_at: "2024-03-15T17:30:00Z",
    },
    {
      id: 9,
      from: "Hawkgirl",
      to: "Atom",
      hash_transaction: "0xffffffff00000000",
      price: 59.99,
      created_at: "2024-03-16T10:00:00Z",
    },
    {
      id: 10,
      from: "Zatanna",
      to: "John Constantine",
      hash_transaction: "0xcafebabecafebabe",
      price: 69.99,
      created_at: "2024-03-17T13:25:00Z",
    },
  ];

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
    <div className="bg-surface min-h-screen transition-all duration-300">
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        {/* Header with enhanced animations */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 animate-slideDown">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <h1 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              🌼 Dashboard
            </h1>
            <p className="text-white mt-1 animate-pulse">
              Welcome back, {user?.username || "PheetchY"}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex space-x-2 bg-gray-800/80 backdrop-blur-lg rounded-lg shadow-lg p-1">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${activeTab === "overview" ? "bg-primary text-white shadow-lg" : "text-gray-300 hover:bg-gray-700/70"}`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${activeTab === "analytics" ? "bg-primary text-white shadow-lg" : "text-gray-300 hover:bg-gray-700/70"}`}
              >
                Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview with enhanced animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stats cards with improved animations and glassmorphism */}
          <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group animate-fadeIn">
            <div className="p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-300">
                    Total Sales
                  </p>
                  {renderTrendIndicator(stats.trends.sales)}
                </div>
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-900/50 text-blue-300 mr-4 group-hover:scale-110 transition-transform duration-300">
                    <FontAwesomeIcon icon={faChartLine} className="w-6 h-6" />
                  </div>
                  <p className="text-2xl font-bold text-white group-hover:scale-105 transition-transform duration-300">
                    {stats.totalSales.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
          </div>

          {/* Repeat similar enhancements for other stat cards */}
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

        {/* Products and Activities with modern styling */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Products with enhanced table */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700/50 p-6 overflow-hidden transition-all duration-300 hover:shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  <h2>Transactions</h2>
                  <div>
                    <FontAwesomeIcon
                      className="w-4 h-4 pl-2 text-gray-600 hover:text-white transition duration-500 relative"
                      icon={faCircleInfo}
                      onMouseOver={() => setIsTooltipVisible(true)}
                      onMouseOut={() => setIsTooltipVisible(false)}
                    />
                    {isTooltipVisible && (
                      <div className="absolute tooltip-content bg-gray-800 text-white p-2 rounded shadow-md text-sm font-light">
                        More information about this section!
                      </div>
                    )}
                  </div>
                </div>
                <button className="text-sm text-primary font-medium hover:underline transition-all duration-300 hover:text-primary/80">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left py-3 px-2 text-sm font-medium text-gray-400 border-b border-gray-700">
                        From
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400 border-b border-gray-700">
                        To
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400 border-b border-gray-700">
                        Tx.Hashing
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
                    {mockTranstions.map((transItem) => (
                      <tr
                        key={transItem.id}
                        className="hover:bg-gray-700 transition-colors"
                      >
                        <td className="py-3 px-2 text-sm text-gray-300">
                          {transItem.from}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-300">
                          {transItem.to}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-300">
                          {transItem.hash_transaction}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-300 font-medium">
                          ${transItem.price.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-400">
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
                    {(!mockTranstions || mockTranstions?.length === 0) && (
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

          {/* Recent Activities with modern cards */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-700/50 p-6 overflow-hidden transition-all duration-300 hover:shadow-xl">
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
