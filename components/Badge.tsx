import React from "react";

type BadgeProps = {
  categoryName: string;
};

const Badge = ({ categoryName }: BadgeProps) => {
  return (
    <div className="px-[10px] py-[6px] rounded-md bg-[var(--blaze-orange-50)] text-[14px] max-w-fit">
      <p className="text-[14px] text-[var(--primary-800)]">{categoryName}</p>
    </div>
  );
};

export default Badge;
