import subprocess
import sys
import os
import time
import webbrowser
from threading import Thread

def run_flask():
    print("Starting Flask backend...")
    # Start Flask in a separate process
    flask_process = subprocess.Popen(["python", "app.py"])
    return flask_process

def run_react():
    print("Starting React frontend...")
    # Add Node.js to PATH
    nodejs_path = r"C:\Program Files\nodejs"
    if nodejs_path not in os.environ["PATH"]:
        os.environ["PATH"] = nodejs_path + os.pathsep + os.environ["PATH"]
    
    # Start React in a separate process
    react_process = subprocess.Popen(["npm", "start"])
    return react_process

def open_browser():
    print("Opening browser...")
    # Wait a bit for the servers to start
    time.sleep(3)
    # Open the browser
    webbrowser.open("http://localhost:3000")

def main():
    try:
        # Start Flask
        flask_process = run_flask()
        
        # Start React
        react_process = run_react()
        
        # Open browser
        open_browser()
        
        # Keep the script running
        flask_process.wait()
        react_process.wait()
    except KeyboardInterrupt:
        print("\nShutting down...")
        flask_process.terminate()
        react_process.terminate()
        sys.exit(0)

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
    
    main() 