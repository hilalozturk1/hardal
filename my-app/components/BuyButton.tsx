"use client";
import { useState } from "react";
import { trackEvent } from "@/utils/hardal";

type Product = {
  id: string;
  name: string;
  category?: string;
  price: number;
  quantity: number;
};

export default function BuyButton() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [products, setProducts] = useState<Product[]>([
    { id: "SKU-1", name: "Wireless Headphones", category: "Electronics", price: 99.99, quantity: 1 },
  ]);

  const addProduct = () =>
    setProducts((p) => [
      ...p,
      { id: `SKU-${Math.floor(Math.random() * 9000 + 1000)}`, name: "", category: "", price: 0, quantity: 1 },
    ]);

  const updateProduct = (idx: number, patch: Partial<Product>) =>
    setProducts((p) => p.map((prod, i) => (i === idx ? { ...prod, ...patch } : prod)));

  const removeProduct = (idx: number) => setProducts((p) => p.filter((_, i) => i !== idx));

  const handleBuy = (e?: React.FormEvent) => {
    e?.preventDefault();

    const totalValue = products.reduce((s, pr) => s + pr.price * pr.quantity, 0);
    const eventData = {
      transaction_id: `ORDER-${Math.floor(Math.random() * 10000)}`,
      value: totalValue,
      currency: "USD",
      customer: {
        email,
        phone,
      },
      ecommerce: {
        products: products.map((p) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          price: p.price,
          quantity: p.quantity,
        })),
      },
    };

    trackEvent("purchase", eventData);
    console.log("Sent purchase event", eventData);
  };

  return (
    <form onSubmit={handleBuy} className="space-y-4 p-4 border rounded-md max-w-xl">
      <div className="grid grid-cols-2 gap-2">
        <label className="flex flex-col">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border rounded"
            required
          />
        </label>

        <label className="flex flex-col">
          Phone
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 p-2 border rounded"
          />
        </label>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <strong>Products</strong>
          <button type="button" onClick={addProduct} className="px-2 py-1 bg-blue-500 text-white rounded">
            Add Product
          </button>
        </div>

        <div className="space-y-3">
          {products.map((prod, idx) => (
            <div key={idx} className="grid grid-cols-6 gap-2 items-end">
              <label className="col-span-1 flex flex-col">
                SKU
                <input
                  value={prod.id}
                  onChange={(e) => updateProduct(idx, { id: e.target.value })}
                  className="mt-1 p-2 border rounded"
                />
              </label>

              <label className="col-span-2 flex flex-col">
                Name
                <input
                  value={prod.name}
                  onChange={(e) => updateProduct(idx, { name: e.target.value })}
                  className="mt-1 p-2 border rounded"
                />
              </label>

              <label className="col-span-1 flex flex-col">
                Price
                <input
                  type="number"
                  step="0.01"
                  value={String(prod.price)}
                  onChange={(e) => updateProduct(idx, { price: parseFloat(e.target.value || "0") })}
                  className="mt-1 p-2 border rounded"
                />
              </label>

              <label className="col-span-1 flex flex-col">
                Qty
                <input
                  type="number"
                  value={String(prod.quantity)}
                  onChange={(e) => updateProduct(idx, { quantity: parseInt(e.target.value || "1", 10) })}
                  className="mt-1 p-2 border rounded"
                  min={1}
                />
              </label>

              <div className="col-span-1 flex gap-2">
                <button type="button" onClick={() => removeProduct(idx)} className="px-2 py-1 bg-red-500 text-white rounded">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Buy
        </button>
        <button type="button" onClick={() => { setEmail(""); setPhone(""); setProducts([{ id: "SKU-1", name: "", category: "", price: 0, quantity: 1 }]); }} className="px-4 py-2 bg-gray-300 rounded-md">
          Reset
        </button>
      </div>
    </form>
  );
}