"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category?: string;
  level?: string;
}

interface FilterState {
  category: string;
  level: string;
  priceRange: [number, number];
}

// Sample course data
const courses: Course[] = [
  {
    id: "1",
    title: "Advanced Web Development",
    description: "Master modern web technologies and frameworks",
    image: "https://picsum.photos/seed/course1/400/400",
    price: 99.99,
    category: "Development",
    level: "Advanced",
  },
  {
    id: "2",
    title: "UI/UX Design Fundamentals",
    description: "Learn the principles of user interface design",
    image: "https://picsum.photos/seed/course2/400/400",
    price: 79.99,
    category: "Design",
    level: "Beginner",
  },
  {
    id: "3",
    title: "Mobile App Development",
    description: "Build cross-platform mobile applications",
    image: "https://picsum.photos/seed/course3/400/400",
    price: 89.99,
    category: "Development",
    level: "Intermediate",
  },
  {
    id: "4",
    title: "Digital Marketing Mastery",
    description: "Learn effective digital marketing strategies and techniques",
    image: "https://picsum.photos/seed/course4/400/400",
    price: 69.99,
    category: "Marketing",
    level: "Beginner",
  },
  {
    id: "5",
    title: "Business Analytics Fundamentals",
    description: "Master data-driven decision making for business growth",
    image: "https://picsum.photos/seed/course5/400/400",
    price: 149.99,
    category: "Business",
    level: "Intermediate",
  },
  {
    id: "6",
    title: "Advanced UI Animation",
    description: "Create stunning animations and interactive interfaces",
    image: "https://picsum.photos/seed/course6/400/400",
    price: 119.99,
    category: "Design",
    level: "Advanced",
  },
];

const categories = ["All", "Development", "Design", "Marketing", "Business"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const priceRanges = [0, 200];

export default function CoursePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    level: "All",
    priceRange: [0, 200],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      filters.category === "All" || course.category === filters.category;
    const matchesLevel =
      filters.level === "All" || course.level === filters.level;
    const matchesPrice =
      course.price >= filters.priceRange[0] &&
      course.price <= filters.priceRange[1];

    return matchesSearch && matchesCategory && matchesLevel && matchesPrice;
  });

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse,
  );
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-400 py-8">
      <div className="container mx-auto px-4 py-8 flex-col gap-8">
        <div>
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-left"
          >
            <h1 className="text-4xl font-light text-white mb-4 tracking-wide">
              🐶 Available Courses
            </h1>
            <p className="text-zinc-500 font-extralight tracking-wide max-w-2xl">
              Explore our collection of premium courses designed to enhance your
              skills and advance your career.
            </p>
          </motion.div>
        </div>
        <div className="flex gap-x-4">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-64 shrink-0"
          >
            <div className="sticky top-32 space-y-6 bg-[#0a0a0a] border border-zinc-900 p-6 rounded-sm">
              <div>
                <h3 className="text-white font-light mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setFilters({ ...filters, category })}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors duration-300 ${filters.category === category ? "bg-zinc-900 text-white" : "text-zinc-400 hover:text-white"}`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white font-light mb-4">Level</h3>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setFilters({ ...filters, level })}
                      className={`w-full text-left px-3 py-2 text-sm transition-colors duration-300 ${filters.level === level ? "bg-zinc-900 text-white" : "text-zinc-400 hover:text-white"}`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-white font-light mb-4">Price Range</h3>
                <input
                  type="range"
                  min={priceRanges[0]}
                  max={priceRanges[1]}
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      priceRange: [priceRanges[0], parseInt(e.target.value)],
                    })
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-sm mt-2">
                  <span>${priceRanges[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="flex-col">
            {/* Search Bar */}
            <div className="w-full flex justify-start">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-1/3 mb-12"
              >
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border border-zinc-800 rounded-sm px-4 py-3 text-zinc-400 focus:outline-none focus:border-zinc-700 transition-colors duration-300"
                />
              </motion.div>
            </div>

            {/* Course Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {currentCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                  className="group border border-zinc-900 rounded-sm p-4 hover:border-zinc-700 transition-all duration-500"
                >
                  <div className="aspect-square bg-zinc-900 rounded-sm mb-3 overflow-hidden">
                    <motion.img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-base text-white font-light tracking-wide mb-1.5 group-hover:text-gray-200 transition-colors duration-300 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-zinc-500 text-xs font-extralight tracking-wide mb-3 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400 font-light">
                      ${course.price}
                    </span>
                    <button className="bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 px-3 py-1.5 text-[10px] tracking-widest uppercase font-light transition-all duration-300">
                      Enroll Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex justify-center items-center gap-2"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-8 h-8 flex items-center justify-center border ${currentPage === 1 ? "border-zinc-800 text-zinc-600 cursor-not-allowed" : "border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"} transition-colors duration-300`}
                >
                  ←
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => handlePageChange(number)}
                      className={`w-8 h-8 flex items-center justify-center border ${currentPage === number ? "bg-zinc-900 border-zinc-700 text-white" : "border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"} transition-colors duration-300 text-sm font-light`}
                    >
                      {number}
                    </button>
                  ),
                )}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-8 h-8 flex items-center justify-center border ${currentPage === totalPages ? "border-zinc-800 text-zinc-600 cursor-not-allowed" : "border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"} transition-colors duration-300`}
                >
                  →
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
