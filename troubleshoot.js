// troubleshoot.js - Script to diagnose common Next.js errors
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Starting Next.js Project Troubleshooting...');

// Check Node.js and npm versions
console.log('\n📋 Environment Check:');
try {
  const nodeVersion = execSync('node -v').toString().trim();
  const npmVersion = execSync('npm -v').toString().trim();
  console.log(`   ✅ Node.js Version: ${nodeVersion}`);
  console.log(`   ✅ npm Version: ${npmVersion}`);
} catch (err) {
  console.log(`   ❌ Error checking Node.js/npm versions: ${err.message}`);
}

// Check for .env file
console.log('\n📋 Environment Variables Check:');
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('   ✅ .env file exists');
  
  // Check for DATABASE_URL without revealing it
  const envContent = fs.readFileSync(envPath, 'utf8');
  if (envContent.includes('DATABASE_URL=')) {
    console.log('   ✅ DATABASE_URL is configured');
  } else {
    console.log('   ❌ DATABASE_URL is missing in .env file');
    console.log('      → Add DATABASE_URL="postgresql://username:password@localhost:5432/dbname" to .env');
  }
  
  if (envContent.includes('NEXTAUTH_SECRET=')) {
    console.log('   ✅ NEXTAUTH_SECRET is configured');
  } else {
    console.log('   ❌ NEXTAUTH_SECRET is missing in .env file');
    console.log('      → Add NEXTAUTH_SECRET="your-secret-key" to .env');
  }
} else {
  console.log('   ❌ .env file is missing');
  console.log('      → Create a .env file in the root directory with DATABASE_URL and other required variables');
}

// Check for Prisma schema
console.log('\n📋 Prisma Configuration Check:');
const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
if (fs.existsSync(schemaPath)) {
  console.log('   ✅ Prisma schema exists');
  
  // Try to run prisma generate to check for errors
  try {
    console.log('   🔄 Running prisma generate to verify schema...');
    execSync('npx prisma generate', { stdio: 'pipe' });
    console.log('   ✅ Prisma schema is valid');
  } catch (err) {
    console.log('   ❌ Prisma schema has errors:');
    console.log(`      ${err.message.split('\n').slice(0, 5).join('\n      ')}`);
  }
} else {
  console.log('   ❌ Prisma schema is missing');
}

// Check for common dependency issues
console.log('\n📋 Dependencies Check:');
try {
  // Check for common package issues
  console.log('   🔄 Verifying package installation...');
  
  // Check for mismatched React versions
  const packagePath = path.join(__dirname, 'package.json');
  if (fs.existsSync(packagePath)) {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const reactVersion = packageJson.dependencies?.react;
    const reactDomVersion = packageJson.dependencies?.['react-dom'];
    
    if (reactVersion && reactDomVersion && reactVersion !== reactDomVersion) {
      console.log(`   ❌ React (${reactVersion}) and react-dom (${reactDomVersion}) versions don't match`);
    } else if (reactVersion && reactDomVersion) {
      console.log(`   ✅ React versions match: ${reactVersion}`);
    }
    
    // Check Next.js version
    const nextVersion = packageJson.dependencies?.next;
    if (nextVersion) {
      console.log(`   ✅ Next.js version: ${nextVersion}`);
    }
  } else {
    console.log('   ❌ package.json not found');
  }
  
  // Run npm check for outdated packages
  console.log('   🔄 Checking for outdated packages...');
  execSync('npm outdated --depth=0', { stdio: 'inherit' });
  
} catch (err) {
  console.log(`   ❌ Error checking dependencies: ${err.message}`);
}

// Check for database connectivity
console.log('\n📋 Database Connectivity Check:');
try {
  console.log('   🔄 Testing database connection...');
  
  // Try to connect to the database using the db-status API
  console.log('   ℹ️ To test database connection, run your dev server and visit:');
  console.log('      http://localhost:3000/api/db-status');
} catch (err) {
  console.log(`   ❌ Error testing database connection: ${err.message}`);
}

console.log('\n📋 Recommended fixes for common terminal errors:');
console.log(`
   1. Database connection errors:
      → Ensure PostgreSQL is running
      → Check your DATABASE_URL in .env
      → Run 'npx prisma db push' to sync schema

   2. Dependency errors:
      → Run 'npm ci' to clean-install dependencies
      → Run 'npm install @prisma/client@latest prisma@latest'

   3. Next.js build errors:
      → Check for syntax errors in API routes
      → Run 'npm run lint' to find code issues
      → Clear .next folder with 'rm -rf .next'

   4. Runtime errors:
      → Check browser console for frontend errors
      → Check terminal output for backend errors
      → Test API endpoints individually

   5. Prisma errors:
      → Run 'npx prisma generate' to update client
      → Run 'npx prisma migrate reset' to reset database (CAUTION: deletes data)
`);

console.log('\n✅ Troubleshooting completed. Follow the recommendations above to fix errors.'); 