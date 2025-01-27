import { LoginForm } from "@/app/components/login-form/LoginForm";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <LoginForm />
    </div>
  );
}
