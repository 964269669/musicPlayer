import Vue from 'vue'
import Router from 'vue-router'

// import Recommend from 'components/Recommend/Recommend'
// import Singer from 'components/Singer/Singer'
// import Rank from 'components/Rank/Rank'
// import Search from 'components/Search/Search'
// import SingerDetail from 'components/singer-detail/singer-detail'
// import Disc from 'components/disc/disc'
// import TopList from 'components/top-list/top-list'
// import UserCenter from 'components/user-center/user-center'

Vue.use(Router)
// 异步加载
const Recommend = (resolve) => {
  import('components/Recommend/Recommend').then((module) => {
    resolve(module)
  })
}
const Rank = (resolve) => {
  import('components/Rank/Rank').then((module) => {
    resolve(module)
  })
}
const Singer = (resolve) => {
  import('components/Singer/Singer').then((module) => {
    resolve(module)
  })
}
const Search = (resolve) => {
  import('components/Search/Search').then((module) => {
    resolve(module)
  })
}
const SingerDetail = (resolve) => {
  import('components/singer-detail/singer-detail').then((module) => {
    resolve(module)
  })
}
const Disc = (resolve) => {
  import('components/disc/disc').then((module) => {
    resolve(module)
  })
}
const TopList = (resolve) => {
  import('components/top-list/top-list').then((module) => {
    resolve(module)
  })
}
const UserCenter = (resolve) => {
  import('components/user-center/user-center').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id', component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/user',
      component: UserCenter
    }
  ]
})
