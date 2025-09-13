export default function PromoForm({ title, discount, setTitle, setDiscount, handleSubmit, editing }) {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Promo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 rounded-lg"
      />
      <input
        type="number"
        placeholder="Discount %"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        className="w-full border p-2 rounded-lg"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        {editing ? "Update Promo" : "Add Promo"}
      </button>
    </div>
  );
}
