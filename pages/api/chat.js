export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, system } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages array required" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 600,
        system: system || "",
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data });
    }

    const block = (data.content || []).find((b) => b.type === "text");
    if (!block?.text) {
      return res.status(500).json({ error: "No text in response" });
    }

    const raw = block.text.trim();

    // Extract %%XI_UPDATE%%{...}%%END%% block if present
    let text = raw;
    let xiUpdate = null;

    const xiMatch = raw.match(/%%XI_UPDATE%%([\s\S]*?)%%END%%/);
    if (xiMatch) {
      try {
        xiUpdate = JSON.parse(xiMatch[1].trim());
      } catch (e) {
        // parsing failed, ignore
      }
      text = raw.replace(/%%XI_UPDATE%%[\s\S]*?%%END%%/, "").trim();
    }

    return res.status(200).json({ text, xiUpdate });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
