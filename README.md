# Eldorado Gaming Marketplace

A modern web application for trading gaming accounts, items, and services, inspired by Eldorado.gg.

## Features

- Modern, responsive UI using Material-UI
- Dark theme by default
- Search functionality
- Popular games showcase
- Featured services section
- User authentication (placeholder)
- Shopping cart functionality (placeholder)

## Tech Stack

- **Frontend**: React, Material-UI, Axios
- **Backend**: Python Flask
- **API**: RESTful API

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python 3.8 or higher
- npm or yarn

### Quick Start

#### Windows
```
run.bat
```

#### Unix-based systems (Linux, macOS)
```
chmod +x run.sh
./run.sh
```

### Manual Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/eldorado-clone.git
cd eldorado-clone
```

2. Install Python dependencies:
```
pip install -r requirements.txt
```

3. Install Node.js dependencies:
```
npm install
```

4. Download images and create assets:
```
python download_images.py
python create_favicon.py
python create_logo.py
```

### Running the Application

1. Start the Flask backend:
```
python app.py
```

2. In a new terminal, start the React development server:
```
npm start
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

The backend API will be running at:
```
http://localhost:5000
```

## Project Structure

```
eldorado-clone/
├── app.py                  # Flask backend
├── requirements.txt        # Python dependencies
├── package.json            # Node.js dependencies
├── run.py                  # Script to run both servers
├── download_images.py      # Script to download game images
├── create_favicon.py       # Script to create favicon
├── create_logo.py          # Script to create logos
├── run.bat                 # Windows batch file
├── run.sh                  # Unix shell script
├── public/                 # Static files
│   ├── index.html          # HTML template
│   ├── manifest.json       # Web app manifest
│   ├── favicon.ico         # Favicon
│   ├── logo192.png         # Small logo
│   ├── logo512.png         # Large logo
│   └── images/             # Game images
└── src/                    # React source code
    ├── components/         # Reusable components
    │   ├── Navbar.js       # Navigation bar
    │   └── Footer.js       # Footer component
    ├── pages/              # Page components
    │   └── Home.js         # Home page
    ├── App.js              # Main App component
    ├── index.js            # Entry point
    └── index.css           # Global styles
```

## Adding Game Images

Place game images in the `public/images` directory with the following naming convention:
- valorant.jpg
- lol.jpg
- csgo.jpg
- fortnite.jpg
- hero-bg.jpg

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by [Eldorado.gg](https://www.eldorado.gg/)
- UI components from [Material-UI](https://mui.com/) 