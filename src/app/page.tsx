import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.page}>
      <Link href={"/login"}>
        <button>Login</button>
      </Link>
      <Link href={"/candidate"}>
        <button>Im candidate</button>
      </Link>
    </div>
  );
}
