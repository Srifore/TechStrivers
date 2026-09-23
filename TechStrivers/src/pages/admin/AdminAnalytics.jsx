import React from 'react';
import { Users, Cpu, GraduationCap, FileText, ArrowUpRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

export default function AdminAnalytics({ setActiveTab }) {
  const { leads, projects, courses, blogs } = useData();

  const newLeads = leads.filter(l => l.status === 'New').length;
  const contactedLeads = leads.filter(l => l.status === 'Contacted' || l.status === 'In Progress').length;
  const closedLeads = leads.filter(l => l.status === 'Closed').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">ERP System Dashboard</h1>
          <p className="text-slate-400 text-xs mt-1">Real-time overview of student inquiries, hardware projects, courses, and blog posts.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab('leads')}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition-colors border-none cursor-pointer flex items-center gap-1.5"
          >
            Manage Enquiries ({newLeads} New) <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-heading text-white">{leads.length}</div>
          <div className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse" />
            {newLeads} Action Required
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Projects</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
              <Cpu className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-heading text-white">{projects.length}</div>
          <div className="text-[11px] text-slate-400">Published on Website</div>
        </div>

        {/* Metric 3 */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Courses Catalog</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-heading text-white">{courses.length}</div>
          <div className="text-[11px] text-emerald-400 font-semibold">Active Masterclasses</div>
        </div>

        {/* Metric 4 */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Blog Articles</span>
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold font-heading text-white">{blogs.length}</div>
          <div className="text-[11px] text-purple-400 font-semibold">Live Articles</div>
        </div>

      </div>

      {/* Grid Row: Lead Status Breakdown & Recent Inquiries Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Lead Status Progress */}
        <div className="lg:col-span-5 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
          <h3 className="font-heading font-bold text-lg text-white">Lead Funnel Distribution</h3>
          
          <div className="space-y-4">
            
            {/* New */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-400">New Unread Leads</span>
                <span className="text-slate-300">{newLeads} ({Math.round((newLeads/leads.length || 0)*100)}%)</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: `${(newLeads/leads.length || 0)*100}%` }} />
              </div>
            </div>

            {/* In Contact */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-blue-400">In Contact / In Progress</span>
                <span className="text-slate-300">{contactedLeads} ({Math.round((contactedLeads/leads.length || 0)*100)}%)</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${(contactedLeads/leads.length || 0)*100}%` }} />
              </div>
            </div>

            {/* Closed / Enrolled */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-400">Closed / Enrolled</span>
                <span className="text-slate-300">{closedLeads} ({Math.round((closedLeads/leads.length || 0)*100)}%)</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${(closedLeads/leads.length || 0)*100}%` }} />
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
            💡 Enquiries submitted from the public website forms automatically land in the Leads Inbox in real time.
          </div>
        </div>

        {/* Right: Recent Inquiries Stream */}
        <div className="lg:col-span-7 bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-white">Recent Enquiries Stream</h3>
            <button
              onClick={() => setActiveTab('leads')}
              className="text-xs text-amber-400 hover:underline font-bold border-none bg-transparent cursor-pointer"
            >
              View Inbox →
            </button>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 4).map((lead) => (
              <div key={lead.id} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{lead.name}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      lead.status === 'New' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      lead.status === 'Contacted' ? 'bg-blue-500/20 text-blue-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">{lead.domain} · {lead.college || 'General'}</div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">"{lead.message}"</p>
                </div>

                <div className="text-[10px] text-slate-500 font-mono shrink-0">
                  {lead.date}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
