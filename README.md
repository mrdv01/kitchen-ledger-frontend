# Kitchen Ledger Project

## Live Demo
You can preview the live application at: [Kitchen Ledger Live Demo](https://kitchen-ledger-frontend.vercel.app/)

## Overview
The Kitchen Ledger project is a web application designed to help groups of people living together track their shared expenses and transactions. It allows users to record purchases, split costs, and maintain an accurate ledger of shared financial activities, ensuring transparency and accountability among group members.

## Features
- **Transaction Records:** Easily add, edit, and delete transactions.
- **Expense Splitting:** Automatically calculate and split expenses among group members.
- **User Management:** Add and manage members of the group.
- **Report Generation:** Generate detailed reports of expenses over specific periods.
- **Responsive Design:** Accessible on both desktop and mobile devices.

## Technologies Used
- **Frontend:** React, HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **State Management:** Redux Toolkit
- **Deployment:** Vercel (Frontend), Render (Backend)

## Installation

### Prerequisites
- Node.js installed on your machine
- MongoDB instance running (locally or on a cloud service like MongoDB Atlas)

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/kitchen-ledger.git
    ```
2. Navigate to the project directory:
    ```bash
    cd kitchen-ledger
    ```
3. Install the dependencies for the backend:
    ```bash
    cd backend
    npm install
    ```
4. Set up environment variables for the backend by creating a `.env` file in the `backend` directory and adding:
    ```bash
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```
5. Start the backend server:
    ```bash
    npm start
    ```
6. Install the dependencies for the frontend:
    ```bash
    cd ../frontend
    npm install
    ```
7. Start the frontend server:
    ```bash
    npm start
    ```

## Usage
- Visit `http://localhost:3000` in your browser to access the application.
- Create an account and log in to start recording transactions.
- Add members to your group and begin tracking shared expenses.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to follow the coding standards and include tests for any new functionality.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements
- Inspiration for this project came from the need to simplify financial management in shared living situations.
- Thanks to all contributors and the open-source community for their valuable resources and tools.

---

Made with :heart: by Deepak Verma
