import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('s')?.toLowerCase() || '';

  
  try {
    
    const articles = await prisma.article.findMany() 

    
    const results = articles.filter(article =>
      article.articleTitle.toLowerCase().includes(searchQuery) // Use the correct field name
    );

    
    return NextResponse.json({ results });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ msg: `There was an error: ${error.message}` });
    } else {
      return NextResponse.json({ msg: 'An unknown error occurred' });
    }
  }
  
}
