# Jungle Development Manual

## Cloning the repo from GitHub...
..to a New Project In IntelliJ IDEA:

**(IntelliJ IDEA must be in a Linux environment)**
1. *New > Project from Version Control... > Git*
2. In the `URL` field, enter: `https://github.com/leejr0/cs414-f19-001-Spaghetti-Coders.git`
3. In the `Directory` field, change it from 
>`/home/{user}/IdeaProjects/cs414-f19-001-Spaghetti-Coders`
to  
>`/home/{user}/IdeaProjects/cs414`
4. Click `Clone`

## Running the Application
1. Make sure the repo is cloned and up to date in IDEA.
2. In a *fresh* local terminal within IntelliJ IDEA, type `./run`
3. After compilation, the web interface should be accessible at `localhost:8090` in (most) web browsers

### Information about `./run`
This command will recompile and bundle information from both the client and the server to be rendered on the web browser. After any change to the system is made, either in the client or the server, the environment must be recompiled and bundled again to see the changes implemented. All necessary files will be made automatically with the `./run` command without any extra work from the developer.

## Updating the Project
To update the project, a developer should first pull any recent changes from GitHub by going to `VCS -> Git -> Pull` in the navigation at the top of the Intellij window. This can also be done by pressing the blue arrow in the top right corner, next to `Git:`. After the project is updated, a developer should open a new branch by pressing the icon labeled `Git: master` in the bottom right corner of the Intellij window. The developer can name their branch according to the change they are making, and proceed with any changes.

### Updating the Client
In order to add or remove functionality to or from the client, the developer must access a certain directory. Inside the directory `Game` within the path `/home/IdeaProjects/cs414/client/src/`. In that directory, the ReactJS files can be found to edit. `Application.js` is the main page the entire project is based off of, and any subsequent file is branched from that file. Any new Javascript file should be created in this game folder, with this statement at the top: `import React, {Component} from 'react';`. This, along with making any new class extend from 'Component', will allow the developer to work in ReactJS.

### Updating the Server
The java files for the server can be found within `/home/IdeaProjects/cs414/server/src/`. Testing files can be found inside of `serverTest/java/com.jungleapp/cs414.server` and functional java files are inside `/main/java/com.jungleapp.cs414.server`. Adding a file to the server should add it to the package `com.jungleapp.cs414.server`.

## Running Tests Standalone
...
## Database

### Running a Local Database *(Outside of CSU Network)*
MySQL must be installed within a linux environment (operating system or virtual machine).
1. If you don't already have a MySQL user set up, just set up the root account with a password of your choice.
2. Once it is installed and the server is set up, login using: `mysql -u root -p`, and enter the password for the root user.
    - Replace `root` with your username and use your own password if user account exists.
    - To change the root password, use: `mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '(new_password)';`
3. Create the database using: `mysql> CREATE DATABASE (database_name);`
    - Use it with: `mysql> USE (database_name);` (MAKE SURE YOU USE THIS COMMAND. Without it, MySQL doesn't know what database to use.)
4. From the 'cs414' directory, run the createDB script to create the tables necessaryfor Jungle: `mysql> source ./createDB;`
    - Check if the tables exist: `mysql> show tables;`
5. The necessary changes for the code to use the local database are as follows:
  In RetrieveProfile.java and RetrieveMatches.java, modify the following lines:
  
    `String MySQLConnectionURL = "jdbc:mysql://` **localhost/(database_name)** `?useTimezone=true&serverTimezone=UTC";`
    
    `String DBUsername = "` **root** `";  or  String DBUsername = "` **(username)** `";`
    
    `String DBPassword = "` **(password)** `";`
6. To pass the RetreiveProfile tests, an entry needs to be added to the Players table:
    ```INSERT INTO `Players` (`nickname`,`email`,`password`,`wins`,`losses`) VALUES ('zizamzoe','zizamzoe@gmail.com','1234','0','0'); ```
