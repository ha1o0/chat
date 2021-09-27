import axios from 'axios'
import qs from 'qs'

let pendingRequest = new Map()

const getRequestUrlKey = (config) => {
  return [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data),
  ].join('&')
}

const hasRequestExist = (config) => {
  const requestUrl = getRequestUrlKey(config)
  return pendingRequest.has(requestUrl)
}

const addPendingRequest = (config) => {
  const requestUrl = getRequestUrlKey(config)
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
    if (!hasRequestExist(config)) {
      pendingRequest.set(requestUrl, cancel)
    }
  })
}

const removePendingRequest = (config) => {
  const requestUrl = getRequestUrlKey(config)
  if (!hasRequestExist(config)) {
    return
  }
  const cancel = pendingRequest.get(requestUrl)
  cancel(requestUrl)
  pendingRequest.delete(requestUrl)
}

axios.interceptors.request.use((request) => {
  console.log('resquest: ', request)
  if (hasRequestExist(request)) {
    console.log('repeat')
    // return Promise.reject('repeat request')
    return {
      ...request,
      cancelToken: new axios.CancelToken((cancel) => cancel('Cancel repeated request'))
    }
  }
  // removePendingRequest(request)
  addPendingRequest(request)
  return request
}, (error) => {
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  console.log('response: ', response)
  removePendingRequest(response.config)
  if (response.status === 200) {
    return response.data
  } else {
    return response.statusText
  }
}, (error) => {
  return Promise.reject(error)
})

export default axios