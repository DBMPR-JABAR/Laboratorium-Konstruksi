export const state = () => ({
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  modal: {
    open: false,
    onClick: callback => callback(),
    color: 'primary',
    title: 'Modal Title',
    message: 'Apakah anda yakin akan menghapus data ini ?'
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
  openModal (state) {
    state.openModal = { ...state.modal }
  },
  set (state, [variable, value]) {
    console.log(state.modal)
    state[variable] = value
  }
}
