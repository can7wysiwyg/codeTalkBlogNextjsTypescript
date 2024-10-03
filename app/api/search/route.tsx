import connect from '@/db/db';
import { Article } from '@/db/models/Article';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('s')?.toLowerCase() || '';

  const db = await connect();

  try {
    
    const articles = await Article.find({}); 

    
    const results = articles.filter(article =>
      article.articleTitle.toLowerCase().includes(searchQuery) // Use the correct field name
    );

    
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}
