# Fullstack Web Dev + AI Workflow 🚀

> **Belajar Coding Lebih Cepat & Pinter dengan AI**

Project ini adalah **Panduan Interaktif** buat kamu yang mau belajar jadi Web Developer di era AI (2026). Bukan cuma belajar syntax, tapi belajar *workflow* professional pake tools AI kaya ChatGPT, Claude, dan Cursor.

🔗 **[LIVE DEMO: Cobain Websitenya di Sini](https://workflow-visualization.vercel.app/)**

---

## 🌟 Fitur Utama

- **Visual Workflow**: Roadmap 8 fase dari nol sampe deploy, jelas step-by-step-nya.
- **Interactive Checklist**: Track progress belajar lu, centang yang udah beres.
- **AI Tutor Integration**: Chatbot pinter yang siap jelasin konsep coding yang lu gak ngerti (Powered by Groq/Llama 3).
- **No Login Required**: Buka langsung jalan, progress disimpen di browser lho.
- **Responsive Design**: Belajar dari HP atau Laptop tetep enak.

## 🛠️ Tech Stack

Dibuat sesimpel mungkin biar gampang dipelajari pemula:

- **Frontend**: HTML5, CSS3 (Modern Variables & Flexbox), Vanilla JavaScript (ES6+).
- **AI Integration**: Groq API (Super fast inference).
- **Deploy**: Vercel (Serverless Functions untuk keamanan API Key).
- **Database**: LocalStorage (Di browser masing-masing).

---

## 🚀 Cara Pakai (Local)

Mau jalanin di laptop sendiri buat diotak-atik? Gampang:

1. **Clone Repo ini**

   ```bash
   git clone https://github.com/Zainul342/fullstack-web-developer-course.git
   ```

2. **Masuk ke Folder**

   ```bash
   cd fullstack-web-developer-course/workflow-visualization
   ```

3. **Buka Website**
   - Klik 2x file `index.html` atau `dashboard.html`.
   - Atau pake Live Server di VS Code (Recommended).

4. **Setup AI (Optional)**
   Kalau mau fitur "Tanya AI" jalan di local:
   - Buat file `.env` (atau edit `config.js` tapi jangan dicommit).
   - Isi API Key dari [Groq Console](https://console.groq.com):

     ```
     GROQ_API_KEY=gsk_....
     ```

---

## 🌐 Cara Deploy (Mau pamer ke temen?)

Gratis tis tis pake **Vercel**:

1. Login ke [Vercel](https://vercel.com).
2. **Add New Project** -> Import GitHub Repo ini.
3. **PENTING**: Di setting **"Root Directory"**, pilih folder `workflow-visualization`.
4. **Environment Variables**:
   Masukin kunci rahasia biar AI-nya jalan:
   - Name: `GROQ_API_KEY`
   - Value: `gsk_...` (API Key Groq lu)
5. **Deploy!** 🚀

---

## 📂 Struktur Folder

Biar gak bingung sama filenya:

```
├── workflow-visualization/
│   ├── api/            # Serverless functions (buat jembatan ke AI)
│   ├── data/           # Isinya data text task & materi belajar
│   ├── docs/           # Dokumentasi tambahan (PRD, Arsitektur)
│   ├── ai-tutor.js     # Otak-nya AI Tutor (Frontend)
│   ├── script.js       # Logic website
│   ├── style.css       # Hiasan/Design system
│   └── index.html      # Halaman utama
```

---

## 👨‍💻 Author

Dibuat dengan 💻 dan ☕ oleh **Zain**.

*Project ini open source, bebas dipake belajar, diubah, atau dijadiin bahan buat ngajar. Don't forget to star the repo! ⭐*
