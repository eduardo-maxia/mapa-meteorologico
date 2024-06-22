# Use the official Python image as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the working directory
COPY requirements.txt .

# Install the project dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project to the working directory
COPY . .

# Expose the port that the Flask app will run on
EXPOSE 5000

# Set the entrypoint command to run the Flask app
CMD ["flask", "run", "--host=0.0.0.0"]