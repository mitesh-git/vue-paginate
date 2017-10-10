import { warn } from '../util/debug'

export default {
  name: 'paginate',
  props: {
    name: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      required: true
    },
    foundItems:{
      type: Number,
      default: 1,
      validator (value) {
        return value > 0
      }
    },
    per: {
      type: Number,
      default: 2,
      validator (value) {
        return value > 0
      }
    },
    tag: {
      type: String,
      default: 'ul'
    }
  },
  data () {
    return {
      //initialListSize: this.list.length
      initialListSize: this.foundItems
    }
  },
  computed: {
    currentPage: {
      get () {
        if (this.$parent.paginate[this.name]) {
          return this.$parent.paginate[this.name].page
        }
      },
      set (page) {
        this.$parent.paginate[this.name].page = page
      }
    },
    pageItemsCount () {
      //const numOfItems = this.list.length
      const numOfItems  = this.foundItems
      const first       = this.currentPage * this.per + 1
      const last        = Math.min((this.currentPage * this.per) + this.per, numOfItems)
      
      return `${first}-${last} of ${numOfItems}`
    }
  },
  mounted () {
    if (this.per <= 0) {
      warn(`<paginate name="${this.name}"> 'per' prop can't be 0 or less.`, this.$parent)
    }
    if (!this.$parent.paginate[this.name]) {
      warn(`'${this.name}' is not registered in 'paginate' array.`, this.$parent)
      return
    }
    this.paginateList()
  },
  watch: {
    currentPage () {
      this.paginateList()
    },
    list () {
      if (this.initialListSize !== this.foundItems) {
        // On list change, refresh the paginated list only if list size has changed
        this.currentPage = 0
      }
      this.paginateList()
    },
    per () {
      this.currentPage = 0
      this.paginateList()
    }
  },
  methods: {
    paginateList () {
      const index = this.currentPage * this.per
      const paginatedList = this.list; //this.list.slice(index, index + this.per)
      this.$parent.paginate[this.name].list = paginatedList
    },
    goToPage (page) {
      const maxPage = Math.ceil(this.foundItems / this.per)
      if (page > maxPage) {
        warn(`You cannot go to page ${page}. The last page is ${maxPage}.`, this.$parent)
        return
      }
      this.currentPage = page - 1
    }
  },
  render (h) {
    return h(this.tag, {}, this.$slots.default)
  }
}
