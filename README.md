# Fullstack Web Dev + AI Workflow 🚀

Project ini sebenernya simpel: **Panduan belajar jadi Web Developer jaman now yang coding-nya ditemenin AI.**

Bukan tutorial coding biasa yang ngetik manual satu-satu, tapi lebih ke "gimana cara manfaatin AI (kaya ChatGPT/Claude) buat coding lebih cepet & pinter".

## Isinya Apa?

Visualisasi workflow (langkah-langkah) dari 0 sampe jadi website beneran. Ada checklist-nya, jadi ketauan progress belajar lu udah sampe mana.

- **Phase 0-7**: Dari setup tools, coding, sampe deploy.
- **AI Tutor**: Ada chatbot khusus yang ngerti konteks project ini. Bisa ditanya-tanya kalau bingung.

## Cara Jalanin di Laptop (Local)

Gak perlu install macem-macem (nggak butuh Node.js atau npm buat start, cuma HTML/JS biasa kok).

1. **Download/Clone** repo ini.
2. Masuk ke folder `workflow-visualization`.
3. Klik 2x file `index.html` (atau `dashboard.html`) biar kebuka di browser.
4. **Selesai!** Website udah jalan.

### Biar AI-nya Jalan (Optional)

Kalau mau fitur "Tanya AI Tutor" jalan:

1. Dapatkan API Key gratis dari [Groq Console](https://console.groq.com).
2. Di folder `workflow-visualization`, cari file `config.js` (atau buat file `.env` di situ).
3. Masukin API Key lu di situ.

   ```js
   // config.js
   GROQ_API_KEY: 'gsk_ini_api_key_lu...',
   ```

   *Note: Tenang, file config ini udah di-setting biar gak ke-upload ke GitHub kalau lu push.*

## Cara Deploy (Online)

Paling gampang pake **Vercel**.

1. New Project di Vercel -> Import repo ini.
2. **PENTING**: Di bagian "Root Directory", ganti jadi `workflow-visualization`.
3. **Environment Variables**:
   - Key: `GROQ_API_KEY`
   - Value: (API Key Groq lu)
4. Deploy.

Udah gitu doang. Happy coding! ☕
