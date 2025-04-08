const fs = require('fs');
const path = require('path');

// Function to copy a file
function copyFile(source, destination) {
  const destDir = path.dirname(destination);
  
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  // Copy the file
  fs.copyFileSync(source, destination);
  console.log(`Copied: ${source} -> ${destination}`);
}

// Function to copy a directory recursively
function copyDirectory(source, destination) {
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }
  
  // Read the source directory
  const files = fs.readdirSync(source);
  
  // Copy each file or directory
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    
    if (fs.lstatSync(sourcePath).isDirectory()) {
      // If it's a directory, copy it recursively
      copyDirectory(sourcePath, destPath);
    } else {
      // If it's a file, copy it
      copyFile(sourcePath, destPath);
    }
  });
}

// Copy files from public to dist
const publicDir = path.resolve(__dirname, '../public');
const distDir = path.resolve(__dirname, '../dist');

// Copy index.html and manifest.json
copyFile(
  path.join(publicDir, 'index.html'),
  path.join(distDir, 'index.html')
);

copyFile(
  path.join(publicDir, 'manifest.json'),
  path.join(distDir, 'manifest.json')
);

// Copy icons directory
copyDirectory(
  path.join(publicDir, 'icons'),
  path.join(distDir, 'icons')
);

console.log('All files copied successfully!'); 