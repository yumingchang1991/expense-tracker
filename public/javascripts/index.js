const filterForm = document.querySelector('#filter-form')
const Select = filterForm.querySelector('select')

const expenseTable = document.querySelector('table')

Select.addEventListener('change', e => {
  e.preventDefault()
  filterForm.submit()
})

expenseTable.addEventListener('click', e => {
  if (e.target.classList.contains('button-delete-expense')) {
    e.preventDefault()
    if (window.confirm("please confirm you'd like to remove this expense")) {
      return e.target.parentElement.submit()
    }
  }
})
