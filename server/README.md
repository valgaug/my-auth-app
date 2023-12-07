# Back End: Global Voices Technical Assignment

This is the back-end part of the Global Voices Technical Assignment, built with Node.js and GraphQL.

## Getting Started

To set up the back-end environment for the Global Voices Technical Assignment, follow these steps:

### MongoDB Atlas Setup

1. **Create a MongoDB Atlas Account**: Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. **Create a Cluster**: Follow the instructions to create a new cluster. For a basic setup, the free tier should be sufficient.
3. **Configure Network Access**: Ensure your cluster's network access allows connections from your application's IP address.
4. **Create a Database User**: Set up a database user with read and write access to your new cluster.
5. **Get Connection String**: Once your cluster is set up, find the connection string (URI) provided by MongoDB Atlas. You will need this for your application.

### Installation

6. **Install Dependencies**: Run `npm install` in the project directory to install the necessary dependencies.

### Starting the Application

7. **Environment Configuration**: Create a `.env` file in the root of the project following the provided `.env.example` template. Include the MongoDB connection string in this file.
8. **Start the Application**: Run `npm start` to launch the server. 

## Additional Information

For more information on setting up MongoDB Atlas, you can refer to the [MongoDB Atlas documentation](https://docs.atlas.mongodb.com/).
