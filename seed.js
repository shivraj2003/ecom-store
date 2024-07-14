// This is a seed file for the generating sample data for the ecom app

const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  // Generate sample categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Watches',
        image: faker.image.urlLoremFlickr({ category: 'watch' }),
      },
    }),
    prisma.category.create({
      data: {
        name: 'Phones',
        image: faker.image.urlLoremFlickr({ category: 'phone' }),
      },
    }),
    prisma.category.create({
      data: {
        name: 'Tablets',
        image: faker.image.urlLoremFlickr({ category: 'tablet' }),
      },
    }),
    prisma.category.create({
      data: {
        name: 'Laptops',
        image: faker.image.urlLoremFlickr({ category: 'laptop' }),
      },
    }),
    prisma.category.create({
      data: {
        name: 'Headphones',
        image: faker.image.urlLoremFlickr({ category: 'headphone' }),
      },
    }),
  ]);

  // Fixed set of images for tech products using faker
  const productImages = {
    Watches: [
      faker.image.urlLoremFlickr({ category: 'watch' }),
      faker.image.urlLoremFlickr({ category: 'watch' }),
    ],
    Phones: [
      faker.image.urlLoremFlickr({ category: 'phone' }),
      faker.image.urlLoremFlickr({ category: 'phone' }),
    ],
    Tablets: [
      faker.image.urlLoremFlickr({ category: 'tablet' }),
      faker.image.urlLoremFlickr({ category: 'tablet' }),
    ],
    Laptops: [
      faker.image.urlLoremFlickr({ category: 'laptop' }),
      faker.image.urlLoremFlickr({ category: 'laptop' }),
    ],
    Headphones: [
      faker.image.urlLoremFlickr({ category: 'headphone' }),
      faker.image.urlLoremFlickr({ category: 'headphone' }),
    ],
  };

  // Generate sample products
  for (let i = 0; i < 10; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.number.int({ min: 10, max: 1000 }),
        images: productImages[category.name],
        views: faker.number.int({ min: 1, max: 1000 }),
        categoryId: category.id,
      },
    });
  }

  console.log('Sample products created!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
