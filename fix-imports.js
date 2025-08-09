const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to recursively find all .tsx files
function findTsxFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      findTsxFiles(fullPath, files);
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Function to fix import paths in a file
function fixImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix DashboardLayout imports
    const dashboardLayoutRegex = /import\s+DashboardLayout\s+from\s+['"](\.\.\/)*components\/layouts\/DashboardLayout['"]/g;
    if (dashboardLayoutRegex.test(content)) {
      content = content.replace(dashboardLayoutRegex, (match, relativePath) => {
        const depth = (relativePath || '').split('../').length - 1;
        const newPath = '../'.repeat(depth) + 'app/components/layouts/DashboardLayout';
        modified = true;
        return `import DashboardLayout from '${newPath}'`;
      });
    }
    
    // Fix DashboardMenus imports
    const dashboardMenusRegex = /import\s+\{([^}]+)\}\s+from\s+['"](\.\.\/)*components\/layouts\/DashboardMenus['"]/g;
    content = content.replace(dashboardMenusRegex, (match, imports, relativePath) => {
      const depth = (relativePath || '').split('../').length - 1;
      const newPath = '../'.repeat(depth) + 'app/components/layouts/DashboardMenus';
      modified = true;
      return `import {${imports}} from '${newPath}'`;
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Fixed imports in: ${filePath}`);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
const frontendDir = path.join(__dirname, 'frontend', 'src');
const tsxFiles = findTsxFiles(frontendDir);

console.log(`Found ${tsxFiles.length} TypeScript files`);

let fixedCount = 0;
for (const file of tsxFiles) {
  if (fixImportsInFile(file)) {
    fixedCount++;
  }
}

console.log(`\nFixed imports in ${fixedCount} files`);
console.log('Import path fixes completed!');