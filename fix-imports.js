const fs = require('fs');
const path = require('path');

function fixImports(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixImports(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Fix"@radix-ui imports
      content = content.replace(/@radix-ui\/([^@"]+)@[^"]+"/g, '"@radix-ui/$1"');
      
      // Fix class-variance-authority imports  
      content = content.replace(/class-variance-authority@[^"]+/g, 'class-variance-authority');
      
      // Fix lucide-react imports
      content = content.replace(/lucide-react@[^"]+/g, 'lucide-react');
      
      // Fix sonner imports (already done but just in case)
      content = content.replace(/sonner@[^"]+/g, 'sonner');
      
      fs.writeFileSync(filePath, content);
      console.log(`Fixed: ${filePath}`);
    }
  });
}

fixImports('./src');
console.log('All imports fixed!');
