const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true
      },
      orderBy: {
        role: 'asc'
      }
    });

    console.log('\n=== CURRENT USERS IN DATABASE ===\n');
    
    users.forEach((user, index) => {
      console.log(`${index + 1}. ${user.firstName} ${user.lastName}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Active: ${user.isActive}`);
      console.log('   ---');
    });

    console.log(`\nTotal users: ${users.length}`);
    
    // Check for Commission Admin specifically
    const commissionAdmin = users.find(user => user.role === 'COMMISSION_ADMIN');
    if (commissionAdmin) {
      console.log('\n✅ Commission Admin user found!');
    } else {
      console.log('\n❌ Commission Admin user NOT found!');
    }
    
  } catch (error) {
    console.error('Error checking users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();