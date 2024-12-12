// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/supabase", "@nuxt/ui", "@pinia/nuxt"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  supabase: {
    redirect: true,
    redirectOptions: {
      login: "/auth/login",
      callback: "/auth/callback",
      exclude: ["/auth/*"],
    },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
