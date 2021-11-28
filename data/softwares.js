var { ObjectId } = require('bson');
const mongoCollections = require('../config/mongoCollections');
const softwares = mongoCollections.softwares;

module.exports = {
    // This is a fun new syntax that was brought forth in ES6, where we can define
    // methods on an object with this shorthand!
    async get(id) {
      if (!id || id === null || id === undefined) throw 'You must provide an id to search for';
      const softwareCollection = await softwares();
      ObjectId = require('mongodb').ObjectID;
      var newID = ObjectId(id);
      const softwareInfo = await softwareCollection.findOne({ _id: newID });
      if (softwareInfo === null) throw 'No software with that id';
      return softwareInfo;
    },
  
    async getAll() {
      const softwareCollection = await softwares();
      const softwareList = await softwareCollection.find({},{ projection: { _id: 1, name: 1} }).toArray();
      if(softwareList.length == 0) throw 'No software added';
      return softwareList;
    },
  
    async create(name, provider, website, priceRange, ratings) {

      const softwareCollection = await softwares();

      let newSoftware = {
        name: name,
        provider: provider, 
        website: website, 
        priceRange: priceRange, 
        ratings: ratings,
        reviews : []
      };
  
      const insertInfo = await softwareCollection.insertOne(newSoftware);
      if (insertInfo.insertedCount === 0) throw 'Could not add software';
  
      const newId = insertInfo.insertedId;
  
      const software = await this.get(newId);
      return software;
    },
  };