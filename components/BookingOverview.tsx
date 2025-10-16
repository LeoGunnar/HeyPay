import type { Booking } from "@/types/booking";
import StatusPill from "@/components/StatusPill";

interface BookingOverviewProps {
  bookings: Booking[];
}

export default function BookingOverview({ bookings }: BookingOverviewProps) {
  return (
    <section className="rounded-3xl border border-brand-turquoise/15 bg-white/80 p-8 shadow-sm backdrop-blur">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-brand-teal">Booking overview</h1>
          <p className="text-sm text-slate-600">
            A live view of upcoming stays pulled directly from Supabase.
          </p>
        </div>
        <div className="rounded-full bg-brand-orange/10 px-4 py-2 text-sm font-medium text-brand-orange">
          {bookings.length} active booking{bookings.length === 1 ? "" : "s"}
        </div>
      </header>
      <div className="mt-6 overflow-hidden rounded-2xl border border-brand-turquoise/10">
        <table className="min-w-full divide-y divide-brand-turquoise/20 text-left text-sm">
          <thead className="bg-brand-turquoise/10 text-xs font-semibold uppercase tracking-wide text-brand-teal">
            <tr>
              <th className="px-6 py-3">Guest</th>
              <th className="px-6 py-3">Property</th>
              <th className="px-6 py-3">Check-in</th>
              <th className="px-6 py-3">Check-out</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-turquoise/10 bg-white/70 text-slate-700">
            {bookings.map((booking) => (
              <tr key={booking.id} className="transition hover:bg-brand-turquoise/5">
                <td className="px-6 py-4 font-medium text-slate-900">{booking.guestName}</td>
                <td className="px-6 py-4">{booking.propertyName}</td>
                <td className="px-6 py-4">{new Date(booking.checkInDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">{new Date(booking.checkOutDate).toLocaleDateString()}</td>
                <td className="px-6 py-4"><StatusPill status={booking.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
