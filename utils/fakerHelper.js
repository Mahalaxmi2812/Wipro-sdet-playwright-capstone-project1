import { faker } from '@faker-js/faker';

export const testData = {
  employee: () => ({
    firstName: faker.person.firstName(),
    lastName:  faker.person.lastName(),
    middleName: faker.person.middleName(),
  }),

  username: () => faker.internet.username().slice(0, 10),
  password: () => faker.internet.password({ length: 10 }),

  jobTitle: () => faker.person.jobTitle().slice(0, 50),

  file: {
    validImage:   'fixtures/sample.png',
    validPdf:     'fixtures/sample.pdf',
    invalidType:  'fixtures/sample.exe',
  },
};
