import { defineStore } from "pinia";
import { useRentalStore } from "./rentals.store";

export const useBookingStore = defineStore("bookings", () => {
  const supabase = useSupabaseClient();
  const rentalStore = useRentalStore();

  const bookings = reactive([]);
  const isLoading = ref(false);

  async function loadBookingsByUserID(userID: string) {
    isLoading.value = true;
    bookings.length = 0;

    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(
          "id, rental: rental_id(*), started_at, ended_at, location_start"
        )
        .eq("user_id", userID);

      if (error) throw error;

      bookings.push(...data);
      isLoading.value = false;
    } catch (error) {
      console.error(error);
      isLoading.value = false;
    }
  }

  async function create(body: Object) {
    isLoading.value = true;

    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert(body)
        .select();

      if (error) throw error;

      const bookingItem = data[0];
      await rentalStore.setUnavailable(body.rental_id);

      bookings.push(bookingItem);
      return data;
    } catch (error) {
      console.error(error);
      isLoading.value = false;
    }
  }

  return { isLoading, bookings, loadBookingsByUserID, create };
});
