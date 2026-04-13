"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { parseApiError } from "@/lib/api-error";
import Header from "@/components/Header";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        toast.success("Signed in");
        router.push("/self-dashboard");
      } else {
        const msg = await parseApiError(res, "Login failed");
        setError(msg);
        toast.error(msg);
      }
    } catch {
      const msg = "Could not reach the server";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-[var(--foreground)] font-sans">
      <Header />
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-medium tracking-tight mb-2">CMS Access</h1>
            <p className="text-gray-500 text-sm">Sign in to manage your portfolio</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-gray-400">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 dark:bg-white/5 border border-gray-200 dark:border-gray-800 p-4 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-wider text-gray-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 dark:bg-white/5 border border-gray-200 dark:border-gray-800 p-4 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                required
              />
            </div>

            {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black dark:bg-white text-white dark:text-black font-medium py-4 rounded-xl transition-all hover:opacity-90 disabled:opacity-50 text-sm"
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
