# IOT-Dashboard (Final Project)
Dashboard application for NDSU CSCI 846 Distributed Systems course.

**Project Purpose:**
The purpose of this project is to give hands-on experience to networking and distributed systems topics, complementary to the analytical and critical process of the material discussed in class. 


**Topic:**
Internet of Things (IOT)


**Scope:**
Develop a distributed systems application using a set of network devices to act as sensors and actuators, all connected back to a Raspberry Pi. For this integration with IOT devices, the devices that were selected for were televisions linked to or embedded with the “Roku” application, the "Ring" automated doorbell system, and the "Sengled" lightbulb series enabled with Wifi capability. 

 ![This is an image](https://github.com/c-gullickson/IOT-Dashboard/blob/main/Dashboard%20Screenshots/SystemDiagram.PNG)


**Application Purpose:**
The main purpose of the application being developed is to create a centralized dashboard application, serving as a single connection point for multiple household devices located on my home network. As different devices establish connections on my local network, the user will have them configured to the "server" application, where they will be accessible to programatic actions and events, as well as user interface interactions. Implementing these types of interactions will help demonstrate the concept of IOT devices, where input data from devices creates output actions for other devices. Additionally, the information collected from each device will be displayed to the "client" application, supporting values such as the operational status and functions that can be executed on the device. For this project there are multiple devices that I have linked together to in order to identify how unrelated devices can control others if properly associated based on data passed through a central hub. This application initiative focuses on these devices:

  - Roku Television Applications
  - Ring Doorbell Automation
  - Sengled "WiFi enabled" lightbulbs


**Application Specifications and Overview:**
  - The project is architected utilizing a “client” / ”server” architecture.
  - The Raspberry Pi is hosting both the "client" and "server" applications while also Instantiating a "client" instance within the browser, all of which is connected and displayed to a "hmtech" 10.1’ touch screen monitor.
  - The project is utilizing distributed components. 
    - Data captured from both "Ring" devices, and "Sengled" devices are stored and accessed on application web servers provided by the manufacturer. This data is retreived by the "server" application using a variety of API calls.
  - The "client" application is a browser-based application, built with the Angular framework.
    -   Prior to hosting the Angular "client" application on the Raspberry Pi, an Apache2 web server is required to be installed using the "sudo apt-get install apache2 -y command" from the Raspberry Pi terminal.  
  - The "server" application has been scripted in Python, utilizing both Flask and Socket IO frameworks. The combination of both of these frameworks gives the "server" application the ability to be accessed via the internet, as well as interactable with web sockets.
    -   Prior to implementing the Python server application on the Raspberry Pi, several external package dependencies were required to be installed using the "pip3 install" command. These packages include:
        -   flask_cors
        -   flask_socketio
        -   ring_doorbell
        -   xmltodict
  - The files for both the "client" application and "server" application were transferred to the Raspberry Pi device using FileZilla originating from a development workstation.


**Application Prerequisites:**
For each of the devices that this dashboard is interacting with, there are prerequisites that must be met prior to the dashboard working as anticipated.

  - Roku:
    - The user must manually find the IP address of each device. This can be done on the television by navigating to the “settings” page, and taking note of the IP address. This will later be used within the configuration file of the application. As a note, although python and terminals have commands to look up and return devices on the network, it was often difficult to determine where devices were located when it came to associating a local name
    
  - Ring:
    - Connecting the device to the manufacturer’s application.
    - Making note of the username and password to input into the configuration file of the application.
 
  - Sengled:
    - Connecting the devices to the manufacture’s application.
    - Making note of the username and password to input into the configuration file of the application.

  - Since there is no database implemented with the current iteration, a local path on the Raspberry Pi must be identified so that a JSON formatted configuration file can be stored. 


**Application Startup:**
Once the prerequisites have been met, required packages have been installed, and source files have been transferred to the Raspberry Pi, the "client" application and "server" application can be initiated.

  - "Server" Application Startup:
    - Open a new terminal window on the Raspberry Pi.
    - Use the "cd" terminal command to change to the directory of the main.py file within the "server" application folder.
    - Use the "python3 main.py" terminal command to initialize the main.py file. Initializing this file will start up a new flask instance of "server" application, and listen for both HTTP and web socket requests on port 5000. 
    
  - "Client" Application Startup:
    - Open a new terminal window on the Raspberry Pi.
    - Use the "sudo service apache2 status" command to check the state of the Apache web server. If the web server is in a stopped state, use the "sudo service apache2 start" command to initialize the server.
    - Open a new web browser, and navigate to the application page (http://192.168.10.187)


**Application Navigation** 
Once the Apache server has started hosting the "client" application component, and the Raspberry Pi has started hosting the "server" application component, the dashboard as a whole can perform the following functionalities based around the three scoped devices.

  - Main Page:
  
 ![This is an image](https://github.com/c-gullickson/IOT-Dashboard/blob/main/Dashboard%20Screenshots/Dashboard%20Initialization.PNG)
 
From the main page, the first thing to do will be to use the toggle buttons to “initialize” each of the IOT devices intended to be used within the application. By toggling each device to an on state, the "server" application takes the username / password information to sign into the manufacturer's API’s. If the Roku and Ring devices have both been initialized, then the processor can also be initialized. 

 ![This is an image](https://github.com/c-gullickson/IOT-Dashboard/blob/main/Dashboard%20Screenshots/Dashboard%20Main.PNG)

The functionality of initializing the processor is to create a new thread on the "server" application. With the processor running in a separate thread, the main "client" application can navigate to other pages within the application, while still making additinoal HTTP requests to the "server" application. Additionally, the duty of the processor is to continuously poll the Ring API for “doorbell” events in 30 second increments. Each time an event is retrieved, the processor calculates how old the event is subtracting from current time. If the event is less than 45 seconds old, the processor then looks at the type of event; “motion” or “ding”. With a “motion” event, the processor uses the connected web socket to push a message back to the "client" application, where with a “ding” event, the processor looks for any configured Roku devices. Any configured “Roku” device is then programmatically paused, with a different message sent back to the "client" application indicating a “ding” event has been triggered.

After triggering the initialization function for all three device types that the dashboard currently supports, the main page of the dashboard is now displaying information for any configured Roku devices, Ring devices, Sengled Lightbulb devices. 

  - Roku Television Sub-Page:

 ![This is an image](https://github.com/c-gullickson/IOT-Dashboard/blob/main/Dashboard%20Screenshots/Dashboard%20Roku.PNG)
 
The functionality on this page is to provide the user with additional information about the Roku device like if device is an embedded application or external application. Internally, this information is collected by different API's returned from to the Roku device.
Additionally, this page gives the user the ability to control the Roku device with four functions within the TV [power on, power off, play and pause]. 

  - Ring Doorbell Sub-Page:

 ![This is an image](https://github.com/c-gullickson/IOT-Dashboard/blob/main/Dashboard%20Screenshots/Dashboard%20Ring.PNG)

Like the Roku sub-page, the first functionality is to provide the user with additional information about the Ring device.
Additionally, this page gives the user information regarding the last “alert” captured from the device, displaying columns like alert Id, the time that the alert occurred at, and the type of event that was triggered. 
Finally, this page's functionality gives the user the ability to view the last recorded alert captured by the device. The URL is returned from the API, and then played back within an IFrame component of the application.  

  
  - Sengled Lights Sub-Page:

 ![This is an image](https://github.com/c-gullickson/IOT-Dashboard/blob/main/Dashboard%20Screenshots/Dashboard%20Lights.PNG)

Like both pages before, the main functionality is to provide the user with additional information about the light devices, not shown within the main page of the dashboard. While there were plans to manipulate the light color, brightness, and state, the available API was in a broken state, and would not accept inputs to those functions. 

  - Configuration Sub-Page:

 ![This is an image](https://github.com/c-gullickson/IOT-Dashboard/blob/main/Dashboard%20Screenshots/Dashboard%20Configuration.PNG)

Since the "client" application is heavily dependent on the integration of open-source API’s and connecting into the manufacture’s environment, the main functionality for the configuration sub-page is to give the client user an easy way to manipulate usernames, passwords, authentication codes and device IP addresses where required. 
For example, when logging into the Ring environment using the open-source API, it tries to use a cached token. However, if this token is expired or invalid, an email notification is sent to the registered user. The user can then take the code that is given, apply it into the configuration, and update the file overall. 
