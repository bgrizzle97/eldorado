import subprocess
import sys
import os
import time
import webbrowser
from threading import Thread

def run_flask():
    print("Starting Flask backend...")
    subprocess.run([sys.executable, "app.py"])

def run_react():
    print("Starting React frontend...")
    subprocess.run(["npm", "start"])

def open_browser():
    # Wait for servers to start
    time.sleep(5)
    print("Opening browser...")
    webbrowser.open("http://localhost:3000")

if __name__ == "__main__":
    # Check if node_modules exists, if not, run npm install
    if not os.path.exists("node_modules"):
        print("Installing Node.js dependencies...")
        subprocess.run(["npm", "install"])
    
    # Check if Python dependencies are installed
    try:
        import flask
        import flask_cors
        import PIL
    except ImportError:
        print("Installing Python dependencies...")
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
    
    # Check if images exist, if not, run download_images.py
    if not os.path.exists("public/images/valorant.jpg"):
        print("Downloading images...")
        subprocess.run([sys.executable, "download_images.py"])
    
    # Check if favicon exists, if not, create it
    if not os.path.exists("public/favicon.ico"):
        print("Creating favicon...")
        subprocess.run([sys.executable, "create_favicon.py"])
    
    # Check if logos exist, if not, create them
    if not os.path.exists("public/logo192.png"):
        print("Creating logos...")
        subprocess.run([sys.executable, "create_logo.py"])
    
    # Start servers in separate threads
    flask_thread = Thread(target=run_flask)
    react_thread = Thread(target=run_react)
    browser_thread = Thread(target=open_browser)
    
    flask_thread.daemon = True
    react_thread.daemon = True
    browser_thread.daemon = True
    
    flask_thread.start()
    react_thread.start()
    browser_thread.start()
    
    # Keep the main thread running
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down servers...")
        sys.exit(0) 