import { supabase } from "@/lib/supabse";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('retreats')
      .select('id, title, date, location, description, schedule, image_url')  // Only needed columns (exclude created_at if not used in UI)
      .order('created_at', { ascending: false })
      .limit(20);  // Adjust based on your UI needs (e.g., pagination)

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(data || []), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}