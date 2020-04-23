web: gunicorn project.wsgi --log-file=-
web2: daphne project.asgi:application --port $PORT --bind 0.0.0.0 -v2