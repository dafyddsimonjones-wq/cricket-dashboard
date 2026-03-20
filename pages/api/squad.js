export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { team } = req.query;
  if (!team) {
    return res.status(400).json({ error: "team parameter required" });
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/squad?team=eq.${encodeURIComponent(team)}&order=matches_2025.desc,batting_runs.desc`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }
    const players = await response.json();
    return res.status(200).json({ players });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
