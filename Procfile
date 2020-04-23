worker: python manage.py runserver 0.0.0.0:$PORT --noreload
web: gunicorn project.wsgi --log-file=-
web2: daphne project.asgi:application --port $PORT --bind 0.0.0.0 -v2
channelsworker: python manage.py runworker -v2