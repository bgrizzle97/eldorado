from PIL import Image, ImageDraw, ImageFont
import os

# Create logos directory if it doesn't exist
os.makedirs('public', exist_ok=True)

# Create a 192x192 logo
logo192 = Image.new('RGB', (192, 192), color=(18, 18, 18))
draw192 = ImageDraw.Draw(logo192)

# Draw a simple "E" letter
draw192.rectangle([(48, 24), (144, 48)], fill=(255, 64, 129))  # Top horizontal
draw192.rectangle([(48, 72), (144, 96)], fill=(255, 64, 129))  # Middle horizontal
draw192.rectangle([(48, 120), (144, 144)], fill=(255, 64, 129))  # Bottom horizontal
draw192.rectangle([(48, 24), (72, 144)], fill=(255, 64, 129))  # Vertical

# Save as PNG
logo192.save('public/logo192.png', format='PNG')

# Create a 512x512 logo
logo512 = Image.new('RGB', (512, 512), color=(18, 18, 18))
draw512 = ImageDraw.Draw(logo512)

# Draw a simple "E" letter
draw512.rectangle([(128, 64), (384, 128)], fill=(255, 64, 129))  # Top horizontal
draw512.rectangle([(128, 192), (384, 256)], fill=(255, 64, 129))  # Middle horizontal
draw512.rectangle([(128, 320), (384, 384)], fill=(255, 64, 129))  # Bottom horizontal
draw512.rectangle([(128, 64), (192, 384)], fill=(255, 64, 129))  # Vertical

# Save as PNG
logo512.save('public/logo512.png', format='PNG')

print("Logos created successfully!") 