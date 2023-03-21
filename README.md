# Welcome to Hold My Table!

Hold My Table is my backend capstone project for NSS E-19. It was built with Javascript, react and Next.js on the front end, and Python/Django on the back end.

My focus for this project was to create a full-featured restaurant reservation app with a twist- users can reserve an individual table. Have you ever been to a fancy restaurant and gotten a reservation only to find out you're at a drafty table by the noisy kitchen and bathrooms? This app aims to eliminate that problem.

## Getting Started

you will need to create a .env file for both front end and back end directories. They will need these Keys-

Front End - [Sample .env](/hold-my-table-FE/public/images/Sample%20FE%20env.png)

Back End - [Sample .env](/hold-my-table-BE/media/Sample%20BE%20env.png)

You will need to utilize Firebase to enable Google Authentication.

[Firebase Instructions](/Firebase.md)

The easiest way to get this project running locally is to utilize the Docker containerization I have done.

[Installation using Docker](/DockerInstallation.md)

## Select Features

### User Features

Users can look up a restaurant and view details about the restaurant such as website, instagram, and also see price point and rating. From this page they can also click on the reservation portal.

![restaurant page](/hold-my-table-FE/public/images/single-restaurant-page.png)

Here is the reservation portal. Users can pick a table, see information about it and find out when a specific table is available

![reservation portal](/hold-my-table-FE/public/images/reservationPortal.png)

Users can manage their upcoming reservations, and leave reviews on past reservations.

![user profile](/hold-my-table-FE/public/images/user-profile.png)
