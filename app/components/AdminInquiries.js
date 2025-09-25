"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabse';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('contact_requests');
  const [contactRequests, setContactRequests] = useState([]);
  const [filteredContactRequests, setFilteredContactRequests] = useState([]);
  const [workshopRegistrations, setWorkshopRegistrations] = useState([]);
  const [filteredWorkshopRegistrations, setFilteredWorkshopRegistrations] = useState([]);
  const [contactFilters, setContactFilters] = useState({
    retreat_name: '',
    email: '',
    phone: '',
    created_at: '',
  });
  const [workshopFilters, setWorkshopFilters] = useState({
    workshop_name: '',
    name: '',
    email: '',
    phone: '',
    created_at: '',
  });
  const [loading, setLoading] = useState({ contact_requests: true, workshop_registrations: true });
  const [error, setError] = useState({ contact_requests: null, workshop_registrations: null });

  useEffect(() => {
    const fetchContactRequests = async () => {
      try {
        const { data: contactData, error } = await supabase
          .from('contact_requests')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setContactRequests(contactData);
        setFilteredContactRequests(contactData);
      } catch (err) {
        setError((prev) => ({ ...prev, contact_requests: err.message }));
      } finally {
        setLoading((prev) => ({ ...prev, contact_requests: false }));
      }
    };

    const fetchWorkshopRegistrations = async () => {
      try {
        const { data: regData, error } = await supabase
          .from('workshop_registrations')
          .select(`
            id,
            workshop_id,
            name,
            email,
            phone,
            created_at,
            workshops (name)
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        const formattedData = regData.map(reg => ({
          ...reg,
          workshop_name: reg.workshops?.name || 'Unknown Workshop'
        }));
        setWorkshopRegistrations(formattedData);
        setFilteredWorkshopRegistrations(formattedData);
      } catch (err) {
        setError((prev) => ({ ...prev, workshop_registrations: err.message }));
      } finally {
        setLoading((prev) => ({ ...prev, workshop_registrations: false }));
      }
    };

    fetchContactRequests();
    fetchWorkshopRegistrations();
  }, []);

  useEffect(() => {
    let filteredContacts = [...contactRequests];
    if (contactFilters.retreat_name) {
      filteredContacts = filteredContacts.filter((item) =>
        item.retreat_name.toLowerCase().includes(contactFilters.retreat_name.toLowerCase())
      );
    }
    if (contactFilters.email) {
      filteredContacts = filteredContacts.filter((item) =>
        item.email.toLowerCase().includes(contactFilters.email.toLowerCase())
      );
    }
    if (contactFilters.phone) {
      filteredContacts = filteredContacts.filter((item) =>
        item.phone?.toLowerCase().includes(contactFilters.phone.toLowerCase())
      );
    }
    if (contactFilters.created_at) {
      filteredContacts = filteredContacts.filter((item) =>
        new Date(item.created_at).toISOString().split('T')[0].includes(contactFilters.created_at)
      );
    }
    setFilteredContactRequests(filteredContacts);

    let filteredWorkshops = [...workshopRegistrations];
    if (workshopFilters.workshop_name) {
      filteredWorkshops = filteredWorkshops.filter((item) =>
        item.workshop_name.toLowerCase().includes(workshopFilters.workshop_name.toLowerCase())
      );
    }
    if (workshopFilters.name) {
      filteredWorkshops = filteredWorkshops.filter((item) =>
        item.name.toLowerCase().includes(workshopFilters.name.toLowerCase())
      );
    }
    if (workshopFilters.email) {
      filteredWorkshops = filteredWorkshops.filter((item) =>
        item.email.toLowerCase().includes(workshopFilters.email.toLowerCase())
      );
    }
    if (workshopFilters.phone) {
      filteredWorkshops = filteredWorkshops.filter((item) =>
        item.phone?.toLowerCase().includes(workshopFilters.phone.toLowerCase())
      );
    }
    if (workshopFilters.created_at) {
      filteredWorkshops = filteredWorkshops.filter((item) =>
        new Date(item.created_at).toISOString().split('T')[0].includes(workshopFilters.created_at)
      );
    }
    setFilteredWorkshopRegistrations(filteredWorkshops);
  }, [contactFilters, contactRequests, workshopFilters, workshopRegistrations]);

  const handleContactDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this contact request?')) return;
    try {
      const { error } = await supabase
        .from('contact_requests')
        .delete()
        .eq('id', id);

      if (error) throw error;
      const newData = contactRequests.filter((item) => item.id !== id);
      setContactRequests(newData);
      setFilteredContactRequests(newData.filter((item) => {
        if (contactFilters.retreat_name && !item.retreat_name.toLowerCase().includes(contactFilters.retreat_name.toLowerCase())) return false;
        if (contactFilters.email && !item.email.toLowerCase().includes(contactFilters.email.toLowerCase())) return false;
        if (contactFilters.phone && !item.phone?.toLowerCase().includes(contactFilters.phone.toLowerCase())) return false;
        if (contactFilters.created_at && !new Date(item.created_at).toISOString().split('T')[0].includes(contactFilters.created_at)) return false;
        return true;
      }));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleWorkshopDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this workshop registration?')) return;
    try {
      const { error } = await supabase
        .from('workshop_registrations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      const newData = workshopRegistrations.filter((item) => item.id !== id);
      setWorkshopRegistrations(newData);
      setFilteredWorkshopRegistrations(newData.filter((item) => {
        if (workshopFilters.workshop_name && !item.workshop_name.toLowerCase().includes(workshopFilters.workshop_name.toLowerCase())) return false;
        if (workshopFilters.name && !item.name.toLowerCase().includes(workshopFilters.name.toLowerCase())) return false;
        if (workshopFilters.email && !item.email.toLowerCase().includes(workshopFilters.email.toLowerCase())) return false;
        if (workshopFilters.phone && !item.phone?.toLowerCase().includes(workshopFilters.phone.toLowerCase())) return false;
        if (workshopFilters.created_at && !new Date(item.created_at).toISOString().split('T')[0].includes(workshopFilters.created_at)) return false;
        return true;
      }));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleContactFilterChange = (e) => {
    setContactFilters({ ...contactFilters, [e.target.name]: e.target.value });
  };

  const handleWorkshopFilterChange = (e) => {
    setWorkshopFilters({ ...workshopFilters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4">
        <button
          onClick={() => setActiveTab('contact_requests')}
          className={`px-4 py-2 mr-2 rounded ${activeTab === 'contact_requests' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Contact Requests
        </button>
        <button
          onClick={() => setActiveTab('workshop_registrations')}
          className={`px-4 py-2 rounded ${activeTab === 'workshop_registrations' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Workshop Registrations
        </button>
      </div>

      {activeTab === 'contact_requests' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact Requests</h2>
          {loading.contact_requests ? (
            <div className="text-center p-4">Loading...</div>
          ) : error.contact_requests ? (
            <div className="text-center p-4 text-red-500">Error: {error.contact_requests}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <input
                  type="text"
                  name="retreat_name"
                  placeholder="Filter by Retreat Name"
                  value={contactFilters.retreat_name}
                  onChange={handleContactFilterChange}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Filter by Email"
                  value={contactFilters.email}
                  onChange={handleContactFilterChange}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Filter by Phone"
                  value={contactFilters.phone}
                  onChange={handleContactFilterChange}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  name="created_at"
                  placeholder="Filter by Date (YYYY-MM-DD)"
                  value={contactFilters.created_at}
                  onChange={handleContactFilterChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b text-left">ID</th>
                      <th className="py-2 px-4 border-b text-left">Retreat Name</th>
                      <th className="py-2 px-4 border-b text-left">Email</th>
                      <th className="py-2 px-4 border-b text-left">Phone</th>
                      <th className="py-2 px-4 border-b text-left">Created At</th>
                      <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContactRequests.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-2 px-4 text-center">
                          No data found
                        </td>
                      </tr>
                    ) : (
                      filteredContactRequests.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b">{item.id}</td>
                          <td className="py-2 px-4 border-b">{item.retreat_name}</td>
                          <td className="py-2 px-4 border-b">{item.email}</td>
                          <td className="py-2 px-4 border-b">{item.phone || '-'}</td>
                          <td className="py-2 px-4 border-b">
                            {new Date(item.created_at).toLocaleString()}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <button
                              onClick={() => handleContactDelete(item.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'workshop_registrations' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Workshop Registrations</h2>
          {loading.workshop_registrations ? (
            <div className="text-center p-4">Loading...</div>
          ) : error.workshop_registrations ? (
            <div className="text-center p-4 text-red-500">Error: {error.workshop_registrations}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <input
                  type="text"
                  name="workshop_name"
                  placeholder="Filter by Workshop Name"
                  value={workshopFilters.workshop_name}
                  onChange={handleWorkshopFilterChange}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Filter by Name"
                  value={workshopFilters.name}
                  onChange={handleWorkshopFilterChange}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Filter by Email"
                  value={workshopFilters.email}
                  onChange={handleWorkshopFilterChange}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Filter by Phone"
                  value={workshopFilters.phone}
                  onChange={handleWorkshopFilterChange}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="text"
                  name="created_at"
                  placeholder="Filter by Date (YYYY-MM-DD)"
                  value={workshopFilters.created_at}
                  onChange={handleWorkshopFilterChange}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b text-left">ID</th>
                      <th className="py-2 px-4 border-b text-left">Workshop Name</th>
                      <th className="py-2 px-4 border-b text-left">Name</th>
                      <th className="py-2 px-4 border-b text-left">Email</th>
                      <th className="py-2 px-4 border-b text-left">Phone</th>
                      <th className="py-2 px-4 border-b text-left">Created At</th>
                      <th className="py-2 px-4 border-b text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWorkshopRegistrations.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-2 px-4 text-center">
                          No data found
                        </td>
                      </tr>
                    ) : (
                      filteredWorkshopRegistrations.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b">{item.id}</td>
                          <td className="py-2 px-4 border-b">{item.workshop_name}</td>
                          <td className="py-2 px-4 border-b">{item.name}</td>
                          <td className="py-2 px-4 border-b">{item.email}</td>
                          <td className="py-2 px-4 border-b">{item.phone || '-'}</td>
                          <td className="py-2 px-4 border-b">
                            {new Date(item.created_at).toLocaleString()}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <button
                              onClick={() => handleWorkshopDelete(item.id)}
                              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;