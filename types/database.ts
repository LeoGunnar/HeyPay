export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          guest_name: string;
          property_name: string;
          check_in_date: string;
          check_out_date: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          guest_name: string;
          property_name: string;
          check_in_date: string;
          check_out_date: string;
          status: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bookings"]["Insert"]>;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          role: "admin" | "agent" | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          role?: "admin" | "agent" | null;
          updated_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      user_role: "admin" | "agent";
    };
    CompositeTypes: {};
  };
}
