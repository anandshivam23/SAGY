export default function StatCard({ title, value }) {
  return (
    <div className="bg-white shadow rounded p-4 w-full">
      <h3 className="text-gray-600 text-lg">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
