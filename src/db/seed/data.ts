import { faker, SexType } from "@faker-js/faker";
import { degrees, specialties, usCities } from "../../const";

const generateNumber = (upTo: number) => {
  return Math.floor(Math.random() * upTo);
};

const generateDegree = (degrees: string[]) => {
  const randomIdx = generateNumber(degrees.length);
  return degrees[randomIdx];
};

const generateCity = (cities: string[]) => {
  const randomIdx = generateNumber(cities.length);
  return cities[randomIdx];
};

const generateSpeciality = (specialties: string[]) => {
  let random1 = Math.floor(Math.random() * specialties.length); // 12

  let random2 =
    Math.floor(Math.random() * (specialties.length - random1)) + random1 + 1;

  const difference = random2 - random1;

  if (difference >= 5) {
    random2 = random1 + 3;
  }

  return specialties.slice(random1, random2);
};

const generateYearsOfExperience = () => {
  return generateNumber(20) + 1;
};

const generateAdvocateDate = () => {
  const data = [];

  for (let i = 0; i < 500; i++) {
    const sex = faker.person.sex() as SexType;

    const person = {
      firstName: faker.person.firstName(sex),
      lastName: faker.person.lastName(sex),
      city: generateCity(usCities),
      degree: generateDegree(degrees),
      specialties: generateSpeciality(specialties),
      yearsOfExperience: generateYearsOfExperience(),
      phoneNumber: Number(
        faker.phone.number({ style: "international" }).slice(2)
      ),
      avatar: faker.image.personPortrait({ sex: sex, size: 128 }),
    };
    data.push(person);
  }

  return data;
};

const advocateData = generateAdvocateDate();
export { advocateData };
