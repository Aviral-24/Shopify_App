# Shopify Custom Announcement Banner App

A full-stack custom Shopify application that allows merchants to dynamically update an announcement banner on their storefront directly from a custom React dashboard. 

##  Features
* **Custom Admin Dashboard:** Built with React and Shopify Polaris for a native look and feel.
* **Real-time Updates:** Updates the storefront banner instantly using Shopify GraphQL Admin API and Metafields.
* **Persistent Storage:** Saves all announcement history and timestamps in a MongoDB database.
* **Theme App Extension:** Seamlessly injects the banner into any Shopify 2.0 theme using Liquid, without editing theme code.

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, Shopify Polaris
* **Backend:** Node.js, Express.js, MongoDB (Mongoose)
* **Shopify integration:** Shopify CLI, GraphQL API, Theme App Extensions (Liquid)
* **Deployment:** Vercel (Frontend), Render (Backend)

## 🏗️ Architecture & Data Flow
1. **Merchant Input:** Merchant enters a new announcement in the React dashboard.
2. **Backend Processing:** The React app sends a POST request to the Node.js backend.
3. **Database Logging:** The backend saves the announcement text and current timestamp in MongoDB.
4. **Shopify API Call:** The backend simultaneously makes a GraphQL `metafieldsSet` mutation to the Shopify Store.
5. **Storefront Display:** The Theme App Extension (Liquid) reads the updated `shop.metafields` data and displays it on the live website.

## 💻 Local Setup Instructions

**Prerequisites:** Node.js, MongoDB URI, and a Shopify Partner Account.

**1. Clone the repository**
git clone <https://github.com/Aviral-24/Shopify_App>
cd <Shopify-App>

**2. Backend Setup**
cd backend
npm install
* Create a `.env` file and add the following:
  * MONGO_URI=your_mongodb_connection_string
  * SHOPIFY_ACCESS_TOKEN=your_offline_access_token
  * SHOP=your_store_name.myshopify.com
npm run dev

**3. Frontend Setup**
cd frontend
npm install
* Create a `.env` file and add:
  * VITE_API_URL=http://localhost:5000
npm run dev

**4. Shopify Extension Setup**
cd announcement-admin-app
npm install
npx @shopify/cli app dev
* Enable the "Announcement Banner" in your Shopify Theme Editor (App Embeds).

## 🌐 Live Links
* **Frontend (Vercel):** <shopify-app-nine-liard.vercel.app>
* **Backend (Render):** <https://shopify-app-6ih4.onrender.com>
* **Demo Video:** <1. https://drive.google.com/file/d/11wJ72_spoK2hMoWmoIXvuX7pizjnI-8L/view?usp=drive_link
2. https://drive.google.com/file/d/18pkUWLGqm6MRPpsGx4rzdMwslCHd-GLa/view?usp=drive_link
3. https://drive.google.com/file/d/1JTWfmcZz_p2QA5u9y_gG9hhunkvDwrxg/view?usp=drive_link>
