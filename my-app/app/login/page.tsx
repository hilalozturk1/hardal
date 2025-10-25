// pages/login.tsx

'use client';
import BuyButton from "@/components/BuyButton";
import { identifyUser } from "@/utils/hardal";
import { ContactForm } from "../providers";

export default function LoginPage() {
  const handleLogin = async () => {
    const user = {
      id: "12345",
      email: "ozhilal222@gmail.com",
      name: "Hilal Öztürk",
      plan: "premium",
    };

    identifyUser({
      user_id: user.id,
      email: user.email,
      name: user.name,
      plan: user.plan,
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <h1 className="text-2xl font-bold">Login</h1>
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Login and Identify User
      </button>
        <ContactForm />
      <BuyButton />
    </div>
  );
}
