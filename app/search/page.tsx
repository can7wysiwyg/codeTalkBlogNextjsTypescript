'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';


interface Result {
  _id: string;
  articleTitle: string;
  
}


export default function SearchResults() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('s'); // Get the search query from URL
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchQuery) {
      const fetchResults = async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/search?s=${searchQuery}`);
          const data = await res.json();
          setResults(data.results);
        } catch (error) {
          console.error('Failed to fetch search results:', error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchResults();
    }
  }, [searchQuery]);

  return (
    <div className="container">
      <h1>Search Results for "{searchQuery}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li key={result._id}>
              <Link href={`/${result._id}`}>{result.articleTitle}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}
