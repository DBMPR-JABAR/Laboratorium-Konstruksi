<template>
  <CDropdown
    in-nav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <!-- <CHeaderNavLink>
        <div class="c-avatar">
          <img
            src="/img/avatars/6.jpg"
            alt="/img/avatars/6.jpg"
            class="c-avatar-img "
          >
        </div>
      </CHeaderNavLink> -->
      <CHeaderNavItem class="px-3">
        <CIcon name="cil-options" />
      </CHeaderNavItem>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>{{ $auth.user.name }} </strong>
    </CDropdownHeader>
    <!-- <CDropdownItem>
      <CIcon name="cil-bell" /> Updates
      <CBadge color="info" class="mfs-auto">
        {{ itemsCount }}
      </CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-envelope-open" /> Messages
      <CBadge color="success" class="mfs-auto">
        {{ itemsCount }}
      </CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-task" /> Tasks
      <CBadge color="danger" class="mfs-auto">
        {{ itemsCount }}
      </CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-comment-square" /> Comments
      <CBadge color="warning" class="mfs-auto">
        {{ itemsCount }}
      </CBadge>
    </CDropdownItem>
    <CDropdownHeader
      tag="div"
      class="text-center"
      color="light"
    >
      <strong>Settings</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-user" /> Profile
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-settings" /> Settings
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-dollar" /> Payments
      <CBadge color="secondary" class="mfs-auto">
        {{ itemsCount }}
      </CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-file" /> Projects
      <CBadge color="primary" class="mfs-auto">
        {{ itemsCount }}
      </CBadge>
    </CDropdownItem>
    <CDropdownDivider />
    <CDropdownItem>
      <CIcon name="cil-shield-alt" /> Lock Account
    </CDropdownItem> -->
    <CDropdownItem @click="logout">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  data () {
    return {
      itemsCount: 42
    }
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
</style>
