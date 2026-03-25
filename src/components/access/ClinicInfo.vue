<script setup lang="ts">
import { clinicInfo } from '@/data/clinic'
</script>

<template>
  <!-- internal_line: 090-XXXX-XXXX ext.BASEMENT -->
  <div>
    <table class="info-table">
      <tbody>
        <tr>
          <th>医院名</th>
          <td>{{ clinicInfo.name }}</td>
        </tr>
        <tr>
          <th>所在地</th>
          <td>{{ clinicInfo.postalCode }} {{ clinicInfo.address }}</td>
        </tr>
        <tr>
          <th>電話番号</th>
          <td>{{ clinicInfo.phone }}</td>
        </tr>
        <tr>
          <th>FAX</th>
          <td>{{ clinicInfo.fax }}</td>
        </tr>
        <tr>
          <th>休診日</th>
          <td>{{ clinicInfo.closedDays }}</td>
        </tr>
        <tr>
          <th>駐車場</th>
          <td>{{ clinicInfo.parking }}</td>
        </tr>
      </tbody>
    </table>

    <table class="hours-table">
      <thead>
        <tr>
          <th>診療時間</th>
          <th v-for="h in clinicInfo.hours" :key="h.day">{{ h.day }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>午前</th>
          <td v-for="h in clinicInfo.hours" :key="`am-${h.day}`" :class="{ closed: !h.morning }">
            {{ h.morning ?? '休' }}
          </td>
        </tr>
        <tr>
          <th>午後</th>
          <td
            v-for="h in clinicInfo.hours"
            :key="`pm-${h.day}`"
            :class="{ closed: !h.afternoon }"
          >
            {{ h.afternoon ?? '休' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
