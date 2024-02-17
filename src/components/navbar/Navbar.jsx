import Link from "next/link";
import Links from "./links/Links";
import styles from "./Navbar.module.css";
import { auth } from "@/lib/auth/auth";

const Navbar = async () => {
  const session = await auth();

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        Lamadev
      </Link>
      <div>
        <Links session={session} />
      </div>
    </div>
  );
};

export default Navbar;
