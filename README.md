Docker Multi-Container & Networks with Docker Compose
Introduction

This project demonstrates how to set up multi-container applications using Docker Compose, configure custom networks for container communication, and understand the different networking modes such as host and bridge in Docker. The objective is to create a backend service connected to a MongoDB service and explore how containers communicate on different networks.
Concepts Covered

    Multi-Container Setup: Using multiple containers to build and run an application.

    Docker Networks: Configuring custom networks for inter-container communication.

    Docker Compose: Defining multi-container Docker applications using a single docker-compose.yml file.

    Network Modes: Exploring different networking modes like host and bridge.

Project Overview

This project involves two main containers:

    Backend Container: A Node.js application connected to a MongoDB database.

    MongoDB Container: A container running MongoDB, which is used by the backend.

Workflow:

    The backend communicates with the MongoDB database using the MongoDB URI.

    The backend and MongoDB run on separate networks to understand how network isolation and communication work in Docker.

    We will use Docker Compose to manage both containers.

Steps Followed
1. Multi-Container Setup

We created two services:

    Backend: A Node.js application (Express) container.

    MongoDB: A container running MongoDB.

Each container runs on a different network:

    Backend connects using host network mode (direct communication with the host system).

    MongoDB connects using a custom bridge network.

    3. Key Networking Concepts

    Host Network Mode: The backend container runs with network_mode: host, allowing it to communicate directly with the host system.

    Bridge Network Mode: The mongo container uses a custom bridge network (booknest-network), isolating it from the host system but allowing communication with other containers on the same network.

2. Testing Connectivity

We used the following commands to test connectivity between the containers:

    Ping Mongo from Backend:

        We tried pinging the MongoDB container from the backend using the container name (mongoContainer).

        Initially, communication didn’t work due to different networks.

3. Connecting Containers to Networks

To allow communication between containers on different networks, we connected them manually to the same network:

docker network connect booknest-network booknest-backend-container-host

4. Next Steps

    Explore further network configurations.

    Integrate additional services to expand the project.

Running the Project

    Build the containers:

docker-compose up --build

Check if containers are running:

docker ps

Access logs for the backend container:

docker logs booknest-backend-container-host
