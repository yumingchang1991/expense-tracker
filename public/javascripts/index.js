const filterForm = document.querySelector('#filter-form')
const Select = filterForm.querySelector('select')

Select.addEventListener('change', e => {
  e.preventDefault()
  filterForm.submit()
})