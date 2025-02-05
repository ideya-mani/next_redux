// src/app/api/users/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mangodb';

// GET /api/users - Fetch all users from the database
export async function GET() {
  try {
    const db = await connectToDatabase();
    const users = await db.collection('users').find().toArray();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// POST /api/users - Create a new user in the database
export async function POST(request: Request) {
  try {
    const { name, email }: { name: string; email: string } = await request.json();
    const db = await connectToDatabase();
    const newUser = { name, email };
    
    const result = await db.collection('users').insertOne(newUser);
    return NextResponse.json({ _id: result.insertedId, ...newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}