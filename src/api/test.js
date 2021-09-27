import request from '../utils/request'

const getData = (ip = '161.185.160.93') => {
  return request({
    url: `https://api.ip2country.info/ip?${ip}`,
    method: 'get',
  })
}

export {
  getData,
}