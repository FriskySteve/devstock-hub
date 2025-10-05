import LoginForm from "@/components/login/LoginForm";
import Logo from "@/components/logo";

export default function Login() {
  return (
    <div className="flex flex-col items-center gap-[32px] py-[77px]">
      <Logo />
      <LoginForm />
    </div>
  );
}
