export default function InfoCards() {
  const cards = [
    {
      title: "Project Monitoring",
      desc: "Track village development projects with real-time status updates and financial progress tracking.",
      icon: "📊",
      color: "blue",
    },
    {
      title: "Transparency & Governance",
      desc: "Role-based access ensures secure, transparent, and accountable administration at all levels.",
      icon: "🏛️",
      color: "green",
    },
    {
      title: "Complaint Redressal",
      desc: "Efficient grievance redressal mechanism allowing citizens to raise issues and track resolutions.",
      icon: "📢",
      color: "purple",
    },
    {
      title: "Resource Management",
      desc: "Optimize the allocation and utilization of resources for maximum impact in village development.",
      icon: "💧",
      color: "teal",
    },
    {
      title: "Social Audit",
      desc: "Empower communities to audit development works and ensure quality and adherence to standards.",
      icon: "👥",
      color: "orange",
    },
    {
      title: "Digital Connectivity",
      desc: "Bridging the digital divide by integrating modern technology into rural governance.",
      icon: "🌐",
      color: "indigo",
    },
  ];

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Key Features</h2>
        <div className="h-1 w-20 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        <p className="text-gray-600 mt-4 text-lg">Empowering villages with state-of-the-art digital infrastructure</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-10 max-w-7xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-blue-100 transition-all duration-500 hover:-translate-y-2 group"
          >
            <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              {card.title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
