/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { faker } = require('@faker-js/faker');
function createComic() {
  return {
    comicID: faker.number.int({min:1,max:10000,}),
    comicName: faker.person.fullName(),
    link: faker.internet.url(),
    chapter: faker.number.int({min:1,max:10000,}),
    favorite: faker.number.int({min: 0,max: 1,}),
  };
}
/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.seed = async function (knex) {
await knex('comics').del();
await knex('comics').insert(Array(100).fill().map(createComic));
};
