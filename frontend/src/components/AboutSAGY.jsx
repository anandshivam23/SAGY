export default function AboutSAGY() {
  const points = [
    {
      title: "Holistic Development",
      text: "Focusing on social, economic, and infrastructure growth simultaneously to create sustainable model villages.",
      color: "blue",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
      )
    },
    {
      title: "Community First",
      text: "Involving villagers in decision-making and project monitoring through localized digital nodes.",
      color: "indigo",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
      )
    },
    {
      title: "Radical Transparency",
      text: "Open data policy allowing real-time tracking of every rupee spent and every brick laid.",
      color: "emerald",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
      )
    }
  ];

  return (
    <section className="px-10 py-32 bg-gray-50/30 overflow-hidden relative">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-50 rounded-full filter blur-3xl opacity-50 -z-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-1/2">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-4">Foundation & Vision</h2>
          <h3 className="text-5xl font-black text-gray-900 mb-8 leading-tight tracking-tighter">
            Transforming Rural India, <br />
            <span className="text-gray-400">One Adarsh Gram at a time.</span>
          </h3>
          <p className="text-xl text-gray-500 font-medium leading-relaxed mb-10 max-w-xl">
            The Sansad Adarsh Gram Yojana is more than just infrastructure. It's a movement towards
            holistic village empowerment, merging traditional wisdom with modern governance.
          </p>

          <div className="space-y-8">
            {points.map((point, idx) => (
              <div key={idx} className="flex gap-6 group">
                <div className={`mt-1 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm border border-gray-100 group-hover:shadow-md bg-white text-${point.color}-600`}>
                  {point.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{point.title}</h4>
                  <p className="text-gray-500 font-medium leading-relaxed">{point.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2 relative">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 w-full aspect-square rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="space-y-6 text-white">
                <div className="text-8xl font-black opacity-10">SAGY</div>
                <div className="text-3xl font-light italic leading-snug">
                  "If the village perishes, India will perish too. It will be no more India.
                  Her own mission in the world will get lost."
                </div>
                <div className="text-xl font-black uppercase tracking-widest">— Mahatma Gandhi</div>
              </div>
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"></div>
          </div>

          {/* Stats Card Overlay */}
          <div className="absolute -bottom-10 -right-10 md:right-10 bg-white p-8 rounded-3xl shadow-2xl border border-gray-50 max-w-xs animate-bounce-slow">
            <div className="text-4xl font-black text-gray-900 mb-1">2,500+</div>
            <div className="text-sm font-black text-gray-400 uppercase tracking-widest">Villages Adopted</div>
            <div className="mt-4 flex -space-x-3 overflow-hidden">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-200"></div>
              ))}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white ring-2 ring-white">
                +8k
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
