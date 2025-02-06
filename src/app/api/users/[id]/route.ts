// src/app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mangodb';
import { ObjectId } from 'mongodb';

// GET /api/users/[id] - Fetch a single user
export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop(); // Extract ID from URL
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

// PUT /api/users/[id] - Update a user
export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop(); // Extract ID from URL
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const { name, email }: { name: string; email: string } = await req.json();
    const db = await connectToDatabase();
    const updatedUser = { name, email };

    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedUser }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ _id: id, ...updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE /api/users/[id] - Delete a user
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop(); // Extract ID from URL
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const db = await connectToDatabase();
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}