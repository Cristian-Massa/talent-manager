import { RegisterForm } from "@/app/components/form/Form";
import { Button } from "@heroui/button";
import Link from "next/link";
export default function Register() {
  return (
    <main className="flex flex-col justify-center items-center h-screen gap-10">
      <RegisterForm />
      <Link href={"/login"}>
        <Button>Login</Button>
      </Link>
    </main>
  );
}
