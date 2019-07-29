import { hasAuthority } from '@/utils/authority'

export default {
  install(Vue, options = {}) {
    Vue.directive(options.name || 'authorized', {
      inserted(el, binding) {
        if (!hasAuthority(binding.value))
          el.parentNode && el.parentNode.removeChild(el)
      },
    })
  },
}
