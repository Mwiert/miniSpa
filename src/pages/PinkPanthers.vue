<template>
  <div class="flexi-table-page-c">
    <FlexiTable />
  </div>
</template>

<script>
import response from '../../mentors/flexitable/flexitableData'
import FlexiTable from '../../mentors/flexitable/components/FlexiTable.vue'
import { computed } from 'vue'
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
          columnSizes: [0.5, 0.75, 1, 0.85, 0.75, 0.75, 0.65, 0.75, 1.3, 0.5, 1, 1.75],
          columnGap: '.5rem',
          // hiddenColumns: ['annualFee', 'email'],

          itemsPerPage: 30,
          stickyHeader: true
          // disableSorting: true
        },
        columns: [
          { name: '#', label: 'id' },
          { name: 'Status', label: 'status' },
          { name: 'Name ', label: 'nameSurname' },
          { name: 'Student ID', label: 'studentNumber' },
          { name: 'Class', label: 'class' },
          { name: 'Birthdate', label: 'birthDate', type: 'date' },
          { name: 'Gender', label: 'gender' },
          { name: 'City', label: 'city' },
          { name: 'Department', label: 'department' },
          { name: 'GPA', label: 'gpa', class: 'txt-right ' },
          { name: 'Annual Fee', label: 'annualFee', class: 'txt-right ' },
          { name: 'Email Adress', label: 'email' }
        ],
        rows: []
      }
    }
  },
  mounted() {
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
