# Stock Tracker React Project

This file contains instructions on installing dependencies, building, and running the project on localhost. These instructions assume that you have node installed; if this is not the case, you can go and download it here [here](https://nodejs.org/)

## Features
Responsive buttons and form controls

![initial page](https://i.imgur.com/cFU0xNx.png)

Add multiple stocks at once

![input stocks](https://i.imgur.com/vrBBKqL.png)

Each stock has a graph. One API Call per graph to lighten API load.

![MSFT graph](https://i.imgur.com/drQtefI.png)

There are also smaller things like API centric Errors, Incorrect stock input names ( will add in the okay ones) etc. 

## Installing Client-Side dependencies
Just like what we did above, we are now going to install the dependencies but for the other folder **client/**, visible from the root directory as well.
1. Navigate  to **client/**.
2. Run the command `npm install`. This might take a while as there are a lot of dependencies for react

## Building React in TypeScript
This project was build in TypeScript meaning we have to first build before we can actually run it. Luckily enough React TS makes it very easy to build our project. Simply run the command `npm run-script build` in the **client/** folder. If the command fails try doing it with a more direct one like `react-scripts-ts build`. 

## Installing Server-Side dependencies
1. In a terminal of your choice, navigate to **server/** from the root project directory.
2. Once there, run the command `npm install`.

## Setting up the Backend

The backend requires a little more setup due to the fact there are private API keys involved.
1. In the server directory, create a **setup.json** file with the following contents:
```json
{
	"apiKey":  "your key here"
}
```
2. If there are any issues obtaining an API key I will include mine below. They are free after all:
```json
{
	"apiKey":  "UQXKMJ6BXJPYUOUL"
}
```

## Running the server
Everything should be setup now and ready to work. The command `npm start` inside the **server/** directory should run the server. If that fails you can try the command `ts-node server.ts`. The server should give you the notification in your command line `Server is active. Now listening on port {port specified in init.config.ts}`. There isn't a need to compile these files but you can if you like with tsc ( included in the package ).
