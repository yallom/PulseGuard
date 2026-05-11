import { CaregiverType, Gender } from '@prisma/client'
import prisma from './lib/prisma'
import { faker } from '@faker-js/faker'

const CAREGIVERS = 5
const USERS_PER_CAREGIVER = 4
const RECORDS_PER_USER = 20
const BRACELETS_PER_USER = 1

function randomEnum<T extends Record<string, string>>(e: T): T[keyof T] {
  const values = Object.values(e) as T[keyof T][]
  return faker.helpers.arrayElement(values)
}

function timestamps(deleted = false) {
  const createDate = faker.date.past({ years: 2 })
  const updateDate = faker.date.between({ from: createDate, to: new Date() })
  return { createDate, updateDate, deleted }
}

async function seed() {
  console.log('🌱 Seeding database...')

  await prisma.record.deleteMany()
  await prisma.bracelet.deleteMany()
  await prisma.user.deleteMany()
  await prisma.caregiver.deleteMany()

  for (let i = 0; i < CAREGIVERS; i++) {
    const caregiver = await prisma.caregiver.create({
      data: {
        name: faker.company.name(),
        contact: faker.phone.number(),
        type: randomEnum(CaregiverType),
        ...timestamps(),
      },
    })

    for (let j = 0; j < USERS_PER_CAREGIVER; j++) {
      const gender = randomEnum(Gender)
      const fakerGender = gender === 'male' ? 'male' : gender === 'female' ? 'female' : undefined

      const user = await prisma.user.create({
        data: {
          idCaregiver: caregiver.id,
          contactCaregiver: faker.phone.number(),
          name: faker.person.fullName({ sex: fakerGender }),
          birth_date: faker.date.birthdate({ min: 60, max: 95, mode: 'age' }),
          gender,
          height: faker.number.int({ min: 150, max: 195 }),
          weight: faker.number.int({ min: 45, max: 110 }),
          lang: faker.helpers.arrayElement(['en', 'pt', 'es', 'fr', 'de']),
          avatar: faker.image.avatar(),
          ...timestamps(),
        },
      })

      for (let k = 0; k < BRACELETS_PER_USER; k++) {
        await prisma.bracelet.create({
          data: {
            id: faker.string.alphanumeric(12).toUpperCase(),
            idUser: user.id,
            fabrication_date: faker.date.past({ years: 3 }),
            ...timestamps(),
          },
        })
      }

      const recordBase = faker.date.recent({ days: 30 })
      for (let r = 0; r < RECORDS_PER_USER; r++) {
        await prisma.record.create({
          data: {
            idUser: user.id,
            timestamp: faker.date.between({
              from: recordBase,
              to: new Date(),
            }),
            heart_rate: faker.number.int({ min: 45, max: 130 }),
            oxigen: faker.number.int({ min: 88, max: 100 }),
            accel: faker.number.int({ min: 0, max: 50 }),
            ...timestamps(),
          },
        })
      }
    }
  }

  const counts = {
    caregivers: await prisma.caregiver.count(),
    users: await prisma.user.count(),
    bracelets: await prisma.bracelet.count(),
    records: await prisma.record.count(),
  }

  console.log('✅ Done:', counts)
}

seed()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())