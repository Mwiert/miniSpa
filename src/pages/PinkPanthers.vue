<template>
  <div class="flexi-table-page-c">
    <FlexiTable />
  </div>
</template>

<script>
import response from '../../mentors/flexitable/flexitableData'
import FlexiTable from '../../mentors/flexitable/components/FlexiTable.vue'
import { computed } from 'vue'
import PageOrder from '../../src/enum/PageOrder'
export default {
  name: 'FlexiTablePage',
  components: {
    FlexiTable
  },
  provide() {
    return {
      flexi: computed(() => this.flexiTableOptions)
    }
  },
  data() {
    return {
      flexiTableOptions: {
        options: {
          //columnSizes: [0.5, 0.75, 1, 0.85, 0.75, 0.75, 0.65, 0.75, 1.3, 0.5, 1, 1.75],
          columnSizes: [0.5, 0.75, 1, 0.85, 0.75, 0.75, 0.65, 1.3, 0.5, 1.75],
          columnGap: '.5rem',
          EInternSingleComponentType: PageOrder,

          hiddenColumns: ['annualFee', 'city'],

          itemsPerPage: 30,
          stickyHeader: true,
          // disableSorting: true
          show: false
        },
        columns: [
          { id: 1, name: '#', label: 'id' },
          { id: 2, name: 'Status', label: 'status' },
          { id: 3, name: 'Name ', label: 'nameSurname' },
          { id: 4, name: 'Student ID', label: 'studentNumber' },
          { id: 5, name: 'Class', label: 'class' },
          { id: 6, name: 'Birthdate', label: 'birthDate', type: 'date' },
          { id: 7, name: 'Gender', label: 'gender' },
          { id: 8, name: 'City', label: 'city' },
          { id: 9, name: 'Department', label: 'department' },
          { id: 10, name: 'GPA', label: 'gpa', class: 'txt-right ' },
          { id: 11, name: 'Annual Fee', label: 'annualFee', class: 'txt-right ' },
          { id: 12, name: 'Email Adress', label: 'email' }
        ],
        rows: []
      }
    }
  },
  created() {
    // row mapper for FlexiTable
    this.flexiTableOptions.rows = response.map((item) => {
      return {
        row: {
          id: {
            value: false,
            checkbox: true
          },
          status: {
            value: item.status,
            class: `item-${item.status}`,
            url: `?status=${item.status}`
          },
          nameSurname: {
            img: item.photo,
            imgClass: `student-photo-${item.gender}`,
            value: item.nameSurname
          },
          studentNumber: {
            value: item.studentID
          },
          class: {
            value: item.class
          },
          birthDate: {
            value: item.birthDate
          },
          gender: item.gender,
          city: item.city,
          department: item.department,
          gpa: {
            value: item.highSchoolGPA,
            class: 'txt-right'
          },
          annualFee: {
            value: item.annualFee,
            class: 'txt-right txt-bold'
          },
          email: {
            value: item.email,
            class: 'email'
          }
        },
        details: {
          status: false,
          componentName: 'CustomDetailsComponent',
          componentPath: './CustomDetailsComponent.vue',
          props: { msg: item.nameSurname }
        },
        check: {
          check: true
        }
      }
    })

    // hidden Columns Reactivity Test
    // setTimeout(() => {
    //   this.flexiTableOptions.options.hiddenColumns.push('annualFee')
    // }, 3000)
  }
}
</script>

<style lang="scss" scoped>
.flexi-table-page-c {
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}
</style>
