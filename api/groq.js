export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("Missing GROQ_API_KEY");
    return res.status(500).json({ reply: "Server error, Player." });
  }

  try {
    const { message } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ reply: "Missing message, Player." });
    }

    const groqRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content:
                "You are Eclipse AI, a fast, friendly assistant. Call the user 'Player' sometimes. Keep responses helpful and clear."
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await groqRes.json();

    if (!groqRes.ok || data.error) {
      console.error("Groq API error:", data.error || data);
      return res.status(500).json({ reply: "Groq API error, Player." });
    }

    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "I couldn’t generate a response, Player.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ reply: "Server error, Player." });
  }
}
