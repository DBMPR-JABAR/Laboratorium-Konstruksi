export default function ({ $axios }, inject) {
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    }
  })

  api.setBaseURL('http://localhost/temanjabar/public/api/')

  inject('api', api)
}
