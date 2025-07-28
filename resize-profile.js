const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function resizeProfilePicture() {
  const inputPath = path.join(__dirname, 'public', 'chandrakumar-profile.jpg');
  const outputPath = path.join(__dirname, 'public', 'chandrakumar-profile-resized.jpg');
  
  try {
    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
      console.log('❌ Profile picture not found at:', inputPath);
      console.log('Please save your profile picture as "chandrakumar-profile.jpg" in the public/ directory');
      return;
    }

    // Resize the image to 128x128 pixels (optimal for sidebar)
    await sharp(inputPath)
      .resize(128, 128, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 90 })
      .toFile(outputPath);

    console.log('✅ Profile picture resized successfully!');
    console.log('📁 Original:', inputPath);
    console.log('📁 Resized:', outputPath);
    console.log('📏 Size: 128x128 pixels');
    
    // Update the Sidebar component to use the resized image
    const sidebarPath = path.join(__dirname, 'src', 'components', 'Sidebar.js');
    let sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
    
    sidebarContent = sidebarContent.replace(
      'src="/chandrakumar-profile.jpg"',
      'src="/chandrakumar-profile-resized.jpg"'
    );
    
    fs.writeFileSync(sidebarPath, sidebarContent);
    console.log('✅ Updated Sidebar component to use resized image');
    
  } catch (error) {
    console.error('❌ Error resizing image:', error.message);
  }
}

// Run the resize function
resizeProfilePicture(); 