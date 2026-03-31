export default async function handler(req, res) {
  try {
    const body = await req.json();
    const message = body.message;

    const apiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn’t generate a response, Player.";

    res.status(200).json({ reply: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Server error, Player." });
  }
}
