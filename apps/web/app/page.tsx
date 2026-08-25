"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const signUp = async () => {
    setError(null);
    const { error } = await authClient.signUp.email({ email, password, name: email });
    if (error) setError(error.message ?? "Sign up failed");
  };

  const signIn = async () => {
    setError(null);
    const { error } = await authClient.signIn.email({ email, password });
    if (error) setError(error.message ?? "Sign in failed");
  };

  const signOut = async () => {
    await authClient.signOut();
  };

  if (isPending) return <p>Loading...</p>;

  if (session)
    return (
      <main style={{ padding: 40 }}>
        <p>
          Signed in as <strong>{session.user.email}</strong>
        </p>
        <button onClick={signOut}>Sign out</button>
      </main>
    );

  return (
    <main style={{ padding: 40, display: "grid", gap: 12, maxWidth: 320 }}>
      <input
        placeholder="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={signIn}>Sign in</button>
        <button onClick={signUp}>Sign up</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}
