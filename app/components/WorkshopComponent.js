"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Search,
  Pencil,
  Trash2,
  Plus,
  X,
  Calendar as CalendarIcon,
  Image as ImageIcon
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const WorkshopComponent = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    event_date: "",
    image_url: "",
    location: "" // added
  });
  const [imageFile, setImageFile] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("workshops")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      setError(error.message);
    } else {
      setWorkshops(data);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!imageFile) return null;
    const fileName = `${Date.now()}_${imageFile.name}`;
    const { data, error } = await supabase.storage
      .from("workshops-images")
      .upload(fileName, imageFile);
    if (error) {
      console.error("Image upload error:", error);
      return null;
    }
    const { publicUrl } = supabase.storage
      .from("workshops-images")
      .getPublicUrl(fileName).data;
    return publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = formData.image_url;
    if (imageFile) {
      imageUrl = await uploadImage();
      if (!imageUrl) {
        setError("Failed to upload image");
        return;
      }
    }

    if (editingWorkshop) {
      const { error } = await supabase
        .from("workshops")
        .update({ ...formData, image_url: imageUrl })
        .eq("id", editingWorkshop.id);
      if (error) setError(error.message);
    } else {
      const { error } = await supabase
        .from("workshops")
        .insert({ ...formData, image_url: imageUrl });
      if (error) setError(error.message);
    }

    setShowModal(false);
    setEditingWorkshop(null);
    setFormData({ name: "", description: "", event_date: "", image_url: "", location: "" });
    setImageFile(null);
    fetchWorkshops();
  };

  const handleEdit = (workshop) => {
    setEditingWorkshop(workshop);
    setFormData({
      name: workshop.name,
      description: workshop.description,
      event_date: workshop.event_date ? new Date(workshop.event_date).toISOString().slice(0, 16) : "",
      image_url: workshop.image_url,
      location: workshop.location || "" // added
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this workshop?")) {
      const { error } = await supabase
        .from("workshops")
        .delete()
        .eq("id", id);
      if (error) setError(error.message);
      else fetchWorkshops();
    }
  };

  const filteredWorkshops = workshops.filter((w) =>
    w.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="text-center py-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button
            onClick={() => {
              setShowModal(true);
              setEditingWorkshop(null);
              setFormData({ name: "", description: "", event_date: "", image_url: "", location: "" });
            }}
            className="w-full md:w-auto px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Workshop
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
              <th className="px-6 py-3">Name</th><th className="px-6 py-3">Description</th><th className="px-6 py-3">Date</th><th className="px-6 py-3">Location</th><th className="px-6 py-3">Image</th><th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700 divide-y divide-gray-200">
            {filteredWorkshops.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No workshops found
                </td>
              </tr>
            ) : (
              filteredWorkshops.map((workshop) => (
                <tr key={workshop.id} className="hover:bg-gray-50 hover:shadow-md transition-all duration-200">
                  <td className="px-6 py-4">{workshop.name}</td><td className="px-6 py-4">{workshop.description?.slice(0, 50)}...</td><td className="px-6 py-4">{workshop.event_date ? new Date(workshop.event_date).toLocaleString() : "N/A"}</td><td className="px-6 py-4">{workshop.location || "N/A"}</td><td className="px-6 py-4">{workshop.image_url ? (<img src={workshop.image_url} alt="Workshop" className="w-16 h-10 object-cover rounded-lg" />) : "No image"}</td><td className="px-6 py-4 flex gap-3"><button onClick={() => handleEdit(workshop)} className="text-blue-500 hover:text-blue-700 transition-all duration-200"><Pencil className="w-5 h-5" /></button><button onClick={() => handleDelete(workshop.id)} className="text-red-500 hover:text-red-700 transition-all duration-200"><Trash2 className="w-5 h-5" /></button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-70 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl border border-gray-200 transform scale-100 hover:scale-105 transition-all duration-300">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingWorkshop ? "Edit Workshop" : "Add Workshop"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 transition duration-200">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="datetime-local"
                    name="event_date"
                    value={formData.event_date}
                    onChange={handleInputChange}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label> {/* added */}
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  />
                </div>
                {editingWorkshop?.image_url && (
                  <p className="mt-2 text-sm text-gray-500">Current image: <a href={editingWorkshop.image_url} target="_blank" rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800">View</a></p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                {editingWorkshop ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopComponent;
