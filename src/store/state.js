import { playMode } from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [], // 播放列表
  sequenceList: [], // 比如随机播放模式下的列表
  mode: playMode.sequence,
  currentIndex: -1, // 当前播放的索引
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state