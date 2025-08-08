# Drag & Drop Projesi - Trello Board + Resim Yöneticisi

Bu proje Netology'nin "6. Working with files, DnD" ödevini tamamlamak için geliştirildi. İki farklı uygulama içeriyor: bir Trello benzeri kanban board ve modern bir resim yükleyici.

## 🎯 Ne Yapıyor?

### Trello Board
- 3 sütunlu kanban board (TODO, IN PROGRESS, DONE)
- Kart ekleme/silme
- Sürükle-bırak ile kart taşıma
- LocalStorage'da durum saklama
- Sayfa yenilendikten sonra durumu koruma

### Resim Yöneticisi  
- Sürükle-bırak ile resim yükleme
- Tıklayarak dosya seçme
- Çoklu dosya seçimi
- Resim önizleme
- Yüklenen resimleri silme

## 🚀 Nasıl Çalıştırılır?

```bash
# Bağımlılıkları yükle
yarn

# Geliştirme sunucusunu başlat
yarn start
```

Sonra tarayıcında şu adreslere git:
- http://localhost:3000/ → Trello Board
- http://localhost:3000/uploader.html → Resim Yöneticisi

## 📦 Production Build

```bash
yarn build
```

## 🔗 Canlı Demo

- [Trello Board](https://TatiMarksman.github.io/drag-drop-project/)
- [Resim Yöneticisi](https://TatiMarksman.github.io/drag-drop-project/uploader.html)

## 🛠 Kullanılan Teknolojiler

- JavaScript (ES6+)
- HTML5
- CSS3  
- Webpack
- LocalStorage API
- Drag & Drop API