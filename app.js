const apiKey = "e796365221f029c5ac52744c4678d61c";

// Hava durumu bilgilerini alma fonksiyonu
function getWeather() {
  const city = document.getElementById('sehir').value.trim();

  if (!city) {
    alert("Lütfen bir şehir adı giriniz.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        // Başarıyla veri alındığında bilgileri güncelle
        document.getElementById('city-name').innerText = data.name;
        document.getElementById('temperature').innerText = `Sıcaklık: ${data.main.temp}°C`;
        document.getElementById('description').innerText = `Durum: ${data.weather[0].description}`;

        // Hava durumu ikonunu ayarla (HTTPS kullan)
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById('weather-icon').src = iconUrl;
        document.getElementById('weather-icon').alt = data.weather[0].description;

        // Hava durumu bilgisini görünür yap
        document.getElementById('weather-info').style.display = 'block';
      } else {
        alert("Şehir bulunamadı! Lütfen doğru yazdığınızdan emin olun.");
        document.getElementById('weather-info').style.display = 'none';
      }
    })
    .catch(error => {
      console.error('Hata:', error);
      alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
      document.getElementById('weather-info').style.display = 'none';
    });
}

// Butona tıklama işlemi
document.getElementById("buton").addEventListener("click", getWeather);


