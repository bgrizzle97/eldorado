from PIL import Image, ImageDraw, ImageFont
import os

# Create a 32x32 image with a dark background
img = Image.new('RGB', (32, 32), color=(18, 18, 18))
draw = ImageDraw.Draw(img)

# Draw a simple "E" letter
draw.rectangle([(8, 4), (24, 8)], fill=(255, 64, 129))  # Top horizontal
draw.rectangle([(8, 12), (24, 16)], fill=(255, 64, 129))  # Middle horizontal
draw.rectangle([(8, 20), (24, 24)], fill=(255, 64, 129))  # Bottom horizontal
draw.rectangle([(8, 4), (12, 24)], fill=(255, 64, 129))  # Vertical

# Save as ICO
img.save('public/favicon.ico', format='ICO')
print("Favicon created successfully!") 