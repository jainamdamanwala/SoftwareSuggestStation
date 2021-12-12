const User = require("../server/models/user");
const Software = require("../server/models/software");
const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
var dbConfig = require("../server/config/config.js");

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
    link,
    developerName,
    subscriptionPrice
) {
    var software = new Software();

    software.name = name;
    software.catagory = category;
    software.link = link;
    software.developerName = developerName;
    software.subscriptionPrice = subscriptionPrice;
    software.details = "This is best software for " + category

    software.save(function (err) {
        if (err) {
            console.log(err);
        }
        return;
    });
}

let u1 = createUser(
    "Jainam",
    "Damanwala",
    "jainam123",
    "jersey",
    "US",
    "NJ",
    "5515542763",
    1,
    "jainamdamanwala@gmail.com",
    "jainam@123"
);

let u2 = createUser(
    "Hardi",
    "patel",
    "hardi123",
    "jersey",
    "USA",
    "CAL",
    "3267322363",
    1,
    "hardipatel@gmail.com",
    "hardi@123"
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
    "Shubham",
    "Jiyani",
    "shubham123",
    "jersey",
    "US",
    "NJ",
    "5545542763",
    0,
    "shubhamjiyani@gmail.com",
    "shubham@123"
);
let v2 = createUser(
    "yash",
    "anghan",
    "yash123",
    "Ciden",
    "USA",
    "CAL",
    "8976452318",
    0,
    "yashanghan@gmail.com",
    "yash@123"
);
let v3 = createUser(
    "patrick",
    "Hill",
    "pat123",
    "Newrk",
    "USA",
    "NY",
    "5897642763",
    0,
    "patrickhill@stevens.edu",
    "patrickhill@123"
);

console.log("Vendors created");

createsSoftware(
    "Ganna",
    "Music",
    "www.Ganna.com",
    "UniqueDevelopers",
    "3.99"
);

createsSoftware(
    "Spotify",
    "Music",
    "www.Spotify.com",
    "JacksonDevelopers",
    "4.99"
);
createsSoftware(
    "Amazon Music",
    "Music",
    "music.amazon.com",
    "Amazon",
    "9.99"
);

createsSoftware(
    "Youtube Music",
    "Music",
    "music.youtube.com",
    "Youtube",
    "7.99"
);

createsSoftware(
    "Adobe Photoshop",
    "Editing",
    "www.adobe.com/products/photoshop.html",
    "AdobeTeam",
    "11.99"
);
createsSoftware(
    "Adobe Illustrator",
    "Editing",
    "www.adobe.com/products/photoshop.html",
    "AdobeTeam",
    "11.99"
);
createsSoftware(
    "After Effects",
    "Editing",
    "www.adobe.com/products/photoshop.html",
    "AdobeTeam",
    "11.99"
);
createsSoftware(
    "Sketch",
    "Editing",
    "www.sketch.com",
    "Sketch",
    "11.99"
);

createsSoftware(
    "Origin",
    "Gaming",
    "www.origin.com",
    "EA",
    "0"
);
createsSoftware(
    "Steam",
    "Gaming",
    "store.steampowered.com/",
    "Steam",
    "0"
);
createsSoftware(
    "Riot Games",
    "Gaming",
    "www.riotgames.com",
    "Riot Games",
    "0"
);
createsSoftware(
    "Miniclip",
    "Gaming",
    "www.miniclip.com",
    "Miniclip",
    "0"
);
createsSoftware(
    "Visual Studio Code",
    "Development",
    "code.visualstudio.com/",
    "Miniclip",
    "0"
);
createsSoftware(
    "Eclipse",
    "Development",
    "www.eclipse.org/downloads/",
    "Miniclip",
    "0"
);
createsSoftware(
    "Sublime",
    "Development",
    "www.sublimetext.com/",
    "Miniclip",
    "Free"
);
createsSoftware(
    "Visual Studio",
    "Development",
    "visualstudio.microsoft.com/",
    "Miniclip",
    "0"
);
createsSoftware(
    "Netflix",
    "ott",
    "www.netflix.com/",
    "Miniclip",
    "9.99"
);
createsSoftware(
    "HBO Max",
    "ott",
    "www.hbomax.com/",
    "Miniclip",
    "14.99"
);
createsSoftware(
    "Amazon Prime Video",
    "ott",
    "www.primevideo.com",
    "Miniclip",
    "10.99"
);
createsSoftware(
    "Disney Plus",
    "ott",
    "www.disneyplus.com/",
    "Miniclip",
    "7.99"
);

console.log("Softwares created");

setTimeout(function () {
    process.exit()
}, 5000)