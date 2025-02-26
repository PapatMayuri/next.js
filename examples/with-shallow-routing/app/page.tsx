"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const counterFromURL = searchParams.get("counter") ? parseInt(searchParams.get("counter") as string) : 0;
  
  const [counter, setCounter] = useState(counterFromURL);
  const [serverCounter, setServerCounter] = useState<number | null>(null);

  // Fetch server-side counter when the component mounts
  useEffect(() => {  
    const fetchCounter = async () => {
      try {
        const res = await fetch("/api/counter");  
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setServerCounter(data.counter);
      } catch (error) {
        console.error("Error fetching counter:", error);
      }
    };
  
    fetchCounter();
  }, []);
  

  // Function to update the counter in the URL (shallow routing)
  const incrementCounter = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
    router.push(`/?counter=${newCounter}`, { scroll: false });
  };

  return (
    <div>
      <h2>This is the Home Page</h2>
      <Link href="/about">About</Link>
      <button onClick={() => router.refresh()}>Reload</button>
      <button onClick={incrementCounter}>Change State Counter</button>
      <p>"Server-side Counter" ran for "{serverCounter}" times.</p>
      <p>Counter: "{counter}".</p>
    </div>
  );
}