export default function RecentUpdates() {
    const updates = [
        {
            id: 1,
            text: "New road construction project approved in Rampur",
            type: "new",
            color: "blue",
            time: "2 hours ago"
        },
        {
            id: 2,
            text: "Water supply complaint resolved in Shivpur",
            type: "resolved",
            color: "green",
            time: "5 hours ago"
        },
        {
            id: 3,
            text: "School renovation project is ongoing in Devgaon",
            type: "ongoing",
            color: "yellow",
            time: "Yesterday"
        },
    ];

    const getColorClass = (color) => {
        switch (color) {
            case "blue":
                return "border-blue-500 bg-blue-50/50";
            case "green":
                return "border-green-500 bg-green-50/50";
            case "yellow":
                return "border-yellow-500 bg-yellow-50/50";
            default:
                return "border-gray-500 bg-gray-50/50";
        }
    };

    const getIcon = (color) => {
        switch (color) {
            case "blue": return (
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                </div>
            );
            case "green": return (
                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 shadow-inner">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
            );
            case "yellow": return (
                <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center text-yellow-600 shadow-inner">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
            );
            default: return "📢";
        }
    };

    return (
        <section className="px-10 py-16 bg-white border-y border-gray-100">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-6 mb-12">
                    <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900">
                        Live Status <span className="text-blue-600">Feed</span>
                    </h2>
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-gray-100 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {updates.map((update) => (
                        <div
                            key={update.id}
                            className={`p-6 border-l-4 rounded-2xl shadow-sm flex flex-col gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${getColorClass(
                                update.color
                            )}`}
                        >
                            <div className="flex justify-between items-start">
                                {getIcon(update.color)}
                                <span className="text-gray-400 text-xs font-black uppercase tracking-widest">{update.time}</span>
                            </div>
                            <div>
                                <span className="text-gray-900 font-bold text-lg leading-tight block">{update.text}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
