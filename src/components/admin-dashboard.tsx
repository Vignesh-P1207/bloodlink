"use client";
import { useEffect, useState } from 'react';
import { Bell, Hospital, Users } from "lucide-react";
import StatCard from "./stat-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { RecentAlert, Donor } from "@/lib/types";

const recentAlerts: RecentAlert[] = [
  { id: "ALRT-1001", bloodGroup: "O+", component: "PRBC", donorContact: "+919876543210", status: "Accepted", timestamp: "2024-06-10 09:15" },
  { id: "ALRT-1002", bloodGroup: "A-", component: "Platelets", donorContact: "+919812345678", status: "No Response", timestamp: "2024-06-10 10:05" },
  { id: "ALRT-1003", bloodGroup: "Bombay (hh)", component: "Whole Blood", donorContact: "+919899998888", status: "Pending", timestamp: "2024-06-10 11:20" },
  { id: "ALRT-1004", bloodGroup: "B+", component: "FFP", donorContact: "+919877766554", status: "Accepted", timestamp: "2024-06-10 12:45" },
  { id: "ALRT-1005", bloodGroup: "AB-", component: "PRBC", donorContact: "+919811122334", status: "No Response", timestamp: "2024-06-10 13:30" },
];

const getStatusClass = (status: RecentAlert['status']) => {
  switch (status) {
    case 'Accepted': return 'text-green-400';
    case 'No Response': return 'text-red-500';
    case 'Pending': return 'text-yellow-400';
    default: return '';
  }
}

export default function AdminDashboard() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [totalDonors, setTotalDonors] = useState(1245);

  useEffect(() => {
    try {
      const storedDonors: Donor[] = JSON.parse(localStorage.getItem("donors") || "[]");
      setDonors(storedDonors);
      setTotalDonors(1245 + storedDonors.length);
    } catch (error) {
      console.error("Could not retrieve donors from localStorage", error);
      setDonors([]);
    }
  }, []);

  return (
    <section aria-label="Admin Dashboard Section" className="glass-container p-10 shadow-lg" id="admin" tabIndex={0}>
      <h2 className="text-5xl font-extrabold font-headline text-red-300 mb-10 text-center drop-shadow-lg">
        Admin Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <StatCard icon={<Users className="w-20 h-20 text-red-400 mb-6 drop-shadow-lg" />} title="Total Registered Donors" value={totalDonors.toLocaleString()} />
        <StatCard icon={<Hospital className="w-20 h-20 text-red-400 mb-6 drop-shadow-lg" />} title="Active Hospitals" value="32" />
        <StatCard icon={<Bell className="w-20 h-20 text-red-400 mb-6 drop-shadow-lg" />} title="Alerts Sent Today" value="87" />
      </div>

      {donors.length > 0 && (
         <div className="mt-16">
          <h3 className="text-4xl font-bold font-headline mb-8 text-red-400 drop-shadow-md text-center">
            Newly Registered Donors
          </h3>
          <div className="overflow-x-auto border-4 border-red-600 rounded-3xl shadow-2xl max-w-full bg-white bg-opacity-10 backdrop-blur-md">
            <Table className="min-w-full text-left text-sm text-red-200">
              <TableHeader className="bg-red-700 bg-opacity-80 font-bold uppercase tracking-wide">
                <TableRow>
                  <TableHead className="px-10 py-5 border-b border-red-600">Name</TableHead>
                  <TableHead className="px-10 py-5 border-b border-red-600">Email</TableHead>
                  <TableHead className="px-10 py-5 border-b border-red-600">Phone</TableHead>
                  <TableHead className="px-10 py-5 border-b border-red-600">Blood Group</TableHead>
                  <TableHead className="px-10 py-5 border-b border-red-600">Location</TableHead>
                  <TableHead className="px-10 py-5 border-b border-red-600">Registered On</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donors.map((donor, index) => (
                  <TableRow key={index} className={`border-b border-red-500 hover:bg-red-800 hover:bg-opacity-50 transition ${index % 2 !== 0 ? 'bg-red-900 bg-opacity-30' : ''}`}>
                    <TableCell className="px-10 py-5 font-semibold">{donor.donorName}</TableCell>
                    <TableCell className="px-10 py-5">{donor.donorEmail}</TableCell>
                    <TableCell className="px-10 py-5 font-mono text-red-400">{donor.donorPhone}</TableCell>
                    <TableCell className="px-10 py-5">{donor.donorBloodGroup}</TableCell>
                    <TableCell className="px-10 py-5">{donor.donorLocation}</TableCell>
                    <TableCell className="px-10 py-5">{new Date(donor.registrationDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      <div className="mt-16">
        <h3 className="text-4xl font-bold font-headline mb-8 text-red-400 drop-shadow-md text-center">
          Recent Alerts & Responses
        </h3>
        <div className="overflow-x-auto border-4 border-red-600 rounded-3xl shadow-2xl max-w-full bg-white bg-opacity-10 backdrop-blur-md">
          <Table className="min-w-full text-left text-sm text-red-200">
            <TableHeader className="bg-red-700 bg-opacity-80 font-bold uppercase tracking-wide">
              <TableRow>
                <TableHead className="px-10 py-5 border-b border-red-600">Alert ID</TableHead>
                <TableHead className="px-10 py-5 border-b border-red-600">Blood Group</TableHead>
                <TableHead className="px-10 py-5 border-b border-red-600">Component</TableHead>
                <TableHead className="px-10 py-5 border-b border-red-600">Donor Contact</TableHead>
                <TableHead className="px-10 py-5 border-b border-red-600">Status</TableHead>
                <TableHead className="px-10 py-5 border-b border-red-600">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentAlerts.map((alert, index) => (
                <TableRow key={alert.id} className={`border-b border-red-500 hover:bg-red-800 hover:bg-opacity-50 transition ${index % 2 !== 0 ? 'bg-red-900 bg-opacity-30' : ''}`}>
                  <TableCell className="px-10 py-5 font-semibold">{alert.id}</TableCell>
                  <TableCell className="px-10 py-5">{alert.bloodGroup}</TableCell>
                  <TableCell className="px-10 py-5">{alert.component}</TableCell>
                  <TableCell className="px-10 py-5 font-mono text-red-400">{alert.donorContact}</TableCell>
                  <TableCell className={`px-10 py-5 font-semibold ${getStatusClass(alert.status)}`}>{alert.status}</TableCell>
                  <TableCell className="px-10 py-5">{alert.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
