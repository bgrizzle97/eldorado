import os
import requests
from PIL import Image
from io import BytesIO

# Create images directory if it doesn't exist
os.makedirs('public/images', exist_ok=True)

# Image URLs for our games
image_urls = {
    'valorant.jpg': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'lol.jpg': 'https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'csgo.jpg': 'https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'fortnite.jpg': 'https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'hero-bg.jpg': 'https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
}

# Download and save images
for filename, url in image_urls.items():
    print(f"Downloading {filename}...")
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))
    
    # Resize hero background to be larger
    if filename == 'hero-bg.jpg':
        img = img.resize((1920, 1080), Image.LANCZOS)
    else:
        img = img.resize((800, 450), Image.LANCZOS)
    
    img.save(f'public/images/{filename}')
    print(f"Saved {filename}")

print("All images downloaded successfully!") 