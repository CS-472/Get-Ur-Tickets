- [Get-Ur-Tickets](#get-ur-tickets)
- [Process to run application on AWS](#process-to-run-application-on-aws)
  - [Access the AWS machine](#access-the-aws-machine)
  - [Get the most up-to-date code](#get-the-most-up-to-date-code)
  - [Serve the flask application](#serve-the-flask-application)
    - [The application is now served here](#the-application-is-now-served-here)
- [Process to run it locally](#process-to-run-it-locally)
  - [Frontend](#frontend)
    - [Frontend Optional:](#frontend-optional)
  - [Backend](#backend)
  - [Docker](#docker)
- [How the application works](#how-the-application-works)

# Get-Ur-Tickets
This is repository is for the CS 472 project.

# Process to run application on AWS
## Access the AWS machine
- Update the permissions on the KeyPair file
  - `chmod 400 MyKeyPair.pem`
- ssh into AWS machine 
  - `ssh -i MyKeyPair.pem ubuntu@ec2-52-204-31-136.compute-1.amazonaws.com`

## Get the most up-to-date code
- Clone the repository
  - `git clone https://github.com/CS-472/Get-Ur-Tickets.git`
- Pull the most up-to-date code from the repository
   `git pull`

## Serve the flask application
- Check if there are any active screens
  - `screen -ls`
- Terminate any active screens
  - `screen -X -S <session_id> quit`
- Resume any active screens
  - `screen -r`
- Serve the flask application
  - `sudo waitress-serve --port=80 --call flask_app:create_app`
- Detach from the current screen
  - Ctrl + A, then D

### The application is now served [here](http://ec2-52-204-31-136.compute-1.amazonaws.com/)

# Process to run it locally
## Frontend
1. `npm install bootstrap react-bootstrap aws-amplify @aws-amplify/ui-react` - use this command to # get the dependancies to be able to start it.
   
2. `npm start`

### Frontend Optional: 
1. If using a Linux machine, or UNIX machines (needs testing), you may run `chmod +x build.sh` if you wish to use the build script instead. 

2. After enabling the build script for execution, run `./build.sh` in the root directory of your repo git clone.

3. This will run all necessary commands to build/aquire dependencies and prompt you to start the webserver locally if you wish.

## Backend
The entry point of the backend is [flask_app.py](./backend/flask_app.py)

1. Change directories to the backend directory: `cd backend`
2. Run `waitress-serve --port=80 --call flask_app:create_app`
3. Run the following command.
```shell 
curl -d '{"originAirportCode":"LAS", "keyword":"formula-1"}' -X POST http://ec2-52-204-31-136.compute-1.amazonaws.com/result -H "Content-Type: application/json"
```

- If need be, edit the parameters passed by modifying what is inside the curly braces

You can expect the output to be in a JSON format like the following.
```json
[
    {
        "Total_Price": 754.0,
        "Name": "2024 Formula 1 Pirelli United States Grand Prix - Sunday",
        "Venue": "Austin+Texas",
        "Ticket_Price": 249.0,
        "Ticket_URL": "https://www.ticketmaster.com/2024-formula-1-pirelli-united-states-austin-texas-10-20-2024/event/3A006091CD365146",
        "Flight": {
            "Flight_Price": 299,
            "Flight_URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI0LTEwLTE5agcIARIDTEFTcgcIARIDQVVTGh4SCjIwMjQtMTAtMjFqBwgBEgNBVVNyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "Frontier",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/F9.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Hotel_Price": 206,
            "Hotel_Logo": "",
            "Hotel_Name": "Cambria Hotel Austin Downtown",
            "Hotel_Class": "3-star hotel"
        }
    },
    {
        "Total_Price": 783.0,
        "Name": "2024 Formula 1 Pirelli United States Grand Prix - Saturday",
        "Venue": "Austin+Texas",
        "Ticket_Price": 179.0,
        "Ticket_URL": "https://www.ticketmaster.com/2024-formula-1-pirelli-united-states-austin-texas-10-19-2024/event/3A006091CC9350FA",
        "Flight": {
            "Flight_Price": 398,
            "Flight_URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI0LTEwLTE4agcIARIDTEFTcgcIARIDQVVTGh4SCjIwMjQtMTAtMjBqBwgBEgNBVVNyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "Frontier",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/F9.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Hotel_Price": 206,
            "Hotel_Logo": "",
            "Hotel_Name": "Cambria Hotel Austin Downtown",
            "Hotel_Class": "3-star hotel"
        }
    },
    {
        "Total_Price": 916.0,
        "Name": "2024 Formula 1 Pirelli United States Grand Prix - Friday",
        "Venue": "Austin+Texas",
        "Ticket_Price": 89.0,
        "Ticket_URL": "https://www.ticketmaster.com/2024-formula-1-pirelli-united-states-austin-texas-10-18-2024/event/3A006091CC0450AD",
        "Flight": {
            "Flight_Price": 613,
            "Flight_URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI0LTEwLTE3agcIARIDTEFTcgcIARIDQVVTGh4SCjIwMjQtMTAtMTlqBwgBEgNBVVNyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "Frontier",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/F9.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Hotel_Price": 214,
            "Hotel_Logo": "",
            "Hotel_Name": "Cambria Hotel Austin Downtown",
            "Hotel_Class": "3-star hotel"
        }
    },
    {
        "Total_Price": 1403.0,
        "Name": "Souvenir Ticket - FORMULA 1 AUSTRALIAN GRAND PRIX 2025",
        "Venue": "Albert+Park+Victoria",
        "Ticket_Price": 25.0,
        "Ticket_URL": "https://www.ticketmaster.com.au/souvenir-ticket-formula-1-australian-grand-albert-park-16-03-2025/event/250061339E1A2126",
        "Flight": {
            "Flight_Price": 1378,
            "Flight_URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI1LTAzLTE1agcIARIDTEFTcgcIARIDTUVMGh4SCjIwMjUtMDMtMTdqBwgBEgNNRUxyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "Alaska",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/AS.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Hotel_Price": 0,
            "Hotel_Logo": "",
            "Hotel_Name": "",
            "Hotel_Class": ""
        }
    },
    {
        "Total_Price": 1492.96,
        "Name": "Sunday Joyflight - FORMULA 1 AUSTRALIAN GRAND PRIX 2025",
        "Venue": "Albert+Park+Victoria",
        "Ticket_Price": 114.96,
        "Ticket_URL": "https://www.ticketmaster.com.au/sunday-joyflight-formula-1-australian-grand-albert-park-16-03-2025/event/25006130BDE32A68",
        "Flight": {
            "Flight_Price": 1378,
            "Flight_URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI1LTAzLTE1agcIARIDTEFTcgcIARIDTUVMGh4SCjIwMjUtMDMtMTdqBwgBEgNNRUxyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "Alaska",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/AS.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Hotel_Price": 0,
            "Hotel_Logo": "",
            "Hotel_Name": "",
            "Hotel_Class": ""
        }
    },
    {
        "Total_Price": 1579.96,
        "Name": "Friday Joyflight - FORMULA 1 AUSTRALIAN GRAND PRIX 2025",
        "Venue": "Albert+Park+Victoria",
        "Ticket_Price": 114.96,
        "Ticket_URL": "https://www.ticketmaster.com.au/friday-joyflight-formula-1-australian-grand-albert-park-14-03-2025/event/25006130BDD82A62",
        "Flight": {
            "Flight_Price": 1465,
            "Flight_URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI1LTAzLTEzagcIARIDTEFTcgcIARIDTUVMGh4SCjIwMjUtMDMtMTVqBwgBEgNNRUxyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "Alaska",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/AS.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Hotel_Price": 0,
            "Hotel_Logo": "",
            "Hotel_Name": "",
            "Hotel_Class": ""
        }
    },
    {
        "Total_Price": 1952.96,
        "Name": "Saturday Joyflight - FORMULA 1 AUSTRALIAN GRAND PRIX 2025",
        "Venue": "Albert+Park+Victoria",
        "Ticket_Price": 114.96,
        "Ticket_URL": "https://www.ticketmaster.com.au/saturday-joyflight-formula-1-australian-grand-albert-park-15-03-2025/event/25006130BDDF2A66",
        "Flight": {
            "Flight_Price": 1462,
            "Flight_URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI1LTAzLTE0agcIARIDTEFTcgcIARIDTUVMGh4SCjIwMjUtMDMtMTZqBwgBEgNNRUxyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "Alaska",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/AS.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Hotel_Price": 376,
            "Hotel_Logo": "",
            "Hotel_Name": "Crest on Park Apartments",
            "Hotel_Class": "4-star hotel"
        }
    },
    {
        "Total_Price": 2026.53,
        "Name": "Thursday Joyflight - FORMULA 1 AUSTRALIAN GRAND PRIX 2025",
        "Venue": "Albert+Park+Victoria",
        "Ticket_Price": 85.53,
        "Ticket_URL": "https://www.ticketmaster.com.au/thursday-joyflight-formula-1-australian-grand-albert-park-13-03-2025/event/25006130BDC82A60",
        "Flight": {
            "Flight_Price": 1547,
            "Flight_URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI1LTAzLTEyagcIARIDTEFTcgcIARIDTUVMGh4SCjIwMjUtMDMtMTRqBwgBEgNNRUxyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "American",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/AA.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Hotel_Price": 394,
            "Hotel_Logo": "",
            "Hotel_Name": "Crest on Park Apartments",
            "Hotel_Class": "4-star hotel"
        }
    },
    {
        "Total_Price": 5189.0,
        "Name": "Individual G04 Formula 1 2024",
        "Venue": "M\u00e9xico+Ciudad+de+M\u00e9xico",
        "Ticket_Price": 4767.0,
        "Ticket_URL": "https://www.ticketmaster.com.mx/individual-g04-formula-1-2024-mexico-27-10-2024/event/140060B8940A0DC4",
        "Flight": {
            "Flight_Price": 288,
            "Flight_URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI0LTEwLTI2agcIARIDTEFTcgcIARIDTUVYGh4SCjIwMjQtMTAtMjhqBwgBEgNNRVhyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "Volaris",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/Y4.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Hotel_Price": 134,
            "Hotel_Logo": "",
            "Hotel_Name": "DOWNTOWN MEXICO HOTEL",
            "Hotel_Class": "3-star hotel"
        }
    },
    {
        "Total_Price": 5429.0,
        "Name": "Individual G04 Formula 1 2024",
        "Venue": "M\u00e9xico+Ciudad+de+M\u00e9xico",
        "Ticket_Price": 4766.0,
        "Ticket_URL": "https://www.ticketmaster.com.mx/individual-g04-formula-1-2024-mexico-25-10-2024/event/140060B893DF0D99",
        "Flight": {
            "Flight_Price": 385,
            "Flight_URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI0LTEwLTI0agcIARIDTEFTcgcIARIDTUVYGh4SCjIwMjQtMTAtMjZqBwgBEgNNRVhyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "VivaAerobus",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/VB.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Hotel_Price": 278,
            "Hotel_Logo": "",
            "Hotel_Name": "Hotel Galer\u00eda Plaza Reforma",
            "Hotel_Class": "4-star hotel"
        }
    },
    {
        "Total_Price": 5477.0,
        "Name": "Individual G04 Formula 1 2024",
        "Venue": "M\u00e9xico+Ciudad+de+M\u00e9xico",
        "Ticket_Price": 4767.0,
        "Ticket_URL": "https://www.ticketmaster.com.mx/individual-g04-formula-1-2024-mexico-26-10-2024/event/140060B893FA0DB7",
        "Flight": {
            "Flight_Price": 360,
            "Flight_URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI0LTEwLTI1agcIARIDTEFTcgcIARIDTUVYGh4SCjIwMjQtMTAtMjdqBwgBEgNNRVhyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "VivaAerobus",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/VB.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Hotel_Price": 350,
            "Hotel_Logo": "",
            "Hotel_Name": "Hotel Galer\u00eda Plaza Reforma",
            "Hotel_Class": "4-star hotel"
        }
    },
    {
        "Total_Price": 50963.0,
        "Name": "Boxes Grada 11 + Speed Lounge Formula 1 2024",
        "Venue": "M\u00e9xico+Ciudad+de+M\u00e9xico",
        "Ticket_Price": 50300.0,
        "Ticket_URL": "https://www.ticketmaster.com.mx/boxes-grada-11-speed-lounge-formula-mexico-25-10-2024/event/140061329A51126E",
        "Flight": {
            "Flight_Price": 385,
            "Flight_URL": "https://www.google.com/travel/flights?hl=en&gl=us&tfs=CBwQAhoeEgoyMDI0LTEwLTI0agcIARIDTEFTcgcIARIDTUVYGh4SCjIwMjQtMTAtMjZqBwgBEgNNRVhyBwgBEgNMQVNCAQFIAXABmAEB",
            "Airline": "VivaAerobus",
            "Logo": "https://www.gstatic.com/flights/airline_logos/70px/VB.png",
            "Travel_Class": "Economy"
        },
        "Hotel": {
            "Hotel_Price": 278,
            "Hotel_Logo": "",
            "Hotel_Name": "Hotel Galer\u00eda Plaza Reforma",
            "Hotel_Class": "4-star hotel"
        }
    }
]
```

## Docker
1. Commands to build and run 
   - To build the container issue the command `docker build -t get-ur-tickets-app .`
   - To run the container issue the command  `docker run -p 3000:3000 get-ur-tickets-app`
2. Build Phase:
   - When the Docker file is built it will do the following: 
   - Download the node.js 16 image
   - Create a working directory in the `/app` container
   - Copy the package.json files
   - Run `npm install` to install dependencies 
3. Run Phase:
   - When the Docker file is ran it will do the following:
   - Expose port 3000 in the container to port 3000 on your local machine
   - Start the Node.js application using npm start 
   - The application will be accessible on your local machine at `http://localhost:3000`
4. FAQ:
   - Ensure Docker is installed on your computer.
   - The initial build will take approximately 2 minutes.
   - If the build fails and the error you encounter is 401 unauthorized, make sure you are logged into Docker on your terminal. 
   - The command to log in is `docker login -u <username>`

# How the application works
![](img/System-Diagram.jpg)

GetUrTickets is a RESTful application that works by making GET, POST, PUT, and DELETE requests. The application has a frontend user interface that the user will interact with, and a backend that handles all of the processing of the application. The application will be hosted on Amazon Web Services using [AWS Amplify](https://aws.amazon.com/amplify/). The application will be deployed each time there is a new commit to our team repository.

Based on the diagram at the top. The user will request tickets for a specific (event) on the frontend. The backend will make an API call to SeatGeek for the upcoming events, which will then make an API call to SerpAPI for upcoming flight options based on the result from SeatGeek. After this, the backend will calculate each choice’s total price (tickets + flight), sort, and send the results to the frontend. The frontend will display the results and give the user the choice to filter. After this, the front end will provide the user an option to buy tickets through affiliate links so our application can receive a final payout.

The UML diagram below shows how the application works on a detailed level.

![](img/UML.jpg)