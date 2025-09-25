import Logo from "./logo";
import Image from "next/image";

const footerLinks = [
  { title: "Company", links: ["About Us", "Contact", "Partner"] },
  { title: "Social", links: ["Instagram", "Twitter", "Facebook", "LinkedIn"] },
  { title: "FAQ", links: ["Account", "Deliveries", "Orders", "Payments"] },
  { title: "Resources", links: ["E-Books", "Tutorials", "Course", "Blog"] },
];

const Footer = () => {
  return (
    <footer className="w-full bg-[var(--gray-50)]  text-sm flex justify-around px-[60px] py-[140px] mt-auto">
      <div className="flex flex-col gap-y-[24px] flex-1 basis-0">
        <Logo />
        <p className="text-[var(--neutral-600)] font-medium ">
          © 2023 DevStockHub. All rights reserved.
        </p>
        <div className="flex gap-3">
          {/* TODO zamienic obrazki na obrazki platnosci */}
          <Image src="/cart.svg" alt="Cart" width={24} height={24} />
          <Image src="/cart.svg" alt="Cart" width={24} height={24} />
          <Image src="/cart.svg" alt="Cart" width={24} height={24} />
          <Image src="/cart.svg" alt="Cart" width={24} height={24} />
          <Image src="/cart.svg" alt="Cart" width={24} height={24} />
        </div>
      </div>
      <div className="flex-2 grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 sm:gap-8 md:grid-cols-4">
        {footerLinks.map((section) => (
          <div key={section.title}>
            <h4 className="font-semibold text-[var(--neutral-900)] pb-6">
              {section.title}
            </h4>
            <ul className="flex flex-col text-[var(--neutral-600)] text-base font-medium gap-4">
              {section.links.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
