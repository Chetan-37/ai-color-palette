
const hfToken = "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"; // 🔁 Replace with your Hugging Face token

document.getElementById("color-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const siteType = document.getElementById("site-type").value;
  const mood = document.getElementById("mood").value;
  const audience = document.getElementById("audience").value;
  const style = document.getElementById("style").value;

  const prompt = `Generate a 5-color HEX code palette for a ${siteType} website.
Mood: ${mood}
Audience: ${audience}
Style: ${style}
Return ONLY this format:
Primary: #HEX
Secondary: #HEX
Background: #HEX
Text: #HEX
Accent: #HEX`;

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hfToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    const raw = await response.text();
    console.log("🧠 Raw HF response:\n", raw);

    // Extract color lines
    const lines = raw.split('\n').filter(line => line.includes(':') && line.includes('#'));
    const colors = lines.map(line => {
      const [name, hex] = line.split(':');
      return { name: name.trim(), hex: hex.trim() };
    });

    if (colors.length === 0) {
      alert("❌ No valid colors returned. See console.");
      return;
    }

    displayPalette(colors);
  } catch (error) {
    console.error("❌ Hugging Face Error:", error);
    alert("Error generating palette. Check console.");
  }
});

function displayPalette(colors) {
  const container = document.getElementById("palette-container");
  container.innerHTML = "";
  colors.forEach(c => {
    const box = document.createElement("div");
    box.className = "palette";
    box.style.backgroundColor = c.hex;
    box.innerHTML = `<div>${c.name}<br>${c.hex}</div>`;
    container.appendChild(box);
  });
}

