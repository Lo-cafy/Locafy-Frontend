"use client";

export default function RelatedServices({ related }: { related: any[] }) {
  return (
    <section className="space-y-3">
      <h2 className="font-semibold text-lg">Related Services</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {related.map((rel: any) => (
          <div key={rel.id} className="bg-white rounded shadow hover:shadow-md transition p-2">
            <img src={rel.image} className="w-full h-24 object-cover rounded" />
            <p className="mt-2 font-medium text-sm">{rel.name}</p>
            <p className="text-blue-600 font-semibold">${rel.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
