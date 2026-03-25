<script setup lang="ts">
import { clinicInfo } from '@/data/clinic'

const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${clinicInfo.coordinates.lng}!3d${clinicInfo.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sja!2sjp!4v1`
</script>

<template>
  <div class="map-container">
    <iframe
      :src="mapUrl"
      width="100%"
      height="100%"
      style="border: 0"
      allowfullscreen
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      title="クリニック所在地"
    />
  </div>
</template>
