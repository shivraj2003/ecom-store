const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();

async function fetchUnsplashImage(query) {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: { query, per_page: 1 },
      headers: {
        Authorization: 'Client-ID _aKe63eaVlDMwLSpQWEr93MPS1o-P-Y9orz6pn_U5E4' // Your Unsplash access key
      }
    });

    if (response.data.results.length > 0) {
      return response.data.results[0].urls.small;
    } else {
      throw new Error('No image found');
    }
  } catch (error) {
    console.error(`Error fetching image for ${query}: ${error.message}`);
    return null;
  }
}

async function main() {
  const categories = [];
  const categoryNames = ["phone", "laptop", "headphone", "tablet", "powerbanks"];

  // Create categories with images
  for (const name of categoryNames) {
    const image = await fetchUnsplashImage(name);
    
    if (image) {
      const category = await prisma.category.create({
        data: {
          name,
          image,
        },
      });
      categories.push(category);
    } else {
      console.error(`Skipping category ${name} due to image fetch error`);
    }
  }

  // Create products with relevant images
  const products = [];
  for (const category of categories) {
    for (let i = 0; i < 2; i++) { // Create 2 products per category
      const image = await fetchUnsplashImage(category.name);
      if (image) {
        const product = await prisma.product.create({
          data: {
            name: `${category.name} Product ${i + 1}`,
            description: `Description for ${category.name} product ${i + 1}`,
            price: Math.floor(Math.random() * 100) + 10, // Random price between 10 and 100
            images: [image], // Set product image
            categoryId: category.id,
          },
        });
        products.push(product);
      } else {
        console.error(`Skipping product ${category.name} Product ${i + 1} due to image fetch error`);
      }
    }
  }

  // Example user seeding
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
      },
    });
    users.push(user);
  }

  // Example order seeding
  const orders = [];
  for (let i = 0; i < 5; i++) {
    const order = await prisma.order.create({
      data: {
        isPaid: false,
        addressInfo: {
          create: {
            address: `Address ${i + 1}`,
            city: `City ${i + 1}`,
            state: `State ${i + 1}`,
            country: `Country ${i + 1}`,
            pinCode: Math.floor(Math.random() * 90000) + 10000, // Random pin code
            PhoneNo: Math.floor(Math.random() * 9000000000) + 1000000000, // Random phone number
          },
        },
        OrderItem: {
          create: {
            quantity: Math.floor(Math.random() * 5) + 1, // Random quantity between 1 and 5
            product: {
              connect: {
                id: products[Math.floor(Math.random() * products.length)].id
              }
            }
          }
        }
      }
    });
    orders.push(order);
  }

  console.log('Seeded categories:', categories);
  console.log('Seeded products:', products);
  console.log('Seeded users:', users);
  console.log('Seeded orders:', orders);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

