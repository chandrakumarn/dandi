# Profile Setup Instructions

## Adding Your Profile Picture

To complete the profile setup, please add your profile picture to the project:

1. **Save your profile picture** as `chandrakumar-profile.jpg` in the `public/` directory
2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```
3. **Run the resize script**:
   ```bash
   node resize-profile.js
   ```

## Image Requirements

- **Format**: JPG or PNG
- **Size**: Any size (will be automatically resized to 128x128 pixels)
- **Aspect ratio**: Any (will be cropped to square for optimal display)

## What the Script Does

✅ **Resizes image** to 128x128 pixels (optimal for sidebar)  
✅ **Maintains quality** with 90% JPEG compression  
✅ **Crops to square** using center positioning  
✅ **Updates Sidebar component** to use the resized image  
✅ **Creates backup** - original file is preserved  

## Current Changes Made

✅ **Name updated**: Changed from "Eden Marco" to "Chandrakumar N"  
✅ **Profile picture path updated**: Now points to `/chandrakumar-profile-resized.jpg`  
✅ **Alt text updated**: Shows "Chandrakumar N" for accessibility  
✅ **Resize script created**: `resize-profile.js`  
✅ **Sharp dependency added**: For image processing  

## File Locations

- **Sidebar component**: `src/components/Sidebar.js` (lines 58-66)
- **Original profile picture**: `public/chandrakumar-profile.jpg`
- **Resized profile picture**: `public/chandrakumar-profile-resized.jpg`
- **Resize script**: `resize-profile.js`

Once you add the profile picture file and run the resize script, your name and photo will appear in the sidebar of the application. 