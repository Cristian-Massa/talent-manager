import { LoginForm } from "@/app/components/form/Form";
import styles from "./login.module.css";
import Link from "next/link";
export default function Login() {
  return (
    <main className={styles.page}>
      <LoginForm />
      <Link href={"/register"}>
        <button>Register</button>
      </Link>
    </main>
  );
}
