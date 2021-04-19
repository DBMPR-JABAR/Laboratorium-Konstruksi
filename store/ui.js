export const state = () => ({
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  modal: {
    open: false,
    onClick: callback => callback(),
    color: 'primary',
    title: 'Modal Title',
    message: 'Apakah anda yakin akan menghapus data ini ?'
  },
  flushMessage: {
    color: 'success',
    countDown: 0,
    message: ''
  }
})

export const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  }
}
