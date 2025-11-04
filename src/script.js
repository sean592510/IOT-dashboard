(async () => {
  try {
    const res = await fetch(
      "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
    );
    if (!res.ok) throw new Error("Background fetch failed");
    const data = await res.json();
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `By: ${data.user.name}`;
  } catch (err) {
    console.error(err);
    document.body.style.backgroundImage = `url('https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080')`;
    document.getElementById("author").textContent = "By: Dodi Achmad";
  }

  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin");
    if (!res.ok) throw new Error("CoinGecko failed");
    const data = await res.json();

    document.getElementById("crypto-top").innerHTML = `
      <img src="${data.image.small}" alt="Dogecoin" />
      <span>${data.name}</span>
    `;

    document.getElementById("crypto").innerHTML = `
      <p>Current: $${data.market_data.current_price.usd}</p>
      <p>24h High: $${data.market_data.high_24h.usd}</p>
      <p>24h Low: $${data.market_data.low_24h.usd}</p>
    `;
  } catch (err) {
    console.error(err);
    document.getElementById("crypto").innerHTML = "<p>Crypto data unavailable</p>";
  }

  const pulpFictionQuotes = [
    { text: "Say 'what' again. I dare you. I double-dare you.", character: "Jules Winnfield" },
    { text: "I'm gonna get medieval on your ass.", character: "Marsellus Wallace" },
    { text: "Zed's dead, baby. Zed's dead.", character: "Butch Coolidge" },
    { text: "The path of the righteous man is beset on all sides...", character: "Jules Winnfield" },
    { text: "Hamburgers! The cornerstone of any nutritious breakfast.", character: "Jules Winnfield" },
    { text: "That's when you know you've found somebody special.", character: "Vincent Vega" },
    { text: "I do believe Marsellus Wallace, my husband, your boss, told you to take me out.", character: "Mia Wallace" },
    { text: "You hear me talkin', hillbilly boy?", character: "Jules Winnfield" },
    { text: "Well, let's not start sucking each other's dicks quite yet.", character: "The Wolf" },
    { text: "I'm a mushroom-cloud-layin' motherfucker, motherfucker!", character: "Jules Winnfield" }
  ];

  function updateQuote() {
    const q = pulpFictionQuotes[Math.floor(Math.random() * pulpFictionQuotes.length)];
    document.getElementById("quote").innerHTML = `
      <div class="text">"${q.text}"</div>
      <div class="source">— ${q.character}</div>
    `;
  }
  updateQuote();
  setInterval(updateQuote, 20000);

  function updateClock() {
    const now = new Date();
    document.getElementById("time").textContent = now.toLocaleTimeString("en-us", {
      timeStyle: "short"
    });
  }
  updateClock();
  setInterval(updateClock, 1000);

  navigator.geolocation.getCurrentPosition(
    async pos => {
      try {
        const { latitude, longitude } = pos.coords;
        const res = await fetch(
          `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial`
        );
        if (!res.ok) throw new Error("Weather API failed");
        const data = await res.json();

        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById("weather").innerHTML = `
          <img src="${iconUrl}" alt="Weather icon" />
          <p class="weather-temp">${Math.round(data.main.temp)} degrees</p>
          <p class="weather-city">${data.name}</p>
        `;
      } catch (err) {
        console.error(err);
        document.getElementById("weather").innerHTML = "<p>Weather unavailable</p>";
      }
    },
    () => {
      document.getElementById("weather").innerHTML = "<p>Location denied</p>";
    }
  );
})();
