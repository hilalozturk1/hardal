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

  const addProduct = () => {
    const newProduct: Product = {
      id: `SKU-${Math.floor(Math.random() * 9000 + 1000)}`,
      name: "Sample Product",
      category: "Misc",
      price: parseFloat((Math.random() * 200 + 10).toFixed(2)),
      quantity: 1,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = (idx: number, patch: Partial<Product>) =>
    setProducts((prev) => prev.map((p, i) => (i === idx ? { ...p, ...patch } : p)));

  const removeProduct = (idx: number) =>
    setProducts((prev) => prev.filter((_, i) => i !== idx));

  const handleBuy = (e?: React.FormEvent) => {
    e?.preventDefault();

    const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

    // Construct event data
    const eventData = {
      transaction_id: `ORDER-${Math.floor(Math.random() * 10000)}`,
      value: parseFloat(totalValue.toFixed(2)),
      currency: "USD",
      email,
      phone,
      // Add first product details directly
      item_id: products[0]?.id || "",
      item_name: products[0]?.name || "",
      item_category: products[0]?.category || "Uncategorized",
      item_price: products[0]?.price || 0,
      item_quantity: products[0]?.quantity || 0,
      ...(products.slice(1).reduce((acc, product, index) => ({
        ...acc,
        [`item_${index + 2}_id`]: product.id,
        [`item_${index + 2}_name`]: product.name,
        [`item_${index + 2}_category`]: product.category || "Uncategorized",
        [`item_${index + 2}_price`]: product.price,
        [`item_${index + 2}_quantity`]: product.quantity,
      }), {}))
    };

    try {
      trackEvent("purchase", eventData);
      console.log("✅ Hardal event sent:", eventData);
    } catch (err) {
      console.error("❌ Failed to send event:", err);
    }
  };

  return (
    <form onSubmit={handleBuy} className="space-y-4 p-4 border rounded-md max-w-xl mx-auto">
      {/* Customer Info */}
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

      {/* Product List */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <strong>Products</strong>
          <button
            type="button"
            onClick={addProduct}
            className="px-2 py-1 bg-blue-500 text-white rounded"
          >
            Add Product
          </button>
        </div>

        <div className="space-y-3">
          {products.map((p, idx) => (
            <div key={p.id} className="grid grid-cols-6 gap-2 items-end">
              <label className="col-span-2 flex flex-col">
                Name
                <input
                  value={p.name}
                  onChange={(e) => updateProduct(idx, { name: e.target.value })}
                  className="mt-1 p-2 border rounded"
                />
              </label>

              <label className="col-span-1 flex flex-col">
                Price
                <input
                  type="number"
                  step="0.01"
                  value={String(p.price)}
                  onChange={(e) =>
                    updateProduct(idx, { price: parseFloat(e.target.value || "0") })
                  }
                  className="mt-1 p-2 border rounded"
                />
              </label>

              <label className="col-span-1 flex flex-col">
                Qty
                <input
                  type="number"
                  value={String(p.quantity)}
                  onChange={(e) =>
                    updateProduct(idx, { quantity: parseInt(e.target.value || "1", 10) })
                  }
                  className="mt-1 p-2 border rounded"
                  min={1}
                />
              </label>

              <div className="col-span-1 flex gap-2">
                <button
                  type="button"
                  onClick={() => removeProduct(idx)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Send Purchase
        </button>
        <button
          type="button"
          onClick={() => {
            setEmail("");
            setPhone("");
            setProducts([
              { id: "SKU-1", name: "Wireless Headphones", category: "Electronics", price: 99.99, quantity: 1 },
            ]);
          }}
          className="px-4 py-2 bg-gray-300 rounded-md"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
