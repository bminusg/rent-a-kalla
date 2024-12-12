import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const supabase = useSupabaseClient();

  const isLoading = ref(false);
  const errors = reactive([]);

  async function login(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log("DATA", data, error);
      if (data) navigateTo("/");
    } catch (error) {
      console.log("ERROR", error);
    }
  }

  return { isLoading, errors, login };
});
