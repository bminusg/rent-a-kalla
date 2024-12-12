<template>
  <article>
    <h1>Booking</h1>
    <UCard>
      <UForm :state="state">
        <UFormGroup></UFormGroup>
      </UForm>
    </UCard>
  </article>
</template>

<script setup lang="ts">
import { useBookingStore } from "~/stores/bookings.store";

const bookingStore = useBookingStore()

const state = reactive({});
</script>
