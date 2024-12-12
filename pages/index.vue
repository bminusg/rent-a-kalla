<template>
  <article class="dashboard">
    <h1 class="text-2xl font-bold break-all">Hallo {{ user?.email }}</h1>

    <div class="w-full my-10">
      <h2 class="mb-5">Aktive Buchungen</h2>
      <UCard>
        <UTable :rows="bookings" :columns="bookingColumns">
          <template #rental-data="{ row }">
            <NuxtLink :to="'/bookings/' + row.id">
              <span class="text-primary">{{ row.rental.title }}</span>
            </NuxtLink>
          </template>
          <template #location_start-data="{ row }">
            <UButton
              v-if="row.location_start?.coords"
              variant="link"
              icon="i-heroicons-map-pin"
              :to="
                createGoogleMapsLink(
                  row.location_start.coords.latitude,
                  row.location_start.coords.longitude
                )
              "
              target="_blank"
            ></UButton>
          </template>
        </UTable>
      </UCard>
    </div>

    <div class="w-full my-10">
      <h2 class="mb-5">Buchbare Items</h2>
      <UCard>
        <UTable :rows="rentals" :columns="rentalColumns">
          <template #title-data="{ row }">
            <ULink :to="'/rentals/' + row.id" active-class="text-primary">
              <span class="text-primary">{{ row.title }}</span>
            </ULink>
          </template>
        </UTable>
      </UCard>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useRentalStore } from "~/stores/rentals.store";
import { useBookingStore } from "~/stores/bookings.store";
import { createGoogleMapsLink } from "#build/imports";

const user = useSupabaseUser();
const rentalStore = useRentalStore();
const bookingStore = useBookingStore();

const rentals = computed(() => rentalStore.rentals ?? []);
const bookings = computed(() => bookingStore.bookings);

const rentalColumns = [
  {
    key: "title",
    label: "Titel",
  },
];

const bookingColumns = [
  {
    key: "rental",
    label: "Item",
  },
  {
    key: "started_at",
    label: "Gebucht seit",
  },
  {
    key: "ended_at",
    label: "Gebucht bis",
  },
  { key: "location_start", label: "Geo-Tracking" },
];

onMounted(() => {
  rentalStore.getAvailableRentals();

  if (user.value) bookingStore.loadBookingsByUserID(user.value.id);
});
</script>
