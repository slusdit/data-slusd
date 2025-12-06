import prisma from '../lib/db';

async function main() {
  // Query SchoolInfo
  const schools = await prisma.schoolInfo.findMany();
  console.log('Schools:', JSON.stringify(schools, null, 2));

  // Query a sample user to see their permissions
  const users = await prisma.user.findMany({
    take: 3,
    include: {
      userRole: true,
      UserSchool: {
        include: {
          school: true
        }
      },
      UserClass: true
    }
  });
  console.log('\nSample Users with Roles/Schools:', JSON.stringify(users, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
