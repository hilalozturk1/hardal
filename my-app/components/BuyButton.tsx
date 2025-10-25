// components/BuyButton.tsx
import { trackEvent } from "@/utils/hardal";

export default function BuyButton() {
  const handleBuy = () => {
    trackEvent("purchase", {
      transaction_id: "ORDER123",
      value: 99.99,
      currency: "USD",
    });
  };

  return (
    <button onClick={handleBuy} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Buy Button</button>
  )
}
