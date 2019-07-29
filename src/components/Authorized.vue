<script>
import { hasAuthority } from '@/utils/authority'

export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true,
    },
  },
  render: (h, context) => {
    const { props, scopedSlots } = context
    return hasAuthority(props.authority) ? scopedSlots.default() : null
  },
}
</script>

<style></style>
