
# QuickForms - Form Recreation and Web Application
QuickForms is a web-based form builder application designed to help users create and manage custom forms effortlessly. Inspired by Google Forms, QuickForms offers a seamless user experience for creating multi-page forms with various input types, file uploads, and conditional navigation. The application ensures secure data collection and storage of response to the mongodb database.
## Features
- Multi-Page Forms: Create forms with multiple pages, each containing various types of input fields and file upload options.
- Conditional Navigation: Ensure users complete all required fields before proceeding to the next page. Automatically navigate to the first page if there's any URL mismatch.
- File Uploads: Allow users to upload files as part of their form responses.
- User Authentication: Secure user authentication with Google OAuth to uniquely identify users and manage sessions.
- Data Persistence: Store form responses securely in a MongoDB database, ensuring data is saved and can be accessed across sessions and devices.
- Responsive Design: Accessible on various devices, ensuring a consistent experience across desktops, tablets, and smartphones.
  
# Application Development

## Frontend
- **Technology**: React
- **Description**: Developed a web application to host the form with a focus on UI/UX design.

## Backend
- **Technology**: Node.js
- **Description**: Implemented a server to handle form submissions.
- **Database**: MongoDB
- **Description**: Stored form responses securely.

## Development Environment
- **IDE**: Visual Studio Code (VSCode)

## Deployment

### Version Control
- **Tool**: Git
- **Repository**: [GitHub Repository](https://github.com/bshenoy/QuickForms) 

### Cloud Deployment
- **Platform**: AWS 
- **URL**: [Deployed Application](https://formio.in) 

## Database Management
- **Database**: MongoDB
- **Description**: Securely collect and store form responses.

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- Git
- Cloud Platform Account (e.g., AWS/GCP)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/yourrepository.git
    ```

2. Install dependencies:
    ```bash
    cd yourrepository
    npm install
    ```

3. Set up MongoDB:
    - Ensure MongoDB is running on your local machine or a cloud instance.
    - Update the MongoDB connection string in your environment variables.

4. Start the application:
    ```bash
    npm start
    ```

## Running the Application Locally

1. Ensure MongoDB is running.
2. Run the server:
    ```bash
    npm run server
    ```
3. Run the React application:
    ```bash
    npm start
    ```

## Design Choices

- **Frontend**: Used React for its component-based architecture and efficient rendering.
- **Backend**: Chose Node.js for its non-blocking, event-driven architecture, making it ideal for handling asynchronous operations.
- **Database**: MongoDB was selected for its flexibility in handling JSON-like documents.

## Additional Features

- Responsive design for optimal user experience on various devices.
- Real-time form validation and feedback.
- Deployed using Docker for containerization and easy scalability.

## Contact

For any inquiries or issues, please contact:
- **Name**: Bhagyashri Shenoy
- **Email**: bshenoy12@gmail.com
