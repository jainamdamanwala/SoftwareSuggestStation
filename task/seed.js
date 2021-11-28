const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const softwares = data.softwareData;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

 const soft1 = await softwares.create('soft1','abc','www.soft1.com','$$$','3.5');
 const soft2 = await softwares.create('soft2','abc','www.soft1.com','$$$','3.5');
 const soft3 = await softwares.create('soft3','abc','www.soft1.com','$$$','3.5');
 const soft4 = await softwares.create('soft4','abc','www.soft1.com','$$$','3.5');

  console.log('Done seeding database');

  //await db.serverConfig.close();
}

main();