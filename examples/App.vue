<template>
  <div id="app">
    <h1>vue-paignate-api v1.0</h1>
    <paginate name="items" :list="items" :found-items="foundItems" class="paginate-list">
      <li v-for="item in paginated('items')">
        {{ item }}
      </li>
    </paginate>
  <!--   <paginate-links for="items"
      :show-step-links="true"
    ></paginate-links> -->
    <paginate-links @clickPageNumber="fetchItems" for="items" 
      :async=true
      :show-step-links="true"
      :limit="2"
      :step-links="{
        next: 'N',
        prev: 'P'
      }"
    ></paginate-links>
    <paginate-links for="items" :simple="{
      next: 'Next »',
      prev: '« Back'
    }"></paginate-links>
    <span v-if="$refs.paginator">
      Viewing {{$refs.paginator.pageItemsCount}} results
    </span>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      items: [],
      foundItems:10,
      paginate: ['items', 'foundItems']
    }
  },
  created() {
   /* axios.get('../../api/resources').then((response) => {
            console.log('Resource API Response.');
            console.log(response.data);
        }, (err) => {
            console.log(err)  
        });*/
        this.items = ['Item One', 'Item Two', 'Item Three', 'Item Four', 'Item Five', 'Item Six', 'Item Seven', 'Item Eight', 'Item Nine', 'Item Ten', 'Item Eleven', 'Item Twelve', 'Item Thirteen'];
  },
  methods: {
    fetchItems () {
      console.log('fetchItems');
      console.log(this.paginate['items'].page);
       this.items = ['Item 11', 'Item 12', 'Item 13', 'Item 14', 'Item 15', 'Item 16', 'Item 17', 'Item 18', 'Item 19', 'Item 20'];
       this.foundItems =3;
    }   
  }
}
</script>

<style lang="sass">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  font-size: 20px
  text-align: center
  color: #2c3e50
  margin-top: 60px

h1, h2
  font-weight: normal

ul
  list-style-type: none
  padding: 0


li
  display: inline-block
  margin: 0 10px


.paginate-list
  width: 159px
  margin: 0 auto
  text-align: left
  li
    display: block
    &:before
      content: '⚬ '
      font-weight: bold
      color: slategray
    
.paginate-links.items
  user-select: none
  a
    cursor: pointer
  
  li.active a
    font-weight: bold
  
  li.next:before
    content: ' | '
    margin-right: 13px
    color: #ddd
  
  li.disabled a
    color: #ccc
    cursor: no-drop
  
a
  color: #42b983

</style>