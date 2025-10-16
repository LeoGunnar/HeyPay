import BookingOverview from "@/components/BookingOverview";
import EmptyState from "@/components/EmptyState";
import { createServerClient } from "@/lib/supabase/server";
import type { Booking } from "@/types/booking";
import type { Database } from "@/types/database";

type BookingRow = Database["public"]["Tables"]["bookings"]["Row"];

export default async function OverviewPage() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "id, guest_name, property_name, check_in_date, check_out_date, status, created_at"
    )
    .order("check_in_date", { ascending: true });

  if (error) {
    console.error(error.message);
    return (
      <EmptyState
        title="We couldn't load bookings"
        description="Please refresh the page or try again later."
        actionLabel="Retry"
        actionHref="/"
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="No bookings yet"
        description="Bookings created in Supabase will appear here instantly."
        actionLabel="Create booking"
        actionHref="https://app.supabase.com/"
      />
    );
  }

  const bookings: Booking[] = data.map((booking: BookingRow) => ({
    id: booking.id,
    guestName: booking.guest_name,
    propertyName: booking.property_name,
    checkInDate: booking.check_in_date,
    checkOutDate: booking.check_out_date,
    status: booking.status,
    createdAt: booking.created_at
  }));

  return <BookingOverview bookings={bookings} />;
}
