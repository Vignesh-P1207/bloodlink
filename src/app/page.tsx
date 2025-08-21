import Link from 'next/link';
import { Users, Hospital, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="text-center">
      <Image
        src="/logo.png"
        alt="BloodLink Logo"
        width={150}
        height={150}
        className="mx-auto mb-4"
      />
      <h1 className="text-6xl font-extrabold font-headline text-red-200 mb-6 drop-shadow-xl">
        Welcome to BloodLink
      </h1>
      <p className="text-3xl text-red-300 mb-12 max-w-3xl mx-auto font-semibold tracking-wider">
        TOGETHER WE SHARE LIFE
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        <Link href="/donor">
          <div className="glass-container p-8 text-center h-full flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105">
            <Users className="w-24 h-24 text-red-300 mb-6 drop-shadow-lg" />
            <h2 className="text-4xl font-bold font-headline text-red-300">
              Donor Portal
            </h2>
          </div>
        </Link>
        <Link href="/hospital">
          <div className="glass-container p-8 text-center h-full flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105">
            <Hospital className="w-24 h-24 text-red-300 mb-6 drop-shadow-lg" />
            <h2 className="text-4xl font-bold font-headline text-red-300">
              Hospital Portal
            </h2>
          </div>
        </Link>
        <Link href="/admin">
          <div className="glass-container p-8 text-center h-full flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105">
            <ShieldCheck className="w-24 h-24 text-red-300 mb-6 drop-shadow-lg" />
            <h2 className="text-4xl font-bold font-headline text-red-300">
              Admin Dashboard
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
}
