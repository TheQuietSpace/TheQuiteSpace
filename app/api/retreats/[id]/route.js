import { supabase } from "@/lib/supabse";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    // Fix: Await params before destructuring
    const { id } = await params;

    const { data, error } = await supabase
      .from('retreats')
      .select('id, title, date, location, description, schedule, image_url')
      .eq('id', id)
      .single(); // Use .single() to fetch one record by ID

    if (error || !data) {
      return NextResponse.json(
        { error: error?.message || 'Retreat not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error fetching retreat:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}