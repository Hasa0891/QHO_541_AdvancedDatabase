# QHO_541_AdvancedDatabase
Advanced Database Project

## Run Project in Development

You can run this project in development in 3 ways:

1. User Docker compose
2. Using Local Node and MongoDB setup
3. Using Local Node and Cloud MongoDB Atlas

### Using Docker Compose

[Docker](https://www.docker.com/) is a platform and tool designed to make it easier to create, deploy, and run applications by using containers. The necessary information about this can be found [here](https://docs.docker.com/get-started/overview/)

To run the application using docker the following steps should be taken:

1. Install Docker on the system
2. Install git on the system and run the following command in Terminal/ Git Bash/ Command Prompt:
   
   `git clone https://github.com/Hasa0891/QHO_541_AdvancedDatabase.git`

3. Open Project in Visual Studio Code
4. Create folder `data` inside the project root directory
5. Create `.env` file inside project root directory and put these environment variables:
   ```
    WEB_PORT=3000
    MONGODB_URI=mongodb://username:password@mongodb:27017/?authMechanism=DEFAULT
    ADMIN_NAME=admin_email
    ADMIN_PASS=admin_password
   ```

6. Using MongoDB atlas access MongoDB instance of dokcer and run follwing commands to create a user:

    - click on `MONGOSH` below the window and put the commands
    ```
    1. use admin

    2. db.createUser({
            user: "username",
            pwd: "password",
            roles: [
                { role: "readWrite", db: "pandemic" },
            ]
        })
    ```

7. Run the following command in Visual Studio Code Terminal from the project root directory:
   
   - `docker compose up -d`
   - `docker exec -it nodeapp bash`
   - `cd workspace`
   - `npm install`
   - `node seeder.js`

8. When it's done, press `ctrl-c` and type `exit`
9. Enter command `docker compose down` in another terminal
10. Then, again `docker compose up -d`, the application will be live

### Using Local Node and MongoDB Setup

The steps to follow is simple here:

1. Clone this repository using `git`, the command:
   
    `git clone https://github.com/Hasa0891/QHO_541_AdvancedDatabase.git`

2. Install Node.js in the system
3. Install MongoDB in the system
4. Open the project in Visual Studio Code
5. In the visual studio code Terminal run the command 

    `npm install`

6. In the project root directory create `.env` file and specify the environment variables:

    ```
    WEB_PORT=3000
    MONGODB_URI=mongodb://username:password@localhost:27017/?authMechanism=DEFAULT
    ADMIN_NAME=admin_email
    ADMIN_PASS=admin_password
   ```

7. Run the command `npm start`, and Application will be alive

### Using local Node and Cloud MongoDB Atlas

The steps are same as the previos one, only a minor change in the `.env` file

```
MONGODB_URI= the actual uri of the database created in mongo atlas cloud
```

## Deployment in Production

To deploy this project, [Render](https://dashboard.render.com/) is used. It is very simple tool to Deploy Node.js application quickly. A free subscription is available.

After creating an account in Render, we can create web services free, the steps to create web services is as below:

1. Click on the new Button and Choose Web Service
   
   ![dashboard](public/photos/report/01.png)

2. Then, Select Build and deploy from a Git repository 

   ![dashboard](public/photos/report/02.png)

3. Specify the public Github link of the project

   ![dashboard](public/photos/report/03.png)

4. Then, fill up the options form as below 

   ![dashboard](public/photos/report/04.png)

5. Give start command as follows

   ![dashboard](public/photos/report/05.png)

6. Specify the environment variables:

    ```
    WEB_PORT=80
    MONGODB_URI= Altas MongoDB URI Here
    authMechanism=DEFAULT
    ADMIN_NAME=admin_email
    ADMIN_PASS=admin_password
    ```

   ![dashboard](public/photos/report/06.png)
7. Select auto Deploy as `Yes` and Click `Create Web Service`

   ![dashboard](public/photos/report/07.png)

8. Now, The application is live in the web: 

   ![dashboard](public/photos/report/08.png)