"""
Production WSGI server using Waitress (Windows-compatible)
Use this for production deployment on Windows servers
"""

import os
from waitress import serve
from app import app

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    host = '0.0.0.0'
    
    print("=" * 60)
    print("  PathFinder Backend - Production Server (Waitress)")
    print("=" * 60)
    print(f"\n  🚀 Server starting on http://{host}:{port}")
    print(f"  📱 Network access: http://192.168.1.236:{port}")
    print(f"  🔧 Workers: 4 threads")
    print(f"  ⚡ Production-ready WSGI server")
    print("\n  Press Ctrl+C to stop\n")
    print("=" * 60)
    
    # Serve the application
    serve(
        app,
        host=host,
        port=port,
        threads=4,  # Number of worker threads
        url_scheme='http',
        ident='PathFinder-API'
    )
