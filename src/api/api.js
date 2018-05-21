import axios from 'axios'

export const API_ROOT = '/api/'

// 站点接口
export const site = params => { return axios.post( API_ROOT+'api/bi/dada?mid=ddadjkahdjahdkj&type=dada&from=daping&access_token=abcd',  params ); };

export const siteMock = params => { return axios.post( '/news/data',  params ); };