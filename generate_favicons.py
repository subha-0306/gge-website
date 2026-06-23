import sys
from PIL import Image

def generate_favicons():
    source_path = r"C:\Users\smily\OneDrive\Pictures\Screenshots\Screenshot 2026-06-23 004116.png"
    public_dir = r"c:\Users\smily\OneDrive\Desktop\GGE_Website\frontend\public"
    
    try:
        img = Image.open(source_path)
        
        # Make sure it's RGBA
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
            
        # Create 32x32 PNG
        img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
        img_32.save(f"{public_dir}\\favicon.png", "PNG")
        
        # Create 32x32 ICO
        img_32.save(f"{public_dir}\\favicon.ico", "ICO")
        
        # Create 180x180 Apple Touch Icon
        img_180 = img.resize((180, 180), Image.Resampling.LANCZOS)
        img_180.save(f"{public_dir}\\apple-touch-icon.png", "PNG")
        
        print("Successfully created favicons!")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    generate_favicons()
