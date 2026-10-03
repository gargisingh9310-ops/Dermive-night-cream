import os
import math
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageFont
import numpy as np

# Load the source packaging reference
src_path = 'C:/Users/DELL/.gemini/antigravity-ide/brain/72516f2e-d875-4ac0-bf68-2886e721513a/.user_uploaded/media_1790842302851.png'
img = Image.open(src_path).convert('RGBA')

os.makedirs('public/images', exist_ok=True)

# 1. CREATE ISOLATED GOLD CAP TRANSPARENT PNG
# Cap in original image is located at roughly X: 175 to 595, Y: 228 to 345
cap_box = (175, 226, 595, 348)
cap_crop = img.crop(cap_box)
cap_w, cap_h = cap_crop.size

# Refine top and side edges with rounded rectangle mask
cap_mask = Image.new('L', (cap_w, cap_h), 0)
draw = ImageDraw.Draw(cap_mask)
# Cap shape is slightly rounded on top corners, flat on bottom
draw.rounded_rectangle([4, 3, cap_w - 5, cap_h - 1], radius=14, fill=255)
final_cap_alpha = cap_mask.filter(ImageFilter.GaussianBlur(0.6))

cap_clean = cap_crop.copy()
cap_clean.putalpha(final_cap_alpha)
cap_clean.save('public/images/gold_cap_isolated.png', 'PNG')
print('Created public/images/gold_cap_isolated.png')

# 2. CREATE ISOLATED JAR BODY TRANSPARENT PNG (NO FLOOR, NO BACKGROUND, NO SWIRLS)
# Jar body in original image is located at roughly X: 165 to 605, Y: 345 to 615
jar_box = (165, 345, 605, 615)
jar_crop = img.crop(jar_box)
jar_w, jar_h = jar_crop.size

# Extract jar body with precision rounded container mask
jar_mask = Image.new('L', (jar_w, jar_h), 0)
draw_jar = ImageDraw.Draw(jar_mask)
# Jar shape: cylindrical glass with curved base
draw_jar.rounded_rectangle([4, 2, jar_w - 5, jar_h - 6], radius=24, fill=255)

jar_clean = jar_crop.copy()
composite_alpha = jar_mask.filter(ImageFilter.GaussianBlur(0.8))
jar_clean.putalpha(composite_alpha)

# Create an open rim at top of jar body so when cap is off it looks naturally open
jar_with_rim = Image.new('RGBA', (jar_w, jar_h + 24), (0, 0, 0, 0))
# Draw open threaded rim
rim_draw = ImageDraw.Draw(jar_with_rim)
# Golden/amber glass inner rim
rim_draw.ellipse([jar_w*0.08, 0, jar_w*0.92, 28], fill=(55, 28, 14, 255), outline=(190, 155, 95, 255), width=3)
# Inner cream surface visible when open
rim_draw.ellipse([jar_w*0.12, 5, jar_w*0.88, 23], fill=(245, 238, 226, 255), outline=(210, 180, 130, 255), width=2)
# Paste jar body below rim
jar_with_rim.paste(jar_clean, (0, 16), jar_clean)

jar_with_rim.save('public/images/jar_body_isolated.png', 'PNG')
print('Created public/images/jar_body_isolated.png')

# 3. CREATE HIGH-RES FULL ASSEMBLED JAR (TRANSPARENT PNG)
full_box = (165, 226, 605, 615)
full_crop = img.crop(full_box)
full_w, full_h = full_crop.size

full_mask = Image.new('L', (full_w, full_h), 0)
draw_full = ImageDraw.Draw(full_mask)
# Cap area rounded rect
draw_full.rounded_rectangle([10, 3, full_w - 11, 122], radius=14, fill=255)
# Jar area rounded rect
draw_full.rounded_rectangle([4, 118, full_w - 5, full_h - 6], radius=24, fill=255)

full_clean = full_crop.copy()
full_clean.putalpha(full_mask.filter(ImageFilter.GaussianBlur(0.8)))
full_clean.save('public/images/night_cream_full.png', 'PNG')
print('Created public/images/night_cream_full.png')

# 4. CREATE PREMIUM CIRCULAR INGREDIENT ICONS (ORBS)
def create_ingredient_capsule(filename, title, subtitle, inner_color_1, inner_color_2, icon_type):
    size = 240
    orb = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(orb)
    
    # Outer glow
    for r in range(size//2, size//2 - 12, -1):
        alpha = int(255 * (1 - (size//2 - r) / 12.0) * 0.4)
        draw.ellipse([size//2 - r, size//2 - r, size//2 + r, size//2 + r], outline=(201, 164, 92, alpha), width=1)
        
    # Main circular capsule background (cream / champagne gradient)
    for i in range(size//2 - 14):
        ratio = i / (size//2 - 14)
        r = size//2 - 14 - i
        cr = int(inner_color_1[0] * (1 - ratio) + inner_color_2[0] * ratio)
        cg = int(inner_color_1[1] * (1 - ratio) + inner_color_2[1] * ratio)
        cb = int(inner_color_1[2] * (1 - ratio) + inner_color_2[2] * ratio)
        draw.ellipse([size//2 - r, size//2 - r, size//2 + r, size//2 + r], fill=(cr, cg, cb, 255))
        
    # Double Gold Border Rings
    draw.ellipse([14, 14, size - 14, size - 14], outline=(201, 164, 92, 255), width=3)
    draw.ellipse([19, 19, size - 19, size - 19], outline=(232, 210, 154, 200), width=1)
    
    # Internal Macro Texture / Geometric Crystal
    center = size // 2
    if icon_type == 'crystal':
        # Niacinamide Crystal Mesh
        for angle in range(0, 360, 45):
            rad = math.radians(angle)
            x1 = center + int(math.cos(rad) * 45)
            y1 = center + int(math.sin(rad) * 45)
            draw.line([center, center, x1, y1], fill=(201, 164, 92, 160), width=2)
            draw.ellipse([x1 - 6, y1 - 6, x1 + 6, y1 + 6], fill=(245, 238, 226, 255), outline=(201, 164, 92, 255), width=2)
        draw.ellipse([center - 16, center - 16, center + 16, center + 16], fill=(255, 255, 255, 255), outline=(201, 164, 92, 255), width=2)
        
    elif icon_type == 'leaf':
        # Olive Leaf Bio Silhouette
        draw.ellipse([center - 15, center - 45, center + 15, center + 45], fill=(74, 107, 68, 230), outline=(201, 164, 92, 255), width=2)
        draw.ellipse([center - 40, center - 15, center + 25, center + 25], fill=(95, 138, 88, 200), outline=(232, 210, 154, 255), width=2)
        draw.ellipse([center - 5, center - 20, center + 40, center + 15], fill=(120, 160, 110, 180), outline=(232, 210, 154, 255), width=2)
        
    elif icon_type == 'moisture':
        # Hyaluronic & Shea Moisture Droplet Ripple
        for rad in [15, 30, 45]:
            draw.ellipse([center - rad, center - rad, center + rad, center + rad], outline=(201, 164, 92, 180), width=2)
        draw.ellipse([center - 12, center - 12, center + 12, center + 12], fill=(255, 255, 255, 255), outline=(201, 164, 92, 255), width=2)
        
    # Top Specular Highlight arc
    draw.arc([24, 20, size - 24, size - 35], 200, 340, fill=(255, 255, 255, 220), width=3)
    
    orb.save(f'public/images/{filename}', 'PNG')
    print(f'Created public/images/{filename}')

create_ingredient_capsule('ingredient_niacinamide.png', 'NIACINAMIDE', 'Vitamin B3', (250, 245, 235), (230, 210, 185), 'crystal')
create_ingredient_capsule('ingredient_olive_leaf.png', 'OLIVE LEAF', 'Bio Antioxidant', (245, 248, 240), (210, 225, 200), 'leaf')
create_ingredient_capsule('ingredient_hyaluronic.png', 'HYALURONIC & SHEA', 'Deep Lipid Shield', (250, 242, 235), (235, 215, 195), 'moisture')

# 5. CREATE LARGE UNIFIED FORMULA ORB (RIGHT SIDE)
def create_formula_orb():
    size = 400
    orb = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(orb)
    center = size // 2
    
    # Outer golden aura glow
    for r in range(size//2, size//2 - 25, -1):
        alpha = int(255 * (1 - (size//2 - r) / 25.0) * 0.45)
        draw.ellipse([center - r, center - r, center + r, center + r], outline=(201, 164, 92, alpha), width=2)
        
    # Dark espresso / warm champagne radial blend
    for i in range(size//2 - 28):
        ratio = i / (size//2 - 28)
        r = size//2 - 28 - i
        cr = int(35 * (1 - ratio) + 65 * ratio)
        cg = int(18 * (1 - ratio) + 40 * ratio)
        cb = int(8 * (1 - ratio) + 20 * ratio)
        draw.ellipse([center - r, center - r, center + r, center + r], fill=(cr, cg, cb, 255))
        
    # Golden borders
    draw.ellipse([28, 28, size - 28, size - 28], outline=(201, 164, 92, 255), width=3)
    draw.ellipse([34, 34, size - 34, size - 34], outline=(232, 210, 154, 180), width=1)
    
    # Internal luminous orbital rings
    for radius in [70, 110, 140]:
        draw.ellipse([center - radius, center - radius, center + radius, center + radius], outline=(201, 164, 92, 90), width=1)
        
    # Center synergistic core
    draw.ellipse([center - 45, center - 45, center + 45, center + 45], fill=(201, 164, 92, 40), outline=(232, 210, 154, 255), width=2)
    draw.ellipse([center - 20, center - 20, center + 20, center + 20], fill=(247, 241, 231, 230), outline=(201, 164, 92, 255), width=2)
    
    # Top Specular Highlight
    draw.arc([40, 36, size - 40, size - 60], 210, 330, fill=(255, 255, 255, 180), width=3)
    
    orb.save('public/images/ingredient_orb.png', 'PNG')
    print('Created public/images/ingredient_orb.png')

create_formula_orb()
