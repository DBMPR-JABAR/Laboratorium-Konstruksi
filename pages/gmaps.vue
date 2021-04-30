<template>
  <GMap
    ref="gMap"
    language="en"
    :cluster="{options: {styles: clusterStyle}}"
    :options="{fullscreenControl: false, styles: mapStyle}"
    :zoom="6"
    @click="onClick"
  >
    <GMapMarker
      v-for="location in locations"
      :key="location.id"
      :position="{lat: location.lat, lng: location.lng}"
      :options="{icon: locations.icon}"
      @click="currentLocation = location"
    >
      <GMapInfoWindow :options="{maxWidth: 200}">
        <code>
          lat: {{ location.lat }},
          lng: {{ location.lng }}
        </code>
      </GMapInfoWindow>
    </GMapMarker>
  </GMap>
</template>
<script>
export default {
  data () {
    return {
      currentLocation: {},
      locations: [],
      pins: {
        selected: 'img/square.png',
        notSelected: 'img/square.png'
      },
      mapStyle: ['street'],
      clusterStyle: [
        {
          url: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png',
          width: 56,
          height: 56,
          textColor: '#fff'
        }
      ]
    }
  },
  methods: {
    onClick (maps) {
      this.locations.push({ lat: maps.event.Va.x, lng: maps.event.Va.y, icon: 'img/square.png' })
      this.$forceUpdate()
    }
  }
}
</script>
