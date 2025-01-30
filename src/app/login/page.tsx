import { LoginForm } from "@/app/components/form/Form";
import { Button } from "@heroui/button";
import Link from "next/link";
export default function Login() {
  return (
    <main className="flex justify-center items-center flex-col gap-10 h-screen">
      <LoginForm />
      <Link href={"/register"}>
        <Button>Register</Button>
      </Link>
    </main>
  );
}
