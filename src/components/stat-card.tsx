import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export default function StatCard({ icon, title, value }: StatCardProps) {
  return (
    <div className="bg-red-700 bg-opacity-30 rounded-3xl p-8 shadow-lg flex flex-col items-center transition hover:bg-opacity-50 cursor-default select-none">
      {icon}
      <h3 className="text-3xl font-bold font-headline text-red-300 mb-3 text-center">
        {title}
      </h3>
      <p className="text-5xl font-extrabold text-red-200">
        {value}
      </p>
    </div>
  );
}
