const filterForm = document.querySelector('#filter-form')
const Select = filterForm.querySelector('select')

const expenseTable = document.querySelector('table')

Select.addEventListener('change', e => {
  e.preventDefault()
  filterForm.submit()
})

expenseTable.addEventListener('click', e => {
  e.preventDefault()
  if (e.target.classList.contains('button-delete-expense')) {
    if (window.confirm("please confirm you'd like to remove this expense")) {
      return e.target.parentElement.submit()
    }
  }
})
