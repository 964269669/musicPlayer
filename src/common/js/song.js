import axios from 'axios'
import { commonParams, ERR_OK } from 'api/config'

import {getLyric} from 'api/song'
import {Base64} from 'js-base64'

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          // reject('no lyric')  这样写不对
          reject(new Error('no lyric'))
        }
      })
    })
  }
}
export function getMusicKey(mid) {
  const url = 'api/music'
  const data = Object.assign({}, commonParams, {
    // -: getplaysongvkey8884369634341935,
    g_tk: 2125402665,
    loginUin: 964269669,
    hostUin: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      'req': {
        'module': 'CDN.SrfCdnDispatchServer',
        'method': 'GetCdnDispatch',
        'param': { 'guid': '2407844562', 'calltype': 0, 'userip': '' }
      },
      'req_0': {
        'module': 'vkey.GetVkeyServer',
        'method': 'CgiGetVkey',
        'param': {
          'guid': '2407844562',
          'songmid': [mid],
          'songtype': [0],
          'uin': '964269669',
          'loginflag': 1,
          'platform': '20'
        }
      },
      'comm': { 'uin': 964269669, 'format': 'json', 'ct': 24, 'cv': 0 }
      // req_0:
      // {
      //   'module': 'vkey.GetVkeyServer',
      //   'method': 'CgiGetVkey',
      //   'param': {
      //     'guid': '2407844562',
      //     'songmid': [mid],
      //     'songtype': [0],
      //     'uin': '964269669',
      //     'loginflag': 1,
      //     'platform': '20'
      //   }
      // },
      // 'comm': {uin: 964269669, 'format': 'json', 'ct': 24, 'cv': 0}
    }
  })

  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

export function createSong(musicData, vkey) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://111.202.98.149/amobile.music.tc.qq.com/${musicData.songid}.m4a?fromtag=46`
    // url: `http://111.202.85.151/amobile.music.tc.qq.com/C400${musicData.songid}.m4a?guid=2407844562&vkey=${vkey}&uin=5733&fromtag=66`
    // http://111.202.98.144/amobile.music.tc.qq.com/C400001Qu4I30eVFYb.m4a?guid=2407844562&vkey=F43C765669073C583C69A857D56CD2FA1654672849657D7532DAEA5D1244B47D0690561D8DE6548FAA3CB650AE547D815953010DBA907E15&uin=5733&fromtag=66
    // http://111.202.85.151/amobile.music.tc.qq.com/C400004dFFPd4JNv8q.m4a?guid=2407844562&vkey=91137696C134365E50AEE0551017D943CAA995E346D94F472F5FFA853807E5CF0DFD1A266BBA77F00E1E6A5FFC153741EC5721A87AD1CEB7&uin=5733&fromtag=66

    // 演员
    // -: getplaysongvkey8884369634341935
    // g_tk: 2125402665
    // loginUin: 964269669
    // hostUin: 0
    // format: json
    // inCharset: utf8
    // outCharset: utf-8
    // notice: 0
    // platform: yqq.json
    // needNewCode: 0
    // data: {'req_0':{'module':'vkey.GetVkeyServer','method':'CgiGetVkey','param':{'guid':'2407844562','songmid':['001Qu4I30eVFYb'],'songtype':[0],'uin':'964269669','loginflag':1,'platform':'20'}},'comm':{'uin':964269669,'format':'json','ct':24,'cv':0}}
    // { 'req': { 'module': 'CDN.SrfCdnDispatchServer', 'method': 'GetCdnDispatch', 'param': { 'guid': '2407844562', 'calltype': 0, 'userip': '' } }, 'req_0': { 'module': 'vkey.GetVkeyServer', 'method': 'CgiGetVkey', 'param': { 'guid': '2407844562', 'songmid': ['001Qu4I30eVFYb'], 'songtype': [0], 'uin': '964269669', 'loginflag': 1, 'platform': '20' } }, 'comm': { 'uin': 964269669, 'format': 'json', 'ct': 24, 'cv': 0 } }

// 刚刚好
// -: getplaysongvkey6333638272960715
// g_tk: 2125402665
// loginUin: 964269669
// hostUin: 0
// format: json
// inCharset: utf8
// outCharset: utf-8
// notice: 0
// platform: yqq.json
// needNewCode: 0
// data: {'req':{'module':'CDN.SrfCdnDispatchServer','method':'GetCdnDispatch','param':{'guid':'2407844562','calltype':0,'userip':''}},'req_0':{'module':'vkey.GetVkeyServer','method':'CgiGetVkey','param':{'guid':'2407844562','songmid':['001TXSYu1Gwuwv'],'songtype':[0],'uin':'964269669','loginflag':1,'platform':'20'}},'comm':{'uin':964269669,'format':'json','ct':24,'cv':0}}
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
