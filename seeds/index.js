const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/go-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array  => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() *30)+ 10;
        const camp = new Campground({
            //DABBA USER ID
            author: '62aca1205d999e7fecf3d415',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, animi? Veniam enim voluptatem recusandae sit ducimus architecto aliquam, modi ullam et autem necessitatibus laboriosam praesentium officiis voluptate nemo a dolor.',
            price,
            "geometry" : {
                "type" : "Point",
                "coordinates" : [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/go-camp/image/upload/v1655628407/go-camp/kd9p2dvppqafekomgwrq.jpg',
                    filename: 'go-camp/kd9p2dvppqafekomgwrq'
                  },
                  {
                    url: 'https://res.cloudinary.com/go-camp/image/upload/v1655628407/go-camp/dnv9wnp1if5i5szgtmoa.jpg',
                    filename: 'go-camp/dnv9wnp1if5i5szgtmoa'
                  }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})