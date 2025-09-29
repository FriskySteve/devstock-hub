import Logo from "@/components/logo";
import RegisterForm from "@/components/register/RegisterForm";

export default function Register() {
  return (
    <div className="flex flex-col items-center gap-[32px] py-[77px]">
      <Logo />
      <RegisterForm />
    </div>
  );
}
