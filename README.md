
# React Blog Application

A modern blog application built with **React** and **Vite** for the frontend, **Tailwind CSS** for styling, and **TinyMCE** for rich text editing. The app leverages **Appwrite** as a backend-as-a-service (BaaS) for handling authentication, database operations, and file management.

## Features

- User authentication (Sign up, Login, Logout)
- CRUD operations for blog posts
- Rich text editing with TinyMCE
- Responsive UI with Tailwind CSS
- Backend services powered by Appwrite (Database, Authentication, File Storage)

---

## Prerequisites

Before running this application locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or above)
- [Vite](https://vitejs.dev/)
- [Appwrite](https://appwrite.io/) (self-hosted or cloud instance)
- A modern web browser

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/pavansingh888/BlogSphere-project.git
cd BlogSphere-project
```

### 2. Install Dependencies

Install the required Node.js dependencies using npm or yarn:

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### 3. Set Up Appwrite

- Install and set up Appwrite (self-hosted or cloud) if not already done.  
- Create a new Appwrite project and configure the following services:
  - **Authentication**: Enable email-based sign-up/login.
  - **Database**: Create collections for storing blog posts.
  - **Storage**: Enable file storage for managing uploaded assets.
- Generate your Appwrite API credentials and copy the following details:
  - Project ID
  - Endpoint URL
  - API Key (if required)

### 4. Configure Environment Variables

Create a `.env` file in the project root and add the following configuration:

```env
VITE_APPWRITE_PROJECT_ID=<your-appwrite-project-id> 
VITE_APPWRITE_URL=<your-appwrite-url>
VITE_APPWRITE_DATABASE_ID=<your-appwrite-db-id>
VITE_APPWRITE_COLLECTION_ID=<your-appwrite-collection-id>
VITE_APPWRITE_BUCKET_ID=<your-appwrite-bucket-id>
VITE_RTE_APIKEY=<your-RTE-api-key>
```

### 5. Start the Development Server

Run the following command to start the application:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the app for production.
- `npm run preview`: Preview the production build locally.

---

## Technologies Used

- **React**: For building the user interface.
- **Vite**: For fast development and bundling.
- **Tailwind CSS**: For styling and responsiveness.
- **TinyMCE**: For rich text editing functionality.
- **Appwrite**: For backend services (authentication, database, and file storage).

---

## Deployment

To deploy the application, build the production version and host it on any static site hosting service like Vercel, Netlify, or Firebase Hosting.

```bash
npm run build
```

---

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

---

## License

This project is licensed under the [MIT License](LICENSE).
```
