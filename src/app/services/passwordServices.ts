import bcrypt from "bcrypt";

export class PasswordServices {
  public static async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  public static async comparePassword(password: string, hashed: string) {
    const comparasion = await bcrypt.compare(password, hashed);
    return comparasion;
  }
}
