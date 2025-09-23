"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabse";
import AddRetreatPage from "./add-retreat";
import { Trash2, Edit2, Eye, Search } from "lucide-react";

export default function RetreatsComponent() {
  const [retreats, setRetreats] = useState([]);
  const [filteredRetreats, setFilteredRetreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [instructorFilter, setInstructorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch retreats
  const fetchRetreats = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("retreats")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else {
      setRetreats(data || []);
      setFilteredRetreats(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRetreats();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = retreats;

    if (searchQuery) {
      filtered = filtered.filter((r) =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (dateFilter) {
      filtered = filtered.filter((r) => r.date.includes(dateFilter));
    }

    if (instructorFilter) {
      filtered = filtered.filter((r) =>
        (r.teachers || []).some((t) =>
          t.name.toLowerCase().includes(instructorFilter.toLowerCase())
        )
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    setFilteredRetreats(filtered);
  }, [searchQuery, dateFilter, instructorFilter, statusFilter, retreats]);

  // Delete retreat
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this retreat?")) return;
    const { error } = await supabase.from("retreats").delete().eq("id", id);
    if (error) alert("Error deleting retreat: " + error.message);
    else fetchRetreats();
  };

  // Get unique instructors with their original indices
  const getUniqueInstructors = () => {
    const allInstructors = retreats.flatMap((r, index) =>
      (r.teachers || []).map((t) => ({ name: t.name, index }))
    );
    return [...new Set(allInstructors.map((i) => i.name))].map((name) => ({
      name,
      index: allInstructors.findIndex((i) => i.name === name),
    }));
  };

  // Get unique dates for filter
  const getUniqueDates = () => {
    const allDates = retreats.map((r) => r.date);
    return [...new Set(allDates)];
  };

  // Get unique statuses
  const getUniqueStatuses = () => {
    const allStatuses = retreats.map((r) => r.status || "Upcoming");
    return [...new Set(allStatuses)];
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Retreats Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 shadow-sm"
          >
            Create new retreat
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
            </div>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent appearance-none bg-white"
            >
              <option value="">Filter by Date</option>
              {getUniqueDates().map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>

            {/* Instructor Filter */}
            <select
              value={instructorFilter}
              onChange={(e) => setInstructorFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent appearance-none bg-white"
            >
              <option value="">Instructor</option>
              {getUniqueInstructors().map((inst) => (
                <option key={`${inst.name}-${inst.index}`} value={inst.name}>
                  {inst.name}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent appearance-none bg-white"
            >
              <option value="">Status</option>
              {getUniqueStatuses().map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        {/* Retreats List */}
        {filteredRetreats.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No retreats found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredRetreats.map((retreat) => {
              const progress = retreat.capacity ? (retreat.booked / retreat.capacity) * 100 : 0;
              const instructor = retreat.teachers?.[0]?.name || "Instructor name";
              const days = 3; // Hardcoded as per original

              return (
                <div
                  key={retreat.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="relative md:w-80 flex-shrink-0">
                      <img
                        src={retreat.image_url || "https://via.placeholder.com/300x200"}
                        alt={retreat.title || "Retreat Image"}
                        className="w-full h-48 md:h-full object-cover"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/300x200"; }}
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                          {retreat.status || "Upcoming"}
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {retreat.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                            <span className="text-gray-600 text-sm">{instructor}</span>
                          </div>
                          <p className="text-gray-500 text-sm">
                            {retreat.date} ({days} days)
                          </p>
                        </div>
                        
                        {retreat.status === "Upcoming" && (
                          <div className="flex items-center gap-1">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">P</span>
                            </div>
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">A</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4 max-w-xs">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          {retreat.booked || 26}/{retreat.capacity || 40}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                      
                        <button
                          onClick={() => handleDelete(retreat.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center overflow-auto p-4">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl relative my-8">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Create New Retreat</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl font-light transition-colors"
                >
                  ×
                </button>
              </div>
              <div className="p-0">
                <AddRetreatPage onClose={() => { setShowForm(false); fetchRetreats(); }} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}