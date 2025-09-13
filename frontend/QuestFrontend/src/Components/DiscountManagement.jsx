import React, { useState } from "react";

export default function DiscountManagement() {
  const [promos, setPromos] = useState([
    { title: "New Year Sale", discount: 20 },
    { title: "Festive Bonanza", discount: 15 },
    { title: "Summer Sales", discount: 25 },
  ]);

  const [title, setTitle] = useState("");
  const [discount, setDiscount] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const savePromo = () => {
    if (!title || !discount) return;

    if (editingIndex !== null) {
      const updated = [...promos];
      updated[editingIndex] = { title, discount: Number(discount) };
      setPromos(updated);
      setEditingIndex(null);
    } else {
      setPromos([...promos, { title, discount: Number(discount) }]);
    }

    setTitle("");
    setDiscount("");
  };

  const editPromo = (index) => {
    setTitle(promos[index].title);
    setDiscount(promos[index].discount);
    setEditingIndex(index);
  };

  const deletePromo = (index) => {
    setPromos(promos.filter((_, i) => i !== index));
    if (editingIndex === index) {
      setTitle("");
      setDiscount("");
      setEditingIndex(null);
    }
  };

  return (
    <div className="card" style={{ textAlign: "center" }}>
      <h2>Discount Management</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {promos.map((promo, index) => (
          <li key={index} style={{ marginBottom: "15px" }}>
            <div>{promo.title} {promo.discount}% OFF</div>
            <div style={{ marginTop: "8px" }}>
              <button className="edit" onClick={() => editPromo(index)}>
                Edit
              </button>
              <button className="delete" onClick={() => deletePromo(index)} style={{ marginLeft: "10px" }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "20px" }}>
        <input
          placeholder="Promo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          placeholder="Discount %"
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button className="add-promo" onClick={savePromo}>
          {editingIndex !== null ? "Update Promo" : "Add Promo"}
        </button>
      </div>
    </div>
  );
}
