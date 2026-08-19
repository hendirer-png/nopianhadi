# Folder Gambar Website Portfolio

Folder ini berisi semua aset gambar yang digunakan di website portfolio.

## Struktur File

### Icon & Background 3D
- `3d-bg.png` - Background 3D utama
- `3d-icon-1.png` sampai `3d-icon-4.png` - Icon 3D untuk dekorasi

### Foto Profil
- `3xOEBCA4HlTD4SssKE2vnFVUFs.png` - Foto profil Nopian Hadi

### Screenshot Project
File dengan nama panjang (hash) adalah screenshot dari berbagai project:
- `phH2lvVac9vMnqWN0PytZ3vNTwQ.png` - Weddfin
- `ugAAzzayCe8SPWIh0Mi9iQ5Kec.png` - StartupDesaa
- `gKnOksbAO56Pg2v4fTAz0jtI7E4.png` - Amigdala Foundation
- `f4FuSNy2wJ3AzgJ2wNXvKVjHK9I.png` - Hadior
- `KzNqL3SPyZHJHUJ8TM1vyUDK50.png` - Perumahan Sari Dona
- `Oaa6Roge4dFd1t5ZjWu3VddswR0.png` - Moza Group
- Dan variasi lainnya dengan suffix (1), (2), dll.

### Artikel
- `iMzdMdvjo77PxXAxhwNAsAGCl4.png` - Artikel AI Design
- `nIQneru9TbQ416QzDOabzJ6dlc.png` - Artikel Figma
- `eTik75UjQ69IELNRmQZQydk4LZk.png` - Artikel Career

### Lainnya
- `qrcode_lapor_goid.png` - QR Code

## Cara Menggunakan

Dalam komponen React, gunakan path relatif dari folder public:

```tsx
<img src="/images/nama-file.png" alt="Deskripsi" />
```

Contoh:
```tsx
<img src="/images/3d-bg.png" alt="3D Background" />
<img src="/images/3xOEBCA4HlTD4SssKE2vnFVUFs.png" alt="Nopian Hadi" />
```

## Tips

1. **Optimasi Gambar**: Pastikan gambar sudah dioptimasi sebelum diupload
2. **Format**: Gunakan PNG untuk gambar dengan transparansi, JPG untuk foto
3. **Naming**: Gunakan nama yang deskriptif untuk file baru
4. **Size**: Usahakan ukuran file tidak terlalu besar (< 500KB untuk web)

## Total File

Saat ini ada 46 file gambar di folder ini.
