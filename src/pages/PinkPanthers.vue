<template>
  <div class="flexi-table-page-c">
    <FlexiTable :a="flexiTableOptions" />
  </div>
</template>

<script lang="ts">
import response from '../../mentors/flexitable/flexitableData'
import FlexiTable from '../../mentors/flexitable/components/FlexiTable1.vue'

export default {
  name: 'FlexiTablePage',
  components: {
    FlexiTable
  },

  data() {
    return {
      d: {
        options: {},
        columns: [],
        rows: [],
        selectedRows: []
      },
      c: {},
      b: {
        columns: [{ id: 1, name: '#', label: 'id' }],
        rows: [{ id: 1 }, { id: 2 }],
        selectedRows: []
      },
      a: {
        options: {},
        columns: [{ id: 1, name: '#', label: 'id' }],
        rows: [],
        selectedRows: []
      },
      flexiTableOptions: {
        options: {
          tableTitle: 'Hakan Calhanoglu burda on numara her yerde eller havada',
          columnGap: '.5rem',
          selected: { id: 5, name: 'FIVE' },
          columnSizes: [10, 10, 10, 1, 1, 1, 1, 1, 1, 10],
          // hiddenColumns: ['annualFee', 'city', 'gpa'],
          minVisibleColumns: 5,
          //itemsPerPage: 5,
          stickyHeader: true,
          // disableSorting: true,
          // hideSearch: true,
          show: false,
          dropdowns: [
            {
              id: 1,
              options: [
                { id: 1, name: 'Active' },
                { id: 2, name: 'Graduate' },
                { id: 3, name: 'Pending' }
              ],
              selected: { id: 3, name: 'Pending' }
            }
          ],
          buttons: [
            {
              id: 1,
              label: 'Mark',
              function: this.changeStatus
            }
          ]
        },
        columns: [
          { id: 1, name: '#', label: 'id', sortable: false },
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
        rows: [],
        selectedRows: []
      },
      flexiTableOptionsWithoutRowAndDetails: {
        options: {
          columnSizes: [10, 10, 10, 1, 1, 1, 1, 1, 1, 10, 1, 1],

          columnGap: '.5rem',

          hiddenColumns: ['annualFee', 'city'],

          stickyHeader: true,
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
        rows: [],
        selectedRows: []
      },
      flexiTableOptionsWithoutDetails: {
        options: {
          columnSizes: [10, 10, 10, 1, 1, 1, 1, 1, 1, 10, 1, 1],

          columnGap: '.5rem',

          hiddenColumns: ['annualFee', 'city'],
          stickyHeader: true,
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
        rows: [],
        selectedRows: []
      }
    }
  },
  created() {
    // row mapper for FlexiTable
    ; (this.flexiTableOptions.rows = response.map((item) => {
      return {
        row: {
          id: {
            // value: item.gender == 'Female' ? true : false,
            value: false,
            checkbox: true,
            pushelements: false,
            selectedRows: []
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
    })),
      (this.flexiTableOptionsWithoutRowAndDetails.rows = response.map((item) => {
        return {
          id: {
            // value: item.gender == 'Female' ? true : false,
            value: false,
            checkbox: true,
            pushelements: false,
            selectedRows: []
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
        }
      })),
      (this.flexiTableOptionsWithoutDetails.rows = response.map((item) => {
        return {
          row: {
            id: {
              // value: item.gender == 'Female' ? true : false,
              value: false,
              checkbox: true,
              pushelements: false,
              selectedRows: []
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
          }
        }
      })),
      (this.a.rows = response.map((item) => {
        return {
          id: {
            // value: item.gender == 'Female' ? true : false,
            value: false,
            checkbox: true,
            pushelements: false,
            selectedRows: []
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
        }
      }))
    // hidden Columns Reactivity Test
    // setTimeout(() => {
    //   this.flexiTableOptions.options.hiddenColumns.push('annualFee')
    // }, 3000)
  },
  methods: {
    printSelectedRows() {
      this.selectedRows.forEach((row, index) => {
        console.log(`Row ${index + 1}:`, row)
      })
    },
    changeStatus() {
      this.flexiTableOptions.selectedRows.forEach((element) => {
        this.flexiTableOptions.options.dropdowns.forEach((dropdown) => {
          this.flexiTableOptions.options.buttons.forEach((button) => {
            if (dropdown.id === button.id) {
              element.row.status.value =
                this.flexiTableOptions.options.dropdowns[0].selected.name.toLowerCase()
              element.row.status.class =
                'item-' + this.flexiTableOptions.options.dropdowns[0].selected.name.toLowerCase()
            }
          })
        })
      })
    }
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
