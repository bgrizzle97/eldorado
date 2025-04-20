import os
import requests
from PIL import Image
from io import BytesIO

# Create images directory if it doesn't exist
os.makedirs('public/images', exist_ok=True)

# Image URLs for our games
image_urls = {
    'valorant.jpg': 'https://raw.githubusercontent.com/bgrizzle97/game-images/main/valorant.jpg',
    'lol.jpg': 'https://raw.githubusercontent.com/bgrizzle97/game-images/main/lol.jpg',
    'csgo.jpg': 'https://raw.githubusercontent.com/bgrizzle97/game-images/main/csgo.jpg',
    'fortnite.jpg': 'https://raw.githubusercontent.com/bgrizzle97/game-images/main/fortnite.jpg',
    'hero-bg.jpg': 'https://raw.githubusercontent.com/bgrizzle97/game-images/main/gaming-bg.jpg'
}

# Download and save images
for filename, url in image_urls.items():
    print(f"Downloading {filename}...")
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
        img = Image.open(BytesIO(response.content))
        
        # Convert RGBA to RGB if necessary
        if img.mode in ('RGBA', 'LA'):
            background = Image.new('RGB', img.size, (18, 18, 18))
            background.paste(img, mask=img.split()[-1])
            img = background
        
        # Resize hero background to be larger
        if filename == 'hero-bg.jpg':
            img = img.resize((1920, 1080), Image.LANCZOS)
        else:
            img = img.resize((800, 450), Image.LANCZOS)
        
        img.save(f'public/images/{filename}')
        print(f"Saved {filename}")
    except Exception as e:
        print(f"Error downloading {filename}: {str(e)}")
        continue

print("Image download process completed!") 