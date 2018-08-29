# Comma Map Challenge

React app that displays an interactive map for visualizing the distribution of speeds and other data along trips recorded utilizing chffr.

Requirements:

-   git
-   Node v8
-   npm v6

To run the app locally:

```bash
git clone https://github.com/aleangel1212/comma-map.git
cd comma-map
npm install
npm run start
```

The app is also hosted [here](http://avecchi.me/comma-map).

To upload trip data, simply drag and drop the JSON trip files in the dropzone at the top left of the application. Once the trip data is parsed, click on the trip that you would like to display on the map to enable it. Click on any of the sample markers for that trip to obtain metrics recorded at that moment.

You can also utilze the tools at the bottom left of the map container to enable, disable, and clear all the trips loaded into the application.

The trip files should be formatted as follows:
```json
{
  "start_time": "2016-07-02T11:56:24",
  "end_time": "2016-07-02T12:55:17",
  "coords": [
    {
      "lat": 37.74977073928103, 
      "speed": 33.13078457720014, 
      "lng": -122.39242219446099, 
      "dist": 1.1740257992762348, 
      "index": 0
    },
    {
      "lat": 37.749486436043824, 
      "speed": 33.54402868231216,
      "lng": -122.39256210414712,
      "dist": 1.1946123655563248,
      "index": 1
    }
  ]
}
```

The sample set of data provided is available for download [here](http://avecchi.me/comma-map/trips.zip).

[react]: http://facebook.github.io/react/
[webpack]: http://webpack.github.io/
[babeljs]: https://babeljs.io/
