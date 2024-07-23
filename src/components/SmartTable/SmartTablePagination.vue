<template>
    <div class="smart-table-pagination-c">
      <button 
      @click="setPage(flexi.options.currentPage-1)"
      class="prev-page-btn"
      >
        <SvgIcon :name="'arrow-left'" size="s" />
      </button>
      <button
        v-for="page in flexi.options.pages "
        :key="page"
        @click="setPage(page)"
        :class="['page-btn', { active: page === flexi.options.currentPage }]"
      >
        {{ page }}

      </button>

      <button 
      @click="setPage(flexi.options.currentPage+1)"
      class="next-page-btn"
      >
        <SvgIcon :name="'arrow-right'" size="s" />
      </button>
    </div>
  </template>
  
  <script >
  import flexiTableMixin from '../../../mentors/flexitable/flexitableMixin'
  export default {
    name: 'SmartTablePagination',
    inject: ['flexi'],
    mixins: [flexiTableMixin],

    methods: {
      setPage(page) {
          if(page != 0 && page <= this.flexi.options.pages.length ){
            this.flexi.options.currentPage = page;
          }
      },
    //   isVisible() {
    //   return this.localCurrentPage !== 1;
    // },
    //   checkNext(item){
    //     return item != this.totalPages.length
    //   }
    },
  watch: {
      "flexi.options.itemsPerPage":{
        handler:function(val){
          console.log( "itemsperpage",val)
          this.GeneratePagination(val)
        }, immediate: true
      },
     },
  };

  </script>
  

  <style lang="scss">
  .smart-table-pagination-c {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  
    .prev-page-btn,
    .next-page-btn {
      height: 40px;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      border: 1px solid #dcdcdc;
      margin: 0 5px;
      cursor: pointer;
      visibility: visible;
  
      &:hover {
        background-color: #f0f0f0;
      }
      .prev-page-btn.isVisible {
      visibility: hidden;
}
    }
  
    .page-btn {
      height: 40px;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      border: 1px solid #dcdcdc;
      border-radius: 5px;
      margin: 0 5px;
      cursor: pointer;
  
      &.active {
        background-color: #04070a;
        color: #ffffff;
      }
  
      &:hover {
        background-color: #04070a;
        color: #ffffff;
      }
    }
  }
  </style>
  