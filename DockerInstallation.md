# Hold My Table Installation using Docker

I am happy to offer a totally containerized version of Hold My Table! If you are familiar with Docker, this will be a breeze.

```git clone git@github.com:Justin-Ferwerda/hold-my-table.git```

You will need 2 .env files: one for front end, one for back end.

Create a .env for front end in ```/hold-my-table-FE``` and place the api keys according to the [Sample .env](/hold-my-table-FE/public/images/Sample%20FE%20env.png).

For BE .env, you can create a new django secret key with this command-

```python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'```

You will place it into a .env file in ```/hold-my-table-BE/hold-my-table```. It should look like this- [Sample .env](/hold-my-table-BE/media/Sample%20BE%20env.png)

Then while in the root folder, this command:

```docker compose up```

The build process should take about two minutes, once the api and web services are up and running, navigate to localhost:3000 and you should be good to go!
