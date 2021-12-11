const User = require("./server/models/user");
const Software = require("./server/models/software");
const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
var dbConfig = require("./server/config/config.js");

mongoose
    .connect(dbConfig.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log())
    .catch((err) => console.log(err));

function createUser(
    firstName,
    lastName,
    username,
    city,
    country,
    state,
    phone,
    role,
    email,
    pass
) {
    var user = new User();
    user.local.firstName = firstName;
    user.local.lastName = lastName;
    user.local.username = username;
    user.local.city = city;
    user.local.country = country;
    user.local.state = state;
    user.local.phone = phone;
    user.role = role;
    user.local.email = email;
    user.local.password = bcrypt.hashSync(pass, bcrypt.genSaltSync(8), null);

    user.save((err, data) => {
        if (err) {
            console.log(err);
        }
        return;
    });
}

function createsSoftware(
    name,
    category,
    details,
    developerName,
    subscriptionPrice
) {
    var software = new Software();

    software.name = name;
    software.catagory = category;
    software.details = details;
    software.developerName = developerName;
    software.subscriptionPrice = subscriptionPrice;

    software.save(function (err) {
        if (err) {
            console.log(err);
        }
        return;
    });
}

let u1 = createUser(
    "Raj",
    "dhanani",
    "raj123",
    "jersey",
    "US",
    "NJ",
    "5515542763",
    1,
    "rajdhanani@gmail.com",
    "raj@893"
);

let u2 = createUser(
    "aksh",
    "patel",
    "aksh123",
    "jersey",
    "USA",
    "CAL",
    "3267322363",
    1,
    "akshdhanani@gmail.com",
    "aksh@893"
);
let u3 = createUser(
    "Pat",
    "Jackson",
    "Pat008",
    "Newyork",
    "USA",
    "NY",
    "5987642763",
    1,
    "patjack02@stevens.edu",
    "Pat@893"
);
let u4 = createUser(
    "John",
    "Rajakish",
    "John0070",
    "Bernandino",   
    "USA",
    "CAL",
    "3987623638",
    1,
    "johnraja03@stevens.edu",
    "Klsit@9021"
);

console.log("users created");

let v1 = createUser(
    "Mohit",
    "Ankoliya",
    "mohit123",
    "jersey",
    "US",
    "NJ",
    "5545542763",
    0,
    "rajdhdfdg@gmail.com",
    "raj@5463"
);
let v2 = createUser(
    "Ansh",
    "Hirani",
    "affrt53",
    "Ciden",
    "USA",
    "CAL",
    "8976452318",
    0,
    "williomjohn@gmail.com",
    "aksh@89783"
);
let v3 = createUser(
    "Parth",
    "Goti",
    "parth2080",
    "Newrk",
    "USA",
    "NY",
    "5897642763",
    0,
    "pgoti32080@stevens.edu",
    "ParthHir@893"
);
let v4 = createUser(
    "Krisha",
    "Dhameliya",
    "Krisha070",
    "Kandino",
    "Can",
    "Dalhousie",
    "5642987801",
    0,
    "krishaHere@stevens.edu",
    "Kl89@9021"
);

console.log("Vendors created");

let s1 = createsSoftware(
    "Ganna",
    "Music",
    "https://Ganna.com",
    "UniqueDevelopers",
    "199"
);

let s2 = createsSoftware(
    "Spotify",
    "Music",
    "https://Spotify.com",
    "JacksonDevelopers",
    "249"
);

let s3 = createsSoftware(
    "AdobePhotoshop",
    "Editing",
    "https://AdobePS.com",
    "AdobeTeam",
    "1199"
);

let s4 = createsSoftware(
    "NJIT",
    "Bus",
    "https://NJIT.com",
    "NjDevelopers",
    "1999"
);

console.log("Softwares created");

setTimeout(function () {
    process.exit()
}, 4000)