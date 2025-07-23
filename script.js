const palettes = {
  tech: {
    name: "Modern Tech",
    colors: ["#0f172a", "#1e293b", "#3b82f6", "#38bdf8", "#94a3b8"]
  },
  luxury: {
    name: "Luxury Gold",
    colors: ["#1c1c1c", "#3c3c3c", "#d4af37", "#ffffff", "#8b8b8b"]
  },
  eco: {
    name: "Eco Nature",
    colors: ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#519872"]
  },
  kids: {
    name: "Kids Fun",
    colors: ["#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff"]
  },
  minimalist: {
    name: "Minimal White",
    colors: ["#ffffff", "#f0f0f0", "#d1d1d1", "#a3a3a3", "#000000"]
  },
  vintage: {
    name: "Vintage Classic",
    colors: ["#4b3832", "#854442", "#fff4e6", "#d9b382", "#a1887f"]
  },
  pastel: {
    name: "Soft Pastels",
    colors: ["#f8edeb", "#fcd5ce", "#f9dcc4", "#fec89a", "#cdb4db"]
  },
  futuristic: {
    name: "Futuristic Neon",
    colors: ["#0f0f0f", "#00f5d4", "#9b5de5", "#00bbf9", "#fee440"]
  },
  dark: {
    name: "Dark Mode Pro",
    colors: ["#121212", "#1e1e1e", "#2c2c2c", "#3d3d3d", "#5c5c5c"]
  }
};

document.getElementById("generateBtn").addEventListener("click", () => {
  const description = document
    .getElementById("siteDescription")
    .value.toLowerCase();

  const keywords = Object.keys(palettes);
  const foundKey = keywords.find((key) => description.includes(key));

  const resultDiv = document.getElementById("result");
  const preview = document.getElementById("preview");

  resultDiv.innerHTML = "";
  preview.style.display = "none";

  if (foundKey) {
    const theme = palettes[foundKey];
    const paletteContainer = document.createElement("div");
    paletteContainer.className = "palette-container";

    resultDiv.innerHTML = `<h2>${theme.name}</h2>`;

    theme.colors.forEach((color) => {
      const colorDiv = document.createElement("div");
      colorDiv.className = "color-block";
      colorDiv.style.backgroundColor = color;

      const label = document.createElement("span");
      label.textContent = color;

      colorDiv.appendChild(label);
      paletteContainer.appendChild(colorDiv);
    });

    resultDiv.appendChild(paletteContainer);

    // Show Preview
    document.documentElement.style.setProperty("--color1", theme.colors[0]);
    document.documentElement.style.setProperty("--color2", theme.colors[1]);
    document.documentElement.style.setProperty("--color3", theme.colors[2]);
    document.documentElement.style.setProperty("--color4", theme.colors[3]);
    document.documentElement.style.setProperty("--color5", theme.colors[4]);

    preview.style.display = "block";
  } else {
    resultDiv.innerHTML = `
      <h2>No matching palette found.</h2>
      <p style="color: #00ffff; text-shadow: 0 0 8px #00ffff;">
        Try keywords like <strong>'tech'</strong>, <strong>'eco'</strong>, <strong>'kids'</strong>, <strong>'luxury'</strong>, etc.
      </p>
    `;
  }
});

