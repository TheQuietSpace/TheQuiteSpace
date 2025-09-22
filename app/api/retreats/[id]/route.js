import { supabase } from "@/lib/supabse";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from('retreats')
      .select('id, title, date, location, description, schedule, included, image_url, gallery_images, teachers, faqs')
      .eq('id', id)
      .single();

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