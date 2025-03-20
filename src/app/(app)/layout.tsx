import Navbar from '@/components/Navbar';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-gray-700 to-purple-400  ">
      
      <Navbar />
     
      {children}
    </div>
  );
}