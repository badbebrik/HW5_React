import "dotenv/config";
import mongoose from "mongoose";
import Category from "../models/Category";
import Product from "../models/Product";

interface CategoryData {
  id: number;
  name: string;
}

interface ProductData {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  quantity: number;
  unit: string;
  price: number;
  imageUrl: string;
}

const categoriesData: CategoryData[] = [
  { id: 1, name: "Нижнее белье" },
  { id: 2, name: "Игрушки" },
  { id: 3, name: "Настольные игры" },
  { id: 4, name: "Цифровые товары" },
];

const productsData: ProductData[] = [
  {
    id: 1,
    name: "Трусы",
    description:
      "Шикарные трусы с бабочкой на попе. Состав: 100% хлопок. Цвет: розовый.",
    categoryId: 1,
    quantity: 10,
    unit: "шт",
    price: 499,
    imageUrl: "",
  },
  {
    id: 2,
    name: "Кубик Рубэг",
    description:
      "Кубик Рубэг - это головоломка, которая состоит из 27 маленьких кубиков, соединенных между собой. Вращая разные слои, можно собрать кубик в исходное положение.",
    categoryId: 2,
    quantity: 3,
    unit: "шт",
    price: 799,
    imageUrl:
      "https://avatars.mds.yandex.net/i?id=893805eadb9c56e9bd05db2d0b4d7717_l-8411661-images-thumbs&n=13",
  },
  {
    id: 3,
    name: "Спиннер",
    description:
      "Супер классный спиннер, который поможет вам сконцентрироваться и расслабиться. Состав: пластик. Цвет: синий.",
    categoryId: 2,
    quantity: 5,
    unit: "шт",
    price: 299,
    imageUrl: "https://cdn1.ozone.ru/s3/multimedia-5/6734098445.jpg",
  },
  {
    id: 4,
    name: "Лапка антистресс",
    description:
      "Стань лучшим лапкером в мире! Состав: пластик. Цвет: розовый.",
    categoryId: 2,
    quantity: 100,
    unit: "шт",
    price: 199,
    imageUrl: "https://cdn1.ozone.ru/s3/multimedia-h/6231918929.jpg",
  },
  {
    id: 5,
    name: "Бункер",
    description: "Бункер» — дискуссионная игра о выживании после апокалипсиса.",
    categoryId: 3,
    quantity: 1,
    unit: "шт",
    price: 1599,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-3/wc1000/6834912303.jpg",
  },
  {
    id: 6,
    name: "Монополия",
    description:
      "Классическая экономическая стратегия для всей семьи. Захватывайте территории, стройте дома и побеждайте конкурентов.",
    categoryId: 3,
    quantity: 12,
    unit: "шт",
    price: 1999,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-v/wc1000/6036360715.jpg",
  },
  {
    id: 7,
    name: "Эволюция",
    description:
      "Игра на выживание, в которой участники создают свои собственные виды и пытаются выжить в условиях жестокой природы.",
    categoryId: 3,
    quantity: 8,
    unit: "шт",
    price: 1399,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-1-9/wc1000/7058630493.jpg",
  },
  {
    id: 8,
    name: "Уно",
    description:
      "Карточная игра, в которой участники пытаются избавиться от всех карт в руке, следуя правилам и цветам.",
    categoryId: 3,
    quantity: 10,
    unit: "шт",
    price: 799,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-c/wc1000/6466460832.jpg",
  },
  {
    id: 9,
    name: "Имаджинариум",
    description:
      "Игра на воображение, в которой участники разыгрывают карты с ассоциациями и угадывают чужие задумки.",
    categoryId: 3,
    quantity: 15,
    unit: "шт",
    price: 1699,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-f/wc1000/6615454047.jpg",
  },
  {
    id: 10,
    name: "Дженга",
    description:
      "Веселая игра на ловкость и нервы. Стройте башню из деревянных блоков и старайтесь не разрушить её.",
    categoryId: 3,
    quantity: 20,
    unit: "шт",
    price: 1299,
    imageUrl: "https://ir.ozone.ru/s3/multimedia-k/wc1000/6846472532.jpg",
  },
  {
    id: 11,
    name: "Аккаунт в Minecraft",
    description: "Лицензия на игру Minecraft. Смена почты и пароля включена.",
    categoryId: 4,
    quantity: 20,
    unit: "шт",
    price: 1999,
    imageUrl:
      "https://avatars.mds.yandex.net/i?id=1743831aa837762afddb66b64b67ac38_l-10555283-images-thumbs&n=13",
  },
  {
    id: 12,
    name: "Тест-карточка",
    description:
      "Карточка с длинным описанием для проверки скролла. Карточка с длинным описанием для проверки скролла. Карточка с длинным описанием для проверки скролла. Карточка с длинным описанием для проверки скролла. Карточка с длинным описанием для проверки скролла. Карточка с длинным описанием для проверки скролла. Карточка с длинным описанием для проверки скролла. Карточка с длинным описанием для проверки скролла. v Карточка с длинным описанием для проверки скролла. Карточка с длинным описанием для проверки скролла. Карточка с длинным описанием для проверки скролла. Карточка с длинным описанием для проверки скролла. Карточка с длинным описанием для проверки скролла. Карточка с длинным описанием для проверки скролла. Карточка с длинным описанием для проверки скролла. Карточка с длинным описанием для проверки скролла. ",
    categoryId: 2,
    quantity: 1,
    unit: "шт",
    price: 99,
    imageUrl: "",
  },
];

async function seedDatabase() {
  try {
    const dbUri = process.env.DB_URI || "mongodb://127.0.0.1:27017/mywarehouse";
    await mongoose.connect(dbUri);
    console.log("MongoDB connected!");

    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log("Collections cleared.");

    const createdCategories = await Category.insertMany(
      categoriesData.map((cat) => ({
        name: cat.name,
      }))
    );
    console.log(`Inserted ${createdCategories.length} categories.`);

    const catIdToMongoId: Record<number, string> = {};
    for (let i = 0; i < createdCategories.length; i++) {
      const originalId = categoriesData[i].id;
      const mongoId = createdCategories[i]._id.toString();
      catIdToMongoId[originalId] = mongoId;
    }

    const preparedProducts = productsData.map((p) => ({
      name: p.name,
      description: p.description,
      category: catIdToMongoId[p.categoryId],
      quantity: p.quantity,
      price: p.price,
      unit: p.unit,
      imageUrl: p.imageUrl,
    }));

    const createdProducts = await Product.insertMany(preparedProducts);
    console.log(`Inserted ${createdProducts.length} products.`);

    await mongoose.connection.close();
    console.log("Database seeded successfully! Connection closed.");
  } catch (error) {
    console.error("Error seeding database:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedDatabase();
