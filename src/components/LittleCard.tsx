import Image from "next/image";

type LittleCardProps = {
  name: string;
  iconUrl: string;
  //   logoUrl: string;
};
export default function LittleCard({
  name,
  iconUrl,
}: //   logoUrl,
LittleCardProps) {
  return (
    <div className="flex flex-col justify-center items-center px-10 gap-2 w-[220px] h-[190px] bg-[var(--base-white)] rounded-lg border border-[var(--gray-400)] overflow-hidden">
      <div className="relative w-20 h-20">
        <Image
          //   src={iconUrl ? iconUrl : logoUrl}
          src={iconUrl}
          alt={name}
          fill
          sizes="160px"
          className="w-full h-40 object-cover"
        />
      </div>
      <h3 className="text-xl font-medium text-[var(--neutral-900)]">{name}</h3>
    </div>
  );
}
