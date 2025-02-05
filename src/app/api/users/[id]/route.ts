// src/app/api/users/[id]/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mangodb';
import { ObjectId } from 'mongodb';

// GET /api/users/[id] - Fetch a single user from the database
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
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

// PUT /api/users/[id] - Update a user in the database
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;  // Extract user ID from URL params
    const { name, email }: { name: string; email: string } = await request.json();

    const db = await connectToDatabase();
    const updatedUser = { name, email };

    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(id) }, // Use ObjectId for querying MongoDB
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

// DELETE /api/users/[id] - Delete a user from the database
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;  // Extract user ID from URL params

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