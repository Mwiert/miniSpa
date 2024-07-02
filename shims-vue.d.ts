declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $day: typeof import('dayjs')
  }
}
