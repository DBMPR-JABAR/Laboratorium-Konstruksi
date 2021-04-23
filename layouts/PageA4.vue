<template>
  <client-only>
    <div class="page">
      <Nuxt />
    </div>
  </client-only>
</template>
<style scoped>
        body {
            background: rgb(204, 204, 204);
            margin: 0;
            padding: 0;
            font-size: 10px !important
        }

        html {
            margin: 0;
            padding: 0;
            width: 21cm;
            height: 29.7cm;
            font-size: 8px;
        }

        .page {
            background: white;
            display: block;
            margin: 0 auto;
            margin-bottom: 0.5cm;
            box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
            padding: 1cm 1.5cm;
            width: 21cm;
            height: 29.7cm;
            size: 21cm 29.7cm;
        }

        @media print {
          body,
            .page {
                margin: 0;
                box-shadow: 0;
                width: 21cm;
                height: 29.7cm;
                size: 21cm 29.7cm;
            }
        }
</style>
