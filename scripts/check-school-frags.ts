import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run() {
  const frags = await prisma.aIFragment.findMany({
    where: { fragmentId: { startsWith: 'school_' } },
    select: { fragmentId: true, name: true }
  });
  console.log('School fragments in DB:');
  frags.forEach(f => console.log(`  ${f.fragmentId} - ${f.name}`));

  const schools = await prisma.schoolInfo.findMany({
    select: { sc: true, name: true }
  });
  console.log('\nSchools in SchoolInfo:');
  schools.forEach(s => console.log(`  school_${s.sc} - ${s.name}`));

  await prisma.$disconnect();
}

run();
