
#  Bohr + Planetscale - Step-by-step tutorial
Bohr project Example using PlanetScale.

## Prerequisites
- Bohr account.
- Planetscale account.

## Set up the database
After login in to Planetscale, create a new database on your prefered region.
![Screenshot_2](https://user-images.githubusercontent.com/69644385/209853766-3527659f-f086-4b5d-94aa-13c56f606bab.png)

Navigate to the 'Branches' tab and chose the branch you created.
![Screenshot_4](https://user-images.githubusercontent.com/69644385/209853770-2ef19365-05c9-4071-8034-a673e03f632b.png)

Find the 'Console' tab, and type the following code to create the "users" table.

```sql
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255),
  `last_name` varchar(255)
);
```

![Screenshot_7](https://user-images.githubusercontent.com/69644385/209853775-378ab896-727b-4c62-a43c-9a340802b50b.png)

After creating the users table, now we have to insert data into it. So type the following code on the console:

```sql
INSERT INTO `users` (id, email, first_name, last_name)
VALUES  (1, 'lucas.nachtigall@bohr.io', 'Lucas', 'Nachtigall');
```
![Screenshot_8](https://user-images.githubusercontent.com/69644385/209853777-b0bee6ff-f980-4894-8791-dee3bf875f61.png)

To read your user data, now use the following SELECT query:

```sql
SELECT * FROM users;
```

![Screenshot_9](https://user-images.githubusercontent.com/69644385/209855242-4745b4ad-5367-4b7a-9c8e-924aae6d2b20.png)

Now you have a working mysql database!

## Using the template

To use the planetscale template, you'll have to connect to your own database. So on your branch page, click on connect
![Screenshot_4](https://user-images.githubusercontent.com/69644385/209856648-c0fa3690-ee96-454e-b534-7e3b065c8929.png)

Select "Node.js" on the "Connect with" selector, and copy your connection string.
![Screenshot_6](https://user-images.githubusercontent.com/69644385/209856651-21a38ff6-d3b4-4bda-9af4-89e2f9558c94.png)

Now that you have the connection string, login on [Bohr.io](https://bohr.io), go to the projects page and add a new project:
![Screenshot_1](https://user-images.githubusercontent.com/69644385/209856653-1b0270e9-17e9-4bbe-ba78-f20c39080095.png)

Select the Planetscale template

![Screenshot_2](https://user-images.githubusercontent.com/69644385/209856640-27faf9e0-206a-454b-a760-974a56db62fc.png)

Fill this page with your data, on the environment variable "DATABASE_URL", use your connection string which you got from planetscale and click **PUBLISH**.

Remember to use only the connection string, not the variable name. For example: 

if your full connection string is: `DATABASE_URL='mysql://*****************************@aws-sa-east-1.connect.psdb.cloud/user_data?ssl={"rejectUnauthorized":true}'`

You should copy only `mysql://*****************************@aws-sa-east-1.connect.psdb.cloud/user_data?ssl={"rejectUnauthorized":true}
`to your "DATABASE_URL" environment variable, without the quotes.

![Screenshot_3](https://user-images.githubusercontent.com/69644385/209856643-4bcdfebe-89c9-48a3-b195-d949afea04cd.png)

After the publishing, you can see your new project on Bohr.io.
![Screenshot_5](https://user-images.githubusercontent.com/69644385/209860054-5c0dd57c-e494-4b2e-927b-9c282a99aa53.png)

if you visit your project's url and access the url/api/users, you'll be able to see your API working and fetching the data on the users table at Planetscale's database.

![Screenshot_6](https://user-images.githubusercontent.com/69644385/209860051-52a25a7c-17fc-420f-9f8c-c05ec95aa440.png)

## Coding the function.
If you want to create your own project using Bohr.io and Planetscale, here's how everything was coded.

### Github
After creating your Planetscale account and keeping your connection string saved, create a new repository on github.
![Screenshot_10](https://user-images.githubusercontent.com/69644385/209853780-7d9b00e7-93dd-41cb-94af-bd036f84d657.png)

### Importing and configuring

Now, on Bohr.io, navigate to add a new project, and click on "import".
![Screenshot_1](https://user-images.githubusercontent.com/69644385/209866435-e89d7f47-d386-4314-a522-584145b79d59.png)

Select the repository of your project(you may need to add your github account if you haven't before) and click import.
![Screenshot_2](https://user-images.githubusercontent.com/69644385/209866437-3da76f61-15f1-47c0-aefe-99214feace70.png)

Now, navigate to your projects Settings> environment variables. You will need to add two environment variables:
- INSTALL_CMD - ```npm install```
- DATABASE_URL -  ```your_connection_string```

Remember to use only the connection string, not the variable name. For example: 

if your full connection string is: `DATABASE_URL='mysql://*****************************@aws-sa-east-1.connect.psdb.cloud/user_data?ssl={"rejectUnauthorized":true}'`

You should copy only `mysql://*****************************@aws-sa-east-1.connect.psdb.cloud/user_data?ssl={"rejectUnauthorized":true}
`to your "DATABASE_URL" environment variable, without the quotes.

After adding your environment variables, click "save" to save your data, don't forget to mark your "DATABASE_URL" variable as a secret.

![Screenshot_3](https://user-images.githubusercontent.com/69644385/209866432-e0af32c4-7874-49e6-a4ec-bedebdd44b12.png)

### Coding the project - Installing 

After importing your project to Bohr, clone the repository to your computer, open your prefered terminal on the project's folder and type `npm init` to initialize the project.
![Screenshot_11](https://user-images.githubusercontent.com/69644385/209853784-a6f533b9-191d-4521-84a3-c86d2d074817.png)

Now type `npm install mysql2 lambda-api` to install the required packages.
![Screenshot_12](https://user-images.githubusercontent.com/69644385/209853786-f6d9b9fc-4480-40ee-83d2-1d248a18a625.png)

### Coding the project - Fetching all users

On the root folder create a new folder called "api" and inside the "api" folder create a new folder called "core". After that, inside the core folder create a new file called index.js. and type the following code:
```javascript
const  mysql = require('mysql2/promise');
const  api = require('lambda-api')();

api.get('/', async (req, res) => {
	res.status(200).json("Hello!");
});

api.get('/users', async (req, res) => {
	try {
		const  connection = await  mysql.createConnection(process.env.DATABASE_URL);
		const [rows] = await  connection.execute('SELECT * FROM users');
		res.status(200).json(rows);
	} catch (error) {
		console.error(error);
		res.error();
	}
});
  
exports.handler = async (event, context) => {
	return  await  api.run(event, context);
};
```
On this code, we configurate our API to reply to GET requests on the "/users" route. Also, on our reply we run the `SELECT * FROM users` query to fetch our user data from Planetscale.
![Screenshot_13](https://user-images.githubusercontent.com/69644385/209853790-5a7d5f87-c2bc-4254-906b-ebb501b10ebd.png)

If you commit and push your files, Bohr will automatically deploy your project and you will be able to see the users that you created on Planetscale on the api/users route.
![Screenshot_14](https://user-images.githubusercontent.com/69644385/209853792-e2fb6a31-0318-42d4-b798-3e4ecbcc317a.png)

### Coding the project - Fetching user by id

To fetch a specific user id, we need to create a new route, so add the following code to your index.js file:

```javascript 
api.get('/user/:id', async (req, res) => {
	try {
		const  connection = await  mysql.createConnection(process.env.DATABASE_URL);
		const [rows] = await  connection.execute(`SELECT * FROM users WHERE id='${req.params.id}'`);
		res.status(200).json(rows);
	} catch (error) {
		console.error(error);
		res.error();
	}
});
```
![Screenshot_15](https://user-images.githubusercontent.com/69644385/209853794-ad2e27ad-ecf6-4666-b81f-25ff553b238d.png)

This code will reply to requests on {YOUR-PROJECT-URL}/api/user/1 for example, and fetch the user data with the selected id. After pushing and deploying your code, you can also test it on the same way as before. 
![Screenshot_16](https://user-images.githubusercontent.com/69644385/209853795-457e895d-3e15-43dc-abec-29576b321d00.png)

### Coding the project - Insert new user
To insert new users on the database, we need a PUT request. So add the following code to your index.js file:
```javascript
api.put('/user', async (req, res) => {
	try {
		const  first_name = req.body.first_name;
		const  last_name = req.body.last_name;
		const  email = req.body.email;
		  
		const  connection = await  mysql.createConnection(process.env.DATABASE_URL);
		await  connection.execute(`INSERT INTO users (first_name, last_name, email) VALUES('${first_name}','${last_name}','${email}')`);
		res.status(200).json();
	} catch (error) {
		console.error(error);
		res.error();
	}
});
```

![Screenshot_17](https://user-images.githubusercontent.com/69644385/209853797-af768f48-9aff-467c-a309-50dcbfb73160.png)

After deploying your code, you can test it sending PUT requests to {YOUR-PROJECT-URL}/api/user. 
![Screenshot_18](https://user-images.githubusercontent.com/69644385/209853798-a23a8398-407d-4567-9cc9-fe85f4a9ffe2.png)
Here we can see that the new user as added to our database.
![Screenshot_19](https://user-images.githubusercontent.com/69644385/209853800-5832c2f3-c4bd-414a-8863-afdde70b263f.png)

### Coding the project - Delete an user

Now to delete users, we need a new route with the DELETE method. Add the following code to your index.js:
```javascript
api.delete('/user/:id', async (req, res) => {
	try {
		const  connection = await  mysql.createConnection(process.env.DATABASE_URL);
		await  connection.execute(`DELETE FROM users WHERE id='${req.params.id}'`);
		res.status(200).json();
	} catch (error) {
		console.error(error);
		res.error();
	}
});
```
![Screenshot_20](https://user-images.githubusercontent.com/69644385/209853802-c32c876e-f2af-4878-b5ab-8b23968664f4.png)

To delete an user, we need to send DELETE requests to our endpoint, as shown bellow.
![Screenshot_21](https://user-images.githubusercontent.com/69644385/209853761-c8574a5e-e81b-4699-b96b-b9a7a8d2d94d.png)

```
