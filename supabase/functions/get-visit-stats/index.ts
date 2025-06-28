import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get total visits from site_stats
    const { data: siteStatsData, error: siteStatsError } = await supabaseClient
      .from('site_stats')
      .select('total_visits')
      .eq('id', 1)
      .single();

    if (siteStatsError && siteStatsError.code !== 'PGRST116') {
      console.error('Error fetching site stats:', siteStatsError);
      throw siteStatsError;
    }

    const totalVisits = siteStatsData?.total_visits || 0;

    // Get today's visits
    const today = new Date().toDateString();
    const { data: todayData, error: todayError } = await supabaseClient
      .from('daily_visits')
      .select('visit_count')
      .eq('visit_date', today)
      .single();

    if (todayError && todayError.code !== 'PGRST116') {
      console.error('Error fetching today visits:', todayError);
      throw todayError;
    }

    const todayVisits = todayData?.visit_count || 0;

    // Calculate served patients (75% of total visits as a reasonable estimate)
    const servedPatients = Math.floor(totalVisits * 0.75);

    return new Response(
      JSON.stringify({
        totalVisits,
        todayVisits,
        servedPatients
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in get-visit-stats function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});