import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("🌱 Starting database seeding...");
    console.log("🧹 Cleaning existing data...");
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.brand.deleteMany();
    await prisma.user.deleteMany();

    console.log("🏷️ Seeding brands...");
    await prisma.brand.createMany({
      data: [
        {
          name: "ASUS ROG",
          logoUrl: "https://i.ibb.co/5XXB0RBf/rog.png",
        },
        {
          name: "Logitech",
          logoUrl: "https://i.ibb.co/zhgxWbmk/logitech.png",
        },
        {
          name: "JBL",
          logoUrl: "https://i.ibb.co/B26WF4ZJ/jbl.png",
        },
        {
          name: "AOC",
          logoUrl: "https://i.ibb.co/zVmzw0v1/aoc.png",
        },
        {
          name: "Razer",
          logoUrl: "https://i.ibb.co/gbRHf4Nm/razer.png",
        },
        {
          name: "Rexus",
          logoUrl: "https://i.ibb.co/SwwP5R9v/rexus.png",
        },
      ],
    });

    console.log("📁 Seeding categories...");
    await prisma.category.createMany({
      data: [
        {
          name: "Mouse",
          description:
            "Explore our diverse selection of electronic mice for sale, featuring cutting-edge technology, ergonomic designs, and unbeatable prices. Shop now!",
          imageUrl: "https://i.ibb.co/rfGYnLBr/front.png",
          iconUrl: "https://i.ibb.co/Fp6YD8Q/mouse.png",
        },
        {
          name: "Monitor",
          description:
            "Discover our wide range of high-quality monitors with stunning resolution, vibrant colors, and sleek designs—perfect for work, gaming, and entertainment.",
          imageUrl: "https://i.postimg.cc/d15sjGDd/front.avif",
          iconUrl: "https://i.ibb.co/fdjDsZHq/monitor.png",
        },
        {
          name: "Headphone",
          description:
            "Experience crystal-clear sound and immersive audio with our premium headphones, designed for comfort, style, and top-notch performance.",
          imageUrl: "https://i.ibb.co/RpSPWgjX/WH1000-XM6-front.webp",
          iconUrl: "https://i.ibb.co/23xs5hkC/headphone.png",
        },
        {
          name: "Keyboard",
          description:
            "Upgrade your setup with our collection of keyboards, featuring responsive keys, durable builds, and customizable options for every user.",
          imageUrl: "https://i.ibb.co/JShFwP4/front.webp",
          iconUrl: "https://i.ibb.co/mrntWgX7/keyboard.png",
        },
        {
          name: "Webcam",
          description:
            "Stay connected with our high-definition webcams, delivering sharp video quality and easy setup for streaming, meetings, and online chats.",
          imageUrl: "https://i.ibb.co/jZw11YgT/category.png",
          iconUrl: "https://i.ibb.co/60b7h7XF/webcam.png",
        },
      ],
    });

    console.log("🛍️ Seeding products...");
    const products = [
      {
        name: "ASUS ROG Gladius III",
        description:
          "Ergonomiczna mysz gamingowa z przełącznikami optycznymi i szybkim czujnikiem.",
        price: 139.99,
        stock: 20,
        images: [
          "https://i.ibb.co/V06TPCDT/new.png",
          "https://i.ibb.co/7NKzJ13J/side.png",
          "https://i.ibb.co/rfGYnLBr/front.png",
        ],
        brandId: 1,
        categoryId: 1,
      },
      {
        name: "ASUS ROG Keris Wireless",
        description: "Lekka bezprzewodowa myszka z precyzyjnym sensorem i RGB.",
        price: 159.99,
        stock: 18,
        images: [
          "https://i.ibb.co/V06TPCDT/new.png",
          "https://i.ibb.co/7NKzJ13J/side.png",
          "https://i.ibb.co/rfGYnLBr/front.png",
        ],
        brandId: 1,
        categoryId: 1,
      },
      {
        name: "ASUS ROG Swift PG259QN",
        description:
          "24.5-inch gaming monitor with 360Hz refresh rate and NVIDIA G-SYNC support.",
        price: 699.99,
        stock: 10,
        images: [
          "https://i.postimg.cc/KzGcT0cx/back.avif",
          "https://i.postimg.cc/d15sjGDd/front.avif",
          "https://i.postimg.cc/NFLgJLrn/rotate.avif",
        ],
        brandId: 1,
        categoryId: 2,
      },
      {
        name: "ASUS ROG Strix XG27AQ",
        description:
          "27-calowy monitor QHD z odświeżaniem 170Hz, czasem reakcji 1ms i HDR.",
        price: 799.99,
        stock: 11,
        images: [
          "https://i.postimg.cc/KzGcT0cx/back.avif",
          "https://i.postimg.cc/d15sjGDd/front.avif",
          "https://i.postimg.cc/NFLgJLrn/rotate.avif",
        ],
        brandId: 1,
        categoryId: 2,
      },
      {
        name: "ASUS ROG Fusion II 500",
        description:
          "Słuchawki gamingowe z dźwiękiem 7.1, mikrofonem i podświetleniem.",
        price: 219.99,
        stock: 10,
        images: [
          "https://i.ibb.co/FLSFTWqm/WH1000-XM6.webp",
          "https://i.ibb.co/RpSPWgjX/WH1000-XM6-front.webp",
          "https://i.ibb.co/Kc6J17PP/WH1000-XM6-side.webp",
        ],
        brandId: 1,
        categoryId: 3,
      },
      {
        name: "ASUS ROG Delta S",
        description:
          "Hi-Res słuchawki z cyfrowym wzmacniaczem i odłączanym mikrofonem.",
        price: 269.99,
        stock: 12,
        images: [
          "https://i.ibb.co/FLSFTWqm/WH1000-XM6.webp",
          "https://i.ibb.co/RpSPWgjX/WH1000-XM6-front.webp",
          "https://i.ibb.co/Kc6J17PP/WH1000-XM6-side.webp",
        ],
        brandId: 1,
        categoryId: 3,
      },
      {
        name: "ASUS ROG Claymore II",
        description:
          "Modułowa klawiatura mechaniczna RGB z odłączanym numpadem.",
        price: 299.99,
        stock: 13,
        images: [
          "https://i.ibb.co/PZwb8WZc/side.webp",
          "https://i.ibb.co/9mqQPT0S/rotate.webp",
          "https://i.ibb.co/JShFwP4/front.webp",
        ],
        brandId: 1,
        categoryId: 4,
      },
      {
        name: "ASUS ROG Strix Scope RX",
        description:
          "Klawiatura mechaniczna z czerwonymi przełącznikami optycznymi i wsparciem Aura Sync.",
        price: 189.99,
        stock: 14,
        images: [
          "https://i.ibb.co/PZwb8WZc/side.webp",
          "https://i.ibb.co/9mqQPT0S/rotate.webp",
          "https://i.ibb.co/JShFwP4/front.webp",
        ],
        brandId: 1,
        categoryId: 4,
      },
      {
        name: "ASUS ROG Eye",
        description:
          "Kamera Full HD z mikrofonem i redukcją szumów do streamingu.",
        price: 149.99,
        stock: 8,
        images: [
          "https://i.ibb.co/v47pMzH5/back.png",
          "https://i.ibb.co/hxvHzDmy/front.png",
          "https://i.ibb.co/spXhmSgK/rotate.png",
        ],
        brandId: 1,
        categoryId: 5,
      },
      {
        name: "ASUS ROG StreamCam Pro",
        description:
          "Webcam 60 fps, rozdzielczość 1080p, automatyczna regulacja światła.",
        price: 189.99,
        stock: 7,
        images: [
          "https://i.ibb.co/v47pMzH5/back.png",
          "https://i.ibb.co/hxvHzDmy/front.png",
          "https://i.ibb.co/spXhmSgK/rotate.png",
        ],
        brandId: 1,
        categoryId: 5,
      },
      {
        name: "Logitech G502 HERO",
        description:
          "High-precision gaming mouse with customizable RGB lighting and advanced HERO sensor.",
        price: 129.99,
        stock: 22,
        images: [
          "https://i.ibb.co/V06TPCDT/new.png",
          "https://i.ibb.co/7NKzJ13J/side.png",
          "https://i.ibb.co/rfGYnLBr/front.png",
        ],
        brandId: 2,
        categoryId: 1,
      },
      {
        name: "Logitech G Pro X Superlight",
        description:
          "Wireless gaming mouse with ultra-lightweight design and high-precision HERO sensor.",
        price: 149.99,
        stock: 25,
        images: [
          "https://i.ibb.co/V06TPCDT/new.png",
          "https://i.ibb.co/7NKzJ13J/side.png",
          "https://i.ibb.co/rfGYnLBr/front.png",
        ],
        brandId: 2,
        categoryId: 1,
      },
      {
        name: "Logitech UltraView Monitor",
        description:
          "Ultra-clear gaming monitor with HDR support and low response time for competitive gaming.",
        price: 549.99,
        stock: 8,
        images: [
          "https://i.postimg.cc/KzGcT0cx/back.avif",
          "https://i.postimg.cc/d15sjGDd/front.avif",
          "https://i.postimg.cc/NFLgJLrn/rotate.avif",
        ],
        brandId: 2,
        categoryId: 2,
      },
      {
        name: "Logitech Vision Pro",
        description:
          "Fast-response gaming monitor with adjustable RGB lighting and high contrast display.",
        price: 629.99,
        stock: 15,
        images: [
          "https://i.postimg.cc/KzGcT0cx/back.avif",
          "https://i.postimg.cc/d15sjGDd/front.avif",
          "https://i.postimg.cc/NFLgJLrn/rotate.avif",
        ],
        brandId: 2,
        categoryId: 2,
      },
      {
        name: "Logitech G435",
        description:
          "Wireless gaming headset with lightweight design and excellent sound clarity for long sessions.",
        price: 129.99,
        stock: 20,
        images: [
          "https://i.ibb.co/FLSFTWqm/WH1000-XM6.webp",
          "https://i.ibb.co/RpSPWgjX/WH1000-XM6-front.webp",
          "https://i.ibb.co/Kc6J17PP/WH1000-XM6-side.webp",
        ],
        brandId: 2,
        categoryId: 3,
      },
      {
        name: "Logitech Pro X Headset",
        description:
          "High-fidelity gaming headset with detachable mic, DTS:X surround sound, and customizable EQ.",
        price: 159.99,
        stock: 12,
        images: [
          "https://i.ibb.co/FLSFTWqm/WH1000-XM6.webp",
          "https://i.ibb.co/RpSPWgjX/WH1000-XM6-front.webp",
          "https://i.ibb.co/Kc6J17PP/WH1000-XM6-side.webp",
        ],
        brandId: 2,
        categoryId: 3,
      },
      {
        name: "Logitech G915",
        description:
          "Wireless mechanical keyboard with low-profile switches, RGB lighting, and ultra-thin design.",
        price: 249.99,
        stock: 18,
        images: [
          "https://i.ibb.co/PZwb8WZc/side.webp",
          "https://i.ibb.co/9mqQPT0S/rotate.webp",
          "https://i.ibb.co/JShFwP4/front.webp",
        ],
        brandId: 2,
        categoryId: 4,
      },
      {
        name: "Logitech G815",
        description:
          "Slim mechanical keyboard with programmable keys, RGB effects, and tactile switches.",
        price: 199.99,
        stock: 22,
        images: [
          "https://i.ibb.co/PZwb8WZc/side.webp",
          "https://i.ibb.co/9mqQPT0S/rotate.webp",
          "https://i.ibb.co/JShFwP4/front.webp",
        ],
        brandId: 2,
        categoryId: 4,
      },
      {
        name: "Logitech C920 HD Pro",
        description:
          "High-definition webcam with Full HD resolution, dual microphones, and automatic light correction.",
        price: 79.99,
        stock: 30,
        images: [
          "https://i.ibb.co/v47pMzH5/back.png",
          "https://i.ibb.co/hxvHzDmy/front.png",
          "https://i.ibb.co/spXhmSgK/rotate.png",
        ],
        brandId: 2,
        categoryId: 5,
      },
      {
        name: "Logitech StreamCam",
        description:
          "Webcam designed for streaming with crisp 1080p video, auto-focus, and multiple mounting options.",
        price: 99.99,
        stock: 25,
        images: [
          "https://i.ibb.co/v47pMzH5/back.png",
          "https://i.ibb.co/hxvHzDmy/front.png",
          "https://i.ibb.co/spXhmSgK/rotate.png",
        ],
        brandId: 2,
        categoryId: 5,
      },
      {
        name: "JBL Quantum 600 Mouse",
        description:
          "Ergonomic gaming mouse with high-precision sensor and RGB customization.",
        price: 99.99,
        stock: 18,
        images: [
          "https://i.ibb.co/V06TPCDT/new.png",
          "https://i.ibb.co/7NKzJ13J/side.png",
          "https://i.ibb.co/rfGYnLBr/front.png",
        ],
        brandId: 3,
        categoryId: 1,
      },
      {
        name: "JBL Pro Gaming Mouse",
        description:
          "Sleek wireless mouse optimized for esports with low latency and lightweight design.",
        price: 119.99,
        stock: 20,
        images: [
          "https://i.ibb.co/V06TPCDT/new.png",
          "https://i.ibb.co/7NKzJ13J/side.png",
          "https://i.ibb.co/rfGYnLBr/front.png",
        ],
        brandId: 3,
        categoryId: 1,
      },
      {
        name: "JBL Crystal View",
        description:
          "A monitor with crystal-clear image and JBL speakers for the best sound.",
        price: 599.99,
        stock: 7,
        images: [
          "https://i.postimg.cc/KzGcT0cx/back.avif",
          "https://i.postimg.cc/d15sjGDd/front.avif",
          "https://i.postimg.cc/NFLgJLrn/rotate.avif",
        ],
        brandId: 3,
        categoryId: 2,
      },
      {
        name: "JBL Quantum Display",
        description:
          "Gaming monitor with dynamic image and JBL HDR Audio support.",
        price: 699.99,
        stock: 8,
        images: [
          "https://i.postimg.cc/KzGcT0cx/back.avif",
          "https://i.postimg.cc/d15sjGDd/front.avif",
          "https://i.postimg.cc/NFLgJLrn/rotate.avif",
        ],
        brandId: 3,
        categoryId: 2,
      },
      {
        name: "JBL Quantum 800",
        description:
          "Premium headset with JBL QuantumSURROUND, active noise cancellation, and detachable microphone.",
        price: 199.99,
        stock: 15,
        images: [
          "https://i.ibb.co/FLSFTWqm/WH1000-XM6.webp",
          "https://i.ibb.co/RpSPWgjX/WH1000-XM6-front.webp",
          "https://i.ibb.co/Kc6J17PP/WH1000-XM6-side.webp",
        ],
        brandId: 3,
        categoryId: 3,
      },
      {
        name: "JBL Quantum 600",
        description:
          "Immersive sound gaming headset with comfort padding and noise-isolating design.",
        price: 149.99,
        stock: 18,
        images: [
          "https://i.ibb.co/FLSFTWqm/WH1000-XM6.webp",
          "https://i.ibb.co/RpSPWgjX/WH1000-XM6-front.webp",
          "https://i.ibb.co/Kc6J17PP/WH1000-XM6-side.webp",
        ],
        brandId: 3,
        categoryId: 3,
      },
      {
        name: "JBL SoundKeys",
        description:
          "A keyboard with mechanical switches and built-in JBL speakers.",
        price: 169.99,
        stock: 11,
        images: [
          "https://i.ibb.co/PZwb8WZc/side.webp",
          "https://i.ibb.co/9mqQPT0S/rotate.webp",
          "https://i.ibb.co/JShFwP4/front.webp",
        ],
        brandId: 3,
        categoryId: 4,
      },
      {
        name: "JBL Quantum Type",
        description:
          "Gaming keyboard RGB with JBL notification sounds and ergonomic support.",
        price: 219.99,
        stock: 13,
        images: [
          "https://i.ibb.co/PZwb8WZc/side.webp",
          "https://i.ibb.co/9mqQPT0S/rotate.webp",
          "https://i.ibb.co/JShFwP4/front.webp",
        ],
        brandId: 3,
        categoryId: 4,
      },
      {
        name: "JBL Vision Cam",
        description:
          "Full HD webcam with wide-angle lens and clear stereo audio, perfect for calls and streaming.",
        price: 89.99,
        stock: 20,
        images: [
          "https://i.ibb.co/v47pMzH5/back.png",
          "https://i.ibb.co/hxvHzDmy/front.png",
          "https://i.ibb.co/spXhmSgK/rotate.png",
        ],
        brandId: 3,
        categoryId: 5,
      },
      {
        name: "JBL Stream Pro",
        description:
          "High-quality webcam for content creators with autofocus, low-light correction, and stereo sound.",
        price: 109.99,
        stock: 15,
        images: [
          "https://i.ibb.co/v47pMzH5/back.png",
          "https://i.ibb.co/hxvHzDmy/front.png",
          "https://i.ibb.co/spXhmSgK/rotate.png",
        ],
        brandId: 3,
        categoryId: 5,
      },
      {
        name: "AOC GM500 RGB",
        description:
          "Precise gaming mouse with 5000 DPI sensor and RGB lighting.",
        price: 89.99,
        stock: 17,
        images: [
          "https://i.ibb.co/V06TPCDT/new.png",
          "https://i.ibb.co/7NKzJ13J/side.png",
          "https://i.ibb.co/rfGYnLBr/front.png",
        ],
        brandId: 4,
        categoryId: 1,
      },
      {
        name: "AOC Speedster",
        description:
          "Lightweight optical mouse, ideal for fast FPS games with ergonomic design.",
        price: 109.99,
        stock: 10,
        images: [
          "https://i.ibb.co/V06TPCDT/new.png",
          "https://i.ibb.co/7NKzJ13J/side.png",
          "https://i.ibb.co/rfGYnLBr/front.png",
        ],
        brandId: 4,
        categoryId: 1,
      },
      {
        name: "AOC Gaming 27G2U",
        description:
          "27-inch Full HD monitor with IPS panel, 144Hz refresh rate, and borderless design.",
        price: 999.99,
        stock: 16,
        images: [
          "https://i.postimg.cc/KzGcT0cx/back.avif",
          "https://i.postimg.cc/d15sjGDd/front.avif",
          "https://i.postimg.cc/NFLgJLrn/rotate.avif",
        ],
        brandId: 4,
        categoryId: 2,
      },
      {
        name: "AOC Agon AG273QZ",
        description:
          "Fluid 27-inch QHD display with 0.5ms response time for e-sports.",
        price: 1299.99,
        stock: 12,
        images: [
          "https://i.postimg.cc/KzGcT0cx/back.avif",
          "https://i.postimg.cc/d15sjGDd/front.avif",
          "https://i.postimg.cc/NFLgJLrn/rotate.avif",
        ],
        brandId: 4,
        categoryId: 2,
      },
      {
        name: "AOC GH200",
        description:
          "Stereo headphones with comfortable ear pads and a microphone for gaming.",
        price: 69.99,
        stock: 22,
        images: [
          "https://i.ibb.co/FLSFTWqm/WH1000-XM6.webp",
          "https://i.ibb.co/RpSPWgjX/WH1000-XM6-front.webp",
          "https://i.ibb.co/Kc6J17PP/WH1000-XM6-side.webp",
        ],
        brandId: 4,
        categoryId: 3,
      },
      {
        name: "AOC Gaming GH401",
        description:
          "Wireless gaming headphones with spatial sound and noise cancellation.",
        price: 149.99,
        stock: 13,
        images: [
          "https://i.ibb.co/FLSFTWqm/WH1000-XM6.webp",
          "https://i.ibb.co/RpSPWgjX/WH1000-XM6-front.webp",
          "https://i.ibb.co/Kc6J17PP/WH1000-XM6-side.webp",
        ],
        brandId: 4,
        categoryId: 3,
      },
      {
        name: "AOC GK500",
        description:
          "Mechanical keyboard with full RGB backlighting and durable switches.",
        price: 119.99,
        stock: 17,
        images: [
          "https://i.ibb.co/PZwb8WZc/side.webp",
          "https://i.ibb.co/9mqQPT0S/rotate.webp",
          "https://i.ibb.co/JShFwP4/front.webp",
        ],
        brandId: 4,
        categoryId: 4,
      },
      {
        name: "AOC Gaming GK200",
        description:
          "Durable gaming keyboard with programmable macros and LED lighting.",
        price: 99.99,
        stock: 14,
        images: [
          "https://i.ibb.co/PZwb8WZc/side.webp",
          "https://i.ibb.co/9mqQPT0S/rotate.webp",
          "https://i.ibb.co/JShFwP4/front.webp",
        ],
        brandId: 4,
        categoryId: 4,
      },
      {
        name: "AOC StreamCam",
        description: "Streaming camera with wide-angle lens and autofocus.",
        price: 109.99,
        stock: 11,
        images: [
          "https://i.ibb.co/v47pMzH5/back.png",
          "https://i.ibb.co/hxvHzDmy/front.png",
          "https://i.ibb.co/spXhmSgK/rotate.png",
        ],
        brandId: 4,
        categoryId: 5,
      },
      {
        name: "AOC VisionOne",
        description:
          "Webcam for video conferencing with dual microphones and noise reduction.",
        price: 139.99,
        stock: 9,
        images: [
          "https://i.ibb.co/v47pMzH5/back.png",
          "https://i.ibb.co/hxvHzDmy/front.png",
          "https://i.ibb.co/spXhmSgK/rotate.png",
        ],
        brandId: 4,
        categoryId: 5,
      },
      {
        name: "Razer DeathAdder V2",
        description:
          "Legendary model with a highly sensitive Focus+ sensor and ergonomic shape.",
        price: 149.99,
        stock: 22,
        images: [
          "https://i.ibb.co/V06TPCDT/new.png",
          "https://i.ibb.co/7NKzJ13J/side.png",
          "https://i.ibb.co/rfGYnLBr/front.png",
        ],
        brandId: 5,
        categoryId: 1,
      },
      {
        name: "Razer Viper Ultimate",
        description:
          "Wireless, ultra-lightweight gaming mouse with a very fast response time.",
        price: 179.99,
        stock: 25,
        images: [
          "https://i.ibb.co/V06TPCDT/new.png",
          "https://i.ibb.co/7NKzJ13J/side.png",
          "https://i.ibb.co/rfGYnLBr/front.png",
        ],
        brandId: 5,
        categoryId: 1,
      },
      {
        name: "Razer Raptor 27",
        description:
          "27-inch 165Hz QHD monitor with RGB Chroma and FreeSync support.",
        price: 1399.99,
        stock: 7,
        images: [
          "https://i.postimg.cc/KzGcT0cx/back.avif",
          "https://i.postimg.cc/d15sjGDd/front.avif",
          "https://i.postimg.cc/NFLgJLrn/rotate.avif",
        ],
        brandId: 5,
        categoryId: 2,
      },
      {
        name: "Razer Xtreme Vision",
        description:
          "32-inch gaming monitor with 0.5ms response time, HDR support, and G-Sync.",
        price: 1699.99,
        stock: 6,
        images: [
          "https://i.postimg.cc/KzGcT0cx/back.avif",
          "https://i.postimg.cc/d15sjGDd/front.avif",
          "https://i.postimg.cc/NFLgJLrn/rotate.avif",
        ],
        brandId: 5,
        categoryId: 2,
      },
      {
        name: "Razer BlackShark V2",
        description:
          "Esports racing headphones with microphone, spatial sound, and comfort for long sessions.",
        price: 189.99,
        stock: 18,
        images: [
          "https://i.ibb.co/FLSFTWqm/WH1000-XM6.webp",
          "https://i.ibb.co/RpSPWgjX/WH1000-XM6-front.webp",
          "https://i.ibb.co/Kc6J17PP/WH1000-XM6-side.webp",
        ],
        brandId: 5,
        categoryId: 3,
      },
      {
        name: "Razer Kraken X",
        description:
          "Lightweight gaming headset with soft padding and powerful bass sound.",
        price: 109.99,
        stock: 20,
        images: [
          "https://i.ibb.co/FLSFTWqm/WH1000-XM6.webp",
          "https://i.ibb.co/RpSPWgjX/WH1000-XM6-front.webp",
          "https://i.ibb.co/Kc6J17PP/WH1000-XM6-side.webp",
        ],
        brandId: 5,
        categoryId: 3,
      },
      {
        name: "Razer BlackWidow V4 Pro",
        description:
          "Mechanical gaming keyboard with tactile switches, RGB lighting, and media controls.",
        price: 229.99,
        stock: 20,
        images: [
          "https://i.ibb.co/PZwb8WZc/side.webp",
          "https://i.ibb.co/9mqQPT0S/rotate.webp",
          "https://i.ibb.co/JShFwP4/front.webp",
        ],
        brandId: 5,
        categoryId: 4,
      },
      {
        name: "Razer Huntsman Mini",
        description:
          "Compact mechanical keyboard with fast optical switches and customizable RGB effects.",
        price: 179.99,
        stock: 25,
        images: [
          "https://i.ibb.co/PZwb8WZc/side.webp",
          "https://i.ibb.co/9mqQPT0S/rotate.webp",
          "https://i.ibb.co/JShFwP4/front.webp",
        ],
        brandId: 5,
        categoryId: 4,
      },
      {
        name: "Razer Kiyo",
        description: "Webcam 1080p with built-in LED ring light for streaming.",
        price: 129.99,
        stock: 12,
        images: [
          "https://i.ibb.co/v47pMzH5/back.png",
          "https://i.ibb.co/hxvHzDmy/front.png",
          "https://i.ibb.co/spXhmSgK/rotate.png",
        ],
        brandId: 5,
        categoryId: 5,
      },
      {
        name: "Razer StreamCam X",
        description:
          "Full HD camera with autofocus and high-sensitivity microphone.",
        price: 159.99,
        stock: 15,
        images: [
          "https://i.ibb.co/v47pMzH5/back.png",
          "https://i.ibb.co/hxvHzDmy/front.png",
          "https://i.ibb.co/spXhmSgK/rotate.png",
        ],
        brandId: 5,
        categoryId: 5,
      },
      {
        name: "Rexus Headset Gaming Vonix F30",
        description:
          "Professional gaming headset with crystal-clear audio, comfortable padding, and adjustable microphone. Perfect for long gaming sessions with superior sound quality and durability.",
        price: 19.99,
        stock: 3,
        images: [
          "https://i.ibb.co/FLSFTWqm/WH1000-XM6.webp",
          "https://i.ibb.co/RpSPWgjX/WH1000-XM6-front.webp",
          "https://i.ibb.co/Kc6J17PP/WH1000-XM6-side.webp",
        ],
        brandId: 6,
        categoryId: 3,
      },
    ];

    const batchSize = 10;
    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      await prisma.product.createMany({
        data: batch,
        skipDuplicates: true,
      });
      console.log(
        `📦 Inserted products batch ${
          Math.floor(i / batchSize) + 1
        }/${Math.ceil(products.length / batchSize)}`
      );
    }

    console.log("👤 Seeding users...");
    const hashedPassword = await bcrypt.hash("haslo123", 12);

    await prisma.user.create({
      data: {
        phone: "123456789",
        email: "kowalski@gmail.com",
        password: hashedPassword,
        country: "Polska",
      },
    });

    console.log("✅ Database seeding completed successfully!");

    const brandCount = await prisma.brand.count();
    const categoryCount = await prisma.category.count();
    const productCount = await prisma.product.count();
    const userCount = await prisma.user.count();

    console.log(`
📊 Seeding Summary:
   - Brands: ${brandCount}
   - Categories: ${categoryCount}
   - Products: ${productCount}
   - Users: ${userCount}
    `);
  } catch (error) {
    console.error("❌ Error during seeding:", error);
    throw error;
  }
}

main()
  .then(() => {
    console.log("🎉 Seeding process finished successfully!");
  })
  .catch((error) => {
    console.error("💥 Seeding failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Database connection closed.");
  });
