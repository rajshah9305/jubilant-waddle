# Cerebras Studio

Cerebras Studio is a modern, full-stack AI creative platform that empowers users to interact with advanced AI models, manage projects, and gain insights through analytics—all in a beautiful, professional interface.

## Features

- **Four Specialized AI Studios:**
  - **Text Generation:** Create compelling content, articles, and marketing copy.
  - **Code Generation:** Generate, debug, and optimize code with intelligent suggestions.
  - **Document AI:** Analyze, summarize, and extract insights from documents and PDFs.
  - **Creative Writing:** Craft stories, poetry, and creative content with AI-powered inspiration.
- **Responsive Dashboard:** Animated 3D background and interactive studio cards.
- **Chat-Style Interface:** For each studio, with streaming AI responses and typing indicators.
- **Project Management:** Save, load, and organize your creative projects.
- **API Key Management:** Securely store and validate API keys.
- **Real-Time Metrics:** Track tokens used and processing speed.
- **File Upload:** Drag-and-drop file upload within studios.
- **Notifications:** Real-time system and usage alerts.
- **Dark/Light Mode:** Accessible, themeable UI.
- **Analytics Dashboard:** Visualize usage, performance, and trends.

## Architecture

- **Frontend:** React (Vite), TypeScript, Tailwind CSS, Framer Motion, Three.js
- **Backend:** Express.js (Node), Drizzle ORM, PostgreSQL (production) / SQLite (development)
- **Database Models:** User, Project, ChatMessage
- **API:** RESTful endpoints for AI generation, project management, analytics, and health checks
- **Authentication:** JWT-based (planned)
- **Deployment:** Vite for frontend, Node/Express for backend, static file serving, environment variable support

## Technologies Used

- **React** & **Vite** for fast, modern UI
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Three.js** for 3D graphics
- **Drizzle ORM** for database access
- **PostgreSQL** (production) / **SQLite** (development)
- **Lucide React** for icons
- **Recharts** for data visualization

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rajshah9305/jubilant-waddle.git
   cd jubilant-waddle
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Open your browser:**
   - Client: [http://localhost:5173](http://localhost:5173)
   - Server/API: [http://localhost:3000](http://localhost:3000)

## Usage

- **Create and manage projects** in the Projects tab
- **Interact with AI models** in the Studio tab (Text, Code, Document, Creative)
- **View analytics and insights** in the Analytics tab
- **Configure your API key** in Settings for full AI access

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit (`git commit -m 'Add some feature'`)
5. Push (`git push origin feature/your-feature-name`)
6. Open a pull request

## Credits

- **Design & Development:** [Raj Shah](https://github.com/rajshah9305)
- **Icons:** [Lucide React](https://lucide.dev/)
- **3D Graphics:** [Three.js](https://threejs.org/)
- **UI Components:** Custom & open source

## License

MIT
