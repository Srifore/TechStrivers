import React, { useState } from 'react';
import { Search, Trash2, FileSpreadsheet } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminLeads() {
  const { leads, updateLeadStatus, deleteLead } = useData();
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLeadModal, setActiveLeadModal] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNote, setEditNote] = useState('');

  const filteredLeads = leads.filter(lead => {
    const matchesStatus = filterStatus === 'All' || lead.status === filterStatus;
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.phone.includes(searchQuery) ||
                          (lead.college && lead.college.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleOpenLead = (lead) => {
    setActiveLeadModal(lead);
    setEditStatus(lead.status);
    setEditNote(lead.notes || '');
  };

  const handleSaveStatus = (e) => {
    e.preventDefault();
    if (activeLeadModal) {
      updateLeadStatus(activeLeadModal.id, editStatus, editNote);
      setActiveLeadModal(null);
    }
  };

  const exportCSV = () => {
    const headers = ["ID,Name,Email,Phone,College,Domain,Message,Date,Status,Notes\n"];
    const rows = leads.map(l => 
      `"${l.id}","${l.name}","${l.email}","${l.phone}","${l.college || ''}","${l.domain}","${(l.message||'').replace(/"/g, '""')}","${l.date}","${l.status}","${(l.notes||'').replace(/"/g, '""')}"`
    );
    const blob = new Blob([headers.concat(rows.join("\n")).join("")], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TechStrivers_Leads_${new Date().toISOString().substring(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Leads & Student Enquiries</h1>
          <p className="text-slate-400 text-xs mt-0.5">Manage incoming enquiries, project requests, and internship applications.</p>
        </div>
        <button
          onClick={exportCSV}
          className="btn-primary text-xs py-2.5 px-4 gap-1.5"
        >
          <FileSpreadsheet className="w-4 h-4" /> Export CSV ({leads.length})
        </button>
      </div>

      {/* Filter & Search Controls */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Filter status buttons */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['All', 'New', 'Contacted', 'In Progress', 'Closed'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border-none cursor-pointer whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, email, college..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

      </div>

      {/* Table */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Student / Lead</th>
                <th className="py-3.5 px-4">Requirement</th>
                <th className="py-3.5 px-4">College</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No matching leads found.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white text-sm">{lead.name}</div>
                      <div className="text-[11px] text-slate-400">{lead.email} · {lead.phone}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 bg-slate-800 text-slate-200 font-semibold rounded-md text-[11px]">
                        {lead.domain}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-400 font-medium">
                      {lead.college || 'N/A'}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400">
                      {lead.date}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${
                        lead.status === 'New' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse' :
                        lead.status === 'Contacted' ? 'bg-blue-500/20 text-blue-300' :
                        lead.status === 'In Progress' ? 'bg-purple-500/20 text-purple-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {lead.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenLead(lead)}
                          className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px] rounded-lg border-none cursor-pointer"
                        >
                          Details / Notes
                        </button>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="p-1.5 hover:bg-red-900/50 text-slate-400 hover:text-red-400 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail & Status Editor Modal */}
      {activeLeadModal && (
        <div className="modal-overlay" onClick={() => setActiveLeadModal(null)}>
          <div className="modal-content p-6 max-w-lg bg-slate-900 text-white border border-slate-800" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold font-heading text-white mb-4">Lead Details & Status</h3>

            <form onSubmit={handleSaveStatus} className="space-y-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl space-y-2 border border-slate-800">
                <div className="font-bold text-sm text-amber-400">{activeLeadModal.name}</div>
                <div className="text-slate-300">Email: {activeLeadModal.email}</div>
                <div className="text-slate-300">Phone: {activeLeadModal.phone}</div>
                <div className="text-slate-300">College: {activeLeadModal.college || 'N/A'}</div>
                <div className="text-slate-300 font-semibold text-amber-400">Domain: {activeLeadModal.domain}</div>
                <div className="text-slate-400 italic pt-1 border-t border-slate-800">
                  "{activeLeadModal.message}"
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Update Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="form-select-erp"
                >
                  <option value="New" style={{ backgroundColor: '#071A2D', color: '#ffffff' }}>New (Unread)</option>
                  <option value="Contacted" style={{ backgroundColor: '#071A2D', color: '#ffffff' }}>Contacted (In Communication)</option>
                  <option value="In Progress" style={{ backgroundColor: '#071A2D', color: '#ffffff' }}>In Progress (Proposal Sent)</option>
                  <option value="Closed" style={{ backgroundColor: '#071A2D', color: '#ffffff' }}>Closed (Enrolled / Completed)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Internal Admin Notes</label>
                <textarea
                  rows={3}
                  placeholder="Add notes about call status, kit preferences, or price quote..."
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-lg p-2.5 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveLeadModal(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs py-2 px-5"
                >
                  Save Lead Updates
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
