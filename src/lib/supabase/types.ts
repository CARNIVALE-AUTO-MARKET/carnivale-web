/**
 * Hand-maintained DB types mirroring supabase/migrations.
 * (Regenerate with `supabase gen types typescript` once the project exists.)
 */

export type ListingStatus = "draft" | "pending_payment" | "active" | "sold" | "withdrawn";
export type PaymentStatus = "created" | "requires_payment" | "paid" | "failed" | "refunded";

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          name: string;
          city: string;
          venue: string;
          starts_on: string | null;
          ends_on: string | null;
          is_placeholder: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["events"]["Row"]> & { name: string; city: string; venue: string };
        Update: Partial<Database["public"]["Tables"]["events"]["Row"]>;
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          created_at: string;
        };
        Insert: { id: string; full_name?: string | null; phone?: string | null };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      listings: {
        Row: {
          id: string;
          seller_id: string;
          year: number;
          make: string;
          model: string;
          trim: string | null;
          mileage: number;
          vin: string | null;
          zip: string;
          category: string;
          price: number;
          description: string | null;
          photo_paths: string[];
          status: ListingStatus;
          relay_number: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["listings"]["Row"], "id" | "created_at" | "status" | "relay_number" | "photo_paths" | "trim" | "vin" | "description"> &
          Partial<Pick<Database["public"]["Tables"]["listings"]["Row"], "id" | "status" | "photo_paths" | "trim" | "vin" | "description">>;
        Update: Partial<Database["public"]["Tables"]["listings"]["Row"]>;
      };
      payments: {
        Row: {
          id: string;
          listing_id: string;
          seller_id: string;
          stripe_session_id: string | null;
          fee_cents: number;
          deposit_cents: number;
          status: PaymentStatus;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["payments"]["Row"],
          "id" | "created_at" | "status" | "stripe_session_id"
        > &
          Partial<Pick<Database["public"]["Tables"]["payments"]["Row"], "id" | "status" | "stripe_session_id">>;
        Update: Partial<Database["public"]["Tables"]["payments"]["Row"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
