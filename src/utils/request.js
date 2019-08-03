import axios from 'axios'
import { Notice } from 'iview'

function request(options) {
  return axios(options)
    .then(res => res)
    .catch(error => {
      const {
        response: { status, statusText },
      } = error
      Notice.error({
        title: status,
        desc: statusText,
      })
      return Promise.reject(error)
    })
}

export default request
