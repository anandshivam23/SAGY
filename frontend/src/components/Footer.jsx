export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-black tracking-tighter mb-6">
            SAGY <span className="text-blue-500">PORTAL</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-md">
            Bridging the gap between monitoring and development. A digital platform dedicated to the
            modernization of rural India through the Sansad Adarsh Gram Yojana initiative.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-6">Development Team</h3>
          <ul className="space-y-4 text-gray-300 font-medium">
            <li className="flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
              Shivam
            </li>
            <li className="flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
              Vinay
            </li>
            <li className="flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
              Priyanshu
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-6">Quick Links</h3>
          <ul className="space-y-4 text-gray-400 font-medium">
            <li><a href="/villages" className="hover:text-white transition-colors">Villages Dashboard</a></li>
            <li><a href="/projects" className="hover:text-white transition-colors">Projects Tracking</a></li>
            <li><a href="/complaints" className="hover:text-white transition-colors">Grievance Cell</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-10 mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-gray-500 font-medium">
          © 2025 SAGY Digital Monitoring System. All rights reserved.
        </p>
        <div className="flex gap-8 text-gray-500 font-bold text-sm uppercase tracking-tighter">
          <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">GoI Portal</span>
        </div>
      </div>
    </footer>
  );
}
