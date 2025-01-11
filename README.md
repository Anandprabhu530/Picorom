# Picorom

A Dockerized Image Format Conversion Service Deployed on Google Cloud Run

Picorom is a web application that allows users to easily convert images between formats, specifically from IMG to PNG and vice versa. It utilizes a ReactJS frontend for user interaction and a NodeJS backend, written in TypeScript, for the conversion logic. The backend is containerized using Docker and deployed on Google Cloud Run for a scalable, serverless hosting environment. Continuous integration and deployment are set up through GitHub Actions, ensuring automated deployment with every change to the backend code.

## Features

- Converts images from IMG to PNG and PNG to IMG formats.
- Serverless backend hosted on Google Cloud Run for scalable and reliable performance.
- Integrated Continuous Integration and Continuous Deployment (CI/CD) pipeline using GitHub Actions for automatic backend deployments.
- Containerized backend ensures consistent environment across all deployments.

## Frontend (ReactJS):

- Provides an intuitive interface for users to upload images.
- User selects an image file and chooses the conversion type (IMG to PNG or PNG to IMG).
- Frontend sends the image to the backend for processing.

## Backend (NodeJS with TypeScript):

- Receives the image from the frontend and processes the format conversion.
- Implements the logic to convert IMG to PNG and PNG to IMG using server-side tools and libraries.
- Returns the converted image back to the frontend.

## Docker & Google Cloud Run:

- The backend is containerized using Docker to ensure consistency across development and production environments.
- Deployed on Google Cloud Run for a fully serverless solution that scales automatically based on incoming requests.
- Supports seamless horizontal scaling, making it suitable for high-volume traffic.

## Continuous Integration and Delivery (CI/CD) with GitHub Actions:

- GitHub Actions automates the build and deployment process for the backend.
- Every change to the backend code triggers an automated pipeline, ensuring fast and reliable deployments.

## Source Control with GitHub:

- The project uses GitHub for version control, allowing for efficient collaboration and management of the codebase.
- Features branch management, pull requests, and code reviews to maintain quality throughout the development process.

## How It Works

1. **Frontend (ReactJS)**:
   - The user uploads an image and selects the desired format conversion.
   - The frontend sends the image file to the backend API for conversion.

2. **Backend (NodeJS + TypeScript)**:
   - The backend receives the image, processes the conversion logic, and converts the image to the desired format.
   - The converted image is sent back to the frontend for download.

3. **Deployment (Google Cloud Run)**:
   - The backend is containerized using Docker and deployed on Google Cloud Run, ensuring seamless scalability and reliability.

## Possible Improvements

- **Additional Image Formats**: Support more image formats for conversion (e.g., JPG, GIF, BMP).
- **Image Editing Features**: Add basic image editing capabilities, such as resizing, cropping, and rotating images.
- **Bulk Conversion**: Implement functionality for batch image conversions.
- **User Authentication**: Introduce user authentication and allow users to manage their conversion history.
