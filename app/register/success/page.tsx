import React from "react";
import RegisterSuccess from "@/components/icons/RegisterSuccess";

const page = () => {
  return (
    <div className="flex flex-col items-center gap-6 py-20">
      <RegisterSuccess />
      <h1 className="font-bold text-[44px] text-[var(--neutral-900)]">
        Thank you!
      </h1>
      <h2 className="font-medium text-[24px] text-[var(--neutral-900)]">
        You have successfully registered
      </h2>
      <h4 className="font-normal text-[18px] text-[var(--neutral-600)]">
        Please check your e-mail for further information. Let’s exploring our
        products and enjoy many gifts.
      </h4>
      <h4 className="font-normal text-[16px] text-[var(--neutral-600)]">
        Having problem?{" "}
        <a className="text-[var(--primary-600)]" href="#">
          Contact us
        </a>
      </h4>
    </div>
  );
};

export default page;
