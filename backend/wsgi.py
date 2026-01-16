"""
WSGI entry point for PathFinder backend
This file is used by WSGI servers like Gunicorn in production
"""

from app import app

if __name__ == "__main__":
    app.run()
