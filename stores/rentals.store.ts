import { defineStore } from "pinia";

export const useRentalStore = defineStore("rentals", () => {
  const supabase = useSupabaseClient();

  const rentals = reactive([]);
  const isLoading = ref(false);

  async function getAvailableRentals() {
    isLoading.value = true;
    rentals.length = 0;

    try {
      const { data, error } = await supabase
        .from("rentals")
        .select("id, title")
        .is("is_available", true);

      console.log("RENTALS", data, error);
      if (data) rentals.push(...data);
      isLoading.value = false;
    } catch (error) {
      console.error(error);
      isLoading.value = false;
    }
  }

  async function setUnavailable(rentalID: string) {
    try {
      const { data, error } = await supabase
        .from("rentals")
        .update({ is_available: false })
        .eq("id", rentalID)
        .select();

      if (error) throw error;

      console.log("UPDATED AVAILABLE STATE", rentalID, data, error);
    } catch (error) {
      console.error(error);
    }
  }

  async function setAvailable(rentalID: string) {
    try {
      const { error, data } = await supabase
        .from("rentals")
        .update({ is_available: true })
        .eq("id", rentalID)
        .select();

      console.log("UPDATED AVAILABLE STATE", data, error, rentalID);
      if (error) throw error;
    } catch (error) {
      console.error(error);
    }
  }

  return { rentals, getAvailableRentals, setUnavailable, setAvailable };
});
