
````markdown

---

## 📁 Repository Structure

```bash
├── Logging-Middleware/            # Reusable logging package
│   └── log.js
├── Backend-Test-Submission/       # Express backend for URL shortening
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── index.js
│   └── .env
├── Frontend-Test-Submission/      # React frontend using Vite + MUI
│   ├── src/
│   ├── public/
│   └── .env
````

---

## 🚀 Features

### 🔐 Logging Middleware

* Sends logs to the evaluation test server
* Categorized by `stack`, `level`, `package`, and `message`
* Reusable from both frontend and backend
* Integrated with all major code sections

### 🔗 URL Shortener API

* Auto-generates or accepts custom shortcodes
* Default validity of 30 minutes (configurable)
* Redirects using shortcode
* Tracks total clicks, referrer, location, and timestamps

### 📊 Analytics Endpoint

* Fetch usage statistics of a shortened URL
* Click log includes timestamp, referrer, and geographic info

### 🖥️ React Frontend

* Built with **Vite**
* Uses **Material UI** for styling
* Supports shortening up to 5 URLs at once
* Displays generated short URLs with expiry
* Shows click statistics in a structured layout

---

## 🧪 Test Server Integration

### ✅ Registration & Auth

* Backend registers once using `clientID`, `clientSecret`, and access code
* Uses `access_token` for protected log API

### 📝 Logging API

All logs are sent via:

```
POST http://20.244.56.144/evaluation-service/logs
```

Sample:

```json
{
  "stack": "backend",
  "level": "error",
  "package": "handler",
  "message": "Shortcode collision occurred"
}
```

---

## 🧪 How to Test the Application

1. **Start Backend**

   ```bash
   cd Backend-Test-Submission
   npm install
   node index.js
   ```

2. **Start Frontend**

   ```bash
   cd Frontend-Test-Submission
   npm install
   npm run dev
   ```

3. **Visit Frontend**

   ```
   http://localhost:5173
   ```

4. **Create Short URLs & View Stats**

---

## 🌐 Tech Stack

| Layer     | Tech                               |
| --------- | ---------------------------------- |
| Frontend  | React, Vite, Material UI           |
| Backend   | Node.js, Express, MongoDB          |
| Logging   | Custom Middleware (reusable)       |
| Dev Tools | Postman|

---

## 📝 Notes

* `.env` files are excluded for security. Provide:

  * Backend: `CLIENT_ID`, `CLIENT_SECRET`, `ACCESS_CODE`, `TOKEN`
  * Frontend: `VITE_LOG_TOKEN`
* Geo data is fetched using fallback API if not provided by headers
* All logging uses the logging middleware only (no `console.log`)

---

