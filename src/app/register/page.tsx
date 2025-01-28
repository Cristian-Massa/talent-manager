// import { RegisterForm } from "@/app/components/form/Form";
import styles from "./register.module.css";
import Link from "next/link";
export default function Register() {
  return (
    <main className={styles.page}>
      {/* <RegisterForm /> */}
      <Link href={"/login"}>
        <button>Login</button>
      </Link>
    </main>
  );
}
