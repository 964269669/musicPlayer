import { playMode } from 'common/js/config'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [], // 播放列表
  sequenceList: [], // 比如随机播放模式下的列表
  mode: playMode.sequence,
  currentIndex: -1, // 当前播放的索引
  disc: {},
  topList: {}
}

export default state