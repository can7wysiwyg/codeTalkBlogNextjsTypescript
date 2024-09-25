'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';


interface AdminData {
  adminRole: string
}

export default function Calculate() {
  const [adminData, setAdminData] = useState<AdminData | null>(null);

   const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await fetch('/api/testo');

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        const parsedData = JSON.parse(data); 
        setAdminData(parsedData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div></div>;

  return (
    <div>
    
      {adminData ? (
        <>
        
          {adminData?.adminRole === 'cockney' ? (
          <Link className="nav-link text-white px-0" href="/components/private/dashboard">Dashboard</Link>
          ) : (
           <p> </p>
          )}
        </>
      ) : (
        <div>No admin data found.</div>
      )}
    </div>
  );
}



