import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface RequestBody {
  date: string;
  userAgent?: string;
}

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

    const { date, userAgent }: RequestBody = await req.json();

    if (!date) {
      return new Response(
        JSON.stringify({ error: 'Date is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Log the visit
    const { error: logError } = await supabaseClient
      .from('visit_logs')
      .insert({
        visit_date: date,
        user_agent: userAgent
      });

    if (logError) {
      console.error('Error logging visit:', logError);
    }

    // Update or insert daily visit count
    const { data: existingDaily, error: dailySelectError } = await supabaseClient
      .from('daily_visits')
      .select('visit_count')
      .eq('visit_date', date)
      .single();

    let todayVisits = 1;

    if (dailySelectError && dailySelectError.code !== 'PGRST116') {
      console.error('Error checking daily visits:', dailySelectError);
    } else if (existingDaily) {
      // Update existing record
      todayVisits = existingDaily.visit_count + 1;
      const { error: updateError } = await supabaseClient
        .from('daily_visits')
        .update({ 
          visit_count: todayVisits,
          updated_at: new Date().toISOString()
        })
        .eq('visit_date', date);

      if (updateError) {
        console.error('Error updating daily visits:', updateError);
        throw updateError;
      }
    } else {
      // Insert new record
      const { error: insertError } = await supabaseClient
        .from('daily_visits')
        .insert({
          visit_date: date,
          visit_count: 1
        });

      if (insertError) {
        console.error('Error inserting daily visits:', insertError);
        throw insertError;
      }
    }

    // Update total visits in site_stats
    const { data: siteStats, error: siteStatsSelectError } = await supabaseClient
      .from('site_stats')
      .select('total_visits')
      .eq('id', 1)
      .single();

    let totalVisits = 1;

    if (siteStatsSelectError && siteStatsSelectError.code !== 'PGRST116') {
      console.error('Error checking site stats:', siteStatsSelectError);
    } else if (siteStats) {
      // Update existing record
      totalVisits = siteStats.total_visits + 1;
      const { error: updateStatsError } = await supabaseClient
        .from('site_stats')
        .update({ 
          total_visits: totalVisits,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1);

      if (updateStatsError) {
        console.error('Error updating site stats:', updateStatsError);
        throw updateStatsError;
      }
    } else {
      // Insert new record
      const { error: insertStatsError } = await supabaseClient
        .from('site_stats')
        .insert({
          id: 1,
          total_visits: 1
        });

      if (insertStatsError) {
        console.error('Error inserting site stats:', insertStatsError);
        throw insertStatsError;
      }
    }

    // Calculate served patients (75% of total visits)
    const servedPatients = Math.floor(totalVisits * 0.75);

    return new Response(
      JSON.stringify({
        success: true,
        totalVisits,
        todayVisits,
        servedPatients
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in increment-visit function:', error);
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