<template>
  <article>
    <div class="relative mb-5">
      <h1>Mietobject DETAIL-Ansicht</h1>
      <small>ID: {{ route.params.rentalID }} </small>
    </div>

    <UCard>
      <template #header> Buchen </template>

      <UForm :state="state" class="space-y-4" @submit="onSubmit">
        <UFormGroup label="Start" name="start">
          <input type="datetime-local" v-model="state.started_at" />
        </UFormGroup>

        <UFormGroup label="Ende" name="end">
          <input type="datetime-local" v-model="state.ended_at" />
        </UFormGroup>

        <UButton
          type="submit"
          :isLoading="isLoading"
          :disabled="!state.location_start"
        >
          Buchen
        </UButton>
      </UForm>
    </UCard>
  </article>
</template>

<script setup lang="ts">
import { useBookingStore } from "~/stores/bookings.store";

const route = useRoute();
const user = useSupabaseUser();
const bookingStore = useBookingStore();

const isLoading = computed(() => bookingStore.isLoading);

function formatDate(date: Date) {
  // Ensure date is a Date object
  if (!(date instanceof Date)) {
    throw new Error("Input must be a Date object.");
  }

  // Extract components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Combine into desired format
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

const state = reactive({
  location_start: null,
  started_at: formatDate(new Date()),
  ended_at: formatDate(new Date()),
  rental_id: route.params.rentalID,
  user_id: user.value?.id,
});

const onSubmit = async (event) => {
  console.log("STATE", state.location_start);

  const created = await bookingStore.create(state);
  console.log("CREATED", created);

  if (created) navigateTo("/");
};

onMounted(() => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("GEO", position);

      Object.assign(state, { location_start: position.toJSON() });
    },
    (error) => {
      console.error("GEO DETECT", error);
    }
  );
});
</script>
