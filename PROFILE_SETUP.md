# How to Add Your Profile Photo

## Current Setup
Your portfolio now includes a professional profile image placeholder with:
- Circular design with animated gradient border
- Hover effects and smooth transitions
- Responsive sizing for mobile devices
- Professional styling with shadow effects

## How to Replace with Your Photo

### Option 1: Add Image to Project Folder
1. **Add your photo** to the portfolio folder:
   ```
   /home/shammah/Documents/shammahpaluku.github.io/
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── profile.jpg  ← Add your photo here
   └── README.md
   ```

2. **Update the HTML** in `index.html` line 44:
   ```html
   <!-- Change from: -->
   <img src="https://via.placeholder.com/200x200/6366f1/ffffff?text=EP" alt="Elishama Paluku" class="profile-img">
   
   <!-- To: -->
   <img src="profile.jpg" alt="Elishama Paluku" class="profile-img">
   ```

### Option 2: Use External URL
If your photo is hosted online (like GitHub, LinkedIn, or Imgur):
```html
<img src="https://your-image-url.com/your-photo.jpg" alt="Elishama Paluku" class="profile-img">
```

### Option 3: Use Base64 Encoded Image
For a completely self-contained portfolio:
1. Convert your image to base64 (use online converters)
2. Replace the src with the base64 data

## Recommended Photo Specifications

### Image Requirements:
- **Size**: 400x400 pixels or higher
- **Format**: JPG, PNG, or WebP
- **Aspect Ratio**: Square (1:1)
- **File Size**: Under 500KB for fast loading

### Professional Photo Tips:
- Use a professional headshot
- Plain or simple background
- Good lighting on your face
- Business casual or professional attire
- Smile and look approachable
- High resolution, not blurry

### Quick Photo Setup:
1. **Take a photo** with your phone or camera
2. **Crop to square** using any photo editor
3. **Resize to 400x400 pixels**
4. **Save as JPG** with medium quality
5. **Copy to portfolio folder**
6. **Update the HTML src attribute**

## Current Placeholder Features
The current placeholder includes:
- **Animated rotating border** with gradient colors
- **Hover effect** that scales the image
- **Professional shadow** with brand colors
- **Responsive sizing** (200px desktop, 150px mobile)
- **Circular crop** with clean border

## Alternative Profile Styles

### Style 1: Simple Circle
```html
<div class="profile-image simple">
    <img src="profile.jpg" alt="Elishama Paluku" class="profile-img">
</div>
```

### Style 2: Card Style
```html
<div class="profile-image card">
    <img src="profile.jpg" alt="Elishama Paluku" class="profile-img">
</div>
```

### Style 3: Minimal
```html
<div class="profile-image minimal">
    <img src="profile.jpg" alt="Elishama Paluku" class="profile-img">
</div>
```

## CSS Customization Options

### Change Border Animation Speed:
```css
.profile-border {
    animation: rotate 10s linear infinite; /* Change 10s to faster/slower */
}
```

### Change Border Colors:
```css
.profile-border {
    background: linear-gradient(135deg, #your-color-1, #your-color-2);
}
```

### Change Image Size:
```css
.profile-img {
    width: 250px;  /* Default: 200px */
    height: 250px; /* Default: 200px */
}
```

## Testing Your Photo
After adding your photo:
1. **Open** `index.html` in your browser
2. **Check** that the image loads properly
3. **Test** hover effects
4. **Verify** mobile responsiveness
5. **Ensure** alt text is descriptive

## Troubleshooting

### Image Not Showing:
- Check file path is correct
- Ensure image file is in the right folder
- Verify file name matches exactly (case-sensitive)

### Image Looks Distorted:
- Use a square image
- Check image resolution
- Verify CSS object-fit setting

### Slow Loading:
- Compress the image
- Use WebP format
- Optimize file size

---

**Your portfolio is now ready for your professional profile photo!** 📸
