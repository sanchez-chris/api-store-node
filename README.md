# Store with Node.js and Express

A brief description of what the API does.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/sanchez-chris/api-store-node.git

2. **Navigate into the project directory**

   cd api-store-node

4. **Install dependencies**

   npm install

## Usage
1. **Start the server and the database with docker**
2. 
    docker-compose up -d postgres
    The database will start
   
    npm run dev
    The server will start on the port specified in your environment variables or default to 3000.

1. **Make API requests**
   
    You can use tools like Postman or Insomnia to test the endpoints.
    
    There are also docs available with Swagger at localhost:3000/api/v1/docs

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
This project is licensed under the MIT License
