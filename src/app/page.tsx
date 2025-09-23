import Carousel from "@/components/Carousel";

const categories = [
  {
    id: 1,
    name: "Frontend Development",
    desc: "Learn the art of crafting beautiful and responsive user interfaces with HTML, CSS, and JavaScript.",
    img: "/cart.svg",
  },
  {
    id: 2,
    name: "Backend Development",
    desc: "Dive into server-side programming, databases, and APIs to build robust web applications.",
    img: "/cart.svg",
  },
  {
    id: 3,
    name: "Fullstack Development",
    desc: "Master both frontend and backend technologies to become a versatile fullstack developer.",
    img: "/cart.svg",
  },
  {
    id: 4,
    name: "Fullstack4 Development",
    desc: "Master both frontend and backend technologies to become a versatile fullstack developer.",
    img: "/cart.svg",
  },
  {
    id: 5,
    name: "Fullstack5 Development",
    desc: "Master both frontend and backend technologies to become a versatile fullstack developer.",
    img: "/cart.svg",
  },
];

export default function Home() {
  return (
    <div>
      <Carousel categories={categories} />
    </div>
  );
}
