import React from "react";

const Logo = () => {
  return (
    <div>
      {/* TODO dodac zaleznosc od wykorzystania do wielkosci textu */}
      <h1 className="font-semibold text-[40px]">
        <span className="text-[var(--primary-500)]">Devstock</span>
        <span className="text-[var(--neutral-900)]">Hub</span>
      </h1>
    </div>
  );
};

export default Logo;
