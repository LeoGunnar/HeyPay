export type UserRole = "admin" | "agent";

export function isAdmin(role: string | null | undefined): role is "admin" {
  return role === "admin";
}
