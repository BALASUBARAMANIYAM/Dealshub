# DealsHub – Smart Deal Aggregator

DealsHub is an intelligent deal aggregation platform that automatically identifies and notifies users of personalized shopping deals from major e-commerce sites like Amazon, streamlining the savings process and enhancing user convenience.

## Key Features

- 🔍 **Smart Deal Aggregation**: Automatically collects deals from major e-commerce platforms
- 🔔 **Personalized Notifications**: Alerts users about deals matching their preferences
- 🛒 **Multi-platform Support**: Integrates with Amazon and other major retailers
- 📊 **Deal Comparison**: Helps users find the best offers across platforms
- 📱 **Responsive Design**: Works seamlessly across devices

## Technologies Used

**Frontend**:
- ReactJS
- HTML5, CSS3
- JavaScript (ES6+)
- Axios for API calls
- React Router


**Backend**:
- Spring Boot
- MySQL Database

**APIs & Services**:
- RapidAPI for e-commerce integrations
- Custom deal aggregation algorithms

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Java JDK (v11 or higher)
- MySQL (v8.0 or higher)
- npm (v8 or higher) or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dealshub.git
   ```
2. Navigate to the project directory:
   ```bash
   cd dealshub
   ```
3. Install frontend dependencies:
   ```bash
   npm install
   ```
4. Set up backend:
   - Configure MySQL database
   - Update `application.properties` with your credentials
   - Run Spring Boot application

## Project Structure

```
dealshub/
├── frontend/            # React application
│   ├── public/          # Static files
│   ├── src/             # React source code
│   │   ├── assets/      # Images, fonts, etc.
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── store/       # State management
│   │   ├── styles/      # Global styles
│   │   ├── utils/       # Utility functions
│   │   ├── App.js       # Main app component
│   │   └── index.js     # App entry point
│   └── package.json
├── backend/             # Spring Boot application
│   ├── src/             # Java source code
│   └── pom.xml
├── database/            # MySQL schemas and scripts
├── docs/                # Project documentation
└── README.md
```

## Available Scripts (Frontend)

In the frontend directory, you can run:

```bash
npm start
```
Runs the app in development mode. Open http://localhost:3000 to view it in your browser.

```bash
npm test
```
Launches the test runner in interactive watch mode.

```bash
npm run build
```
Builds the app for production to the build folder.

```bash
npm run eject
```
**Note:** this is a one-way operation. Ejects from Create React App to customize configuration.

## Environment Variables

**Frontend (.env):**
```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
REACT_APP_RAPIDAPI_KEY=your_rapidapi_key
```

**Backend (application.properties):**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/dealshub
spring.datasource.username=db_username
spring.datasource.password=db_password
```

## Deployment

**Frontend:**
```bash
npm run build
```
Deploy the build folder to your preferred hosting (Netlify, Vercel, etc.)

**Backend:**
Package as JAR file:
```bash
mvn clean package
```
Deploy to your preferred cloud service (AWS, Heroku, etc.)

## API Documentation

The backend exposes the following main endpoints:

- `GET /api/deals` – Get all deals
- `POST /api/deals/search` – Search deals with filters
- `GET /api/users/preferences` – Get user preferences
- `PUT /api/users/preferences` – Update user preferences
- `GET /api/notifications` – Get user notifications

## Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

