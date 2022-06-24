module.exports = {
  // for multiple records in home page
  isCategoryFilterSelected(category) {
    if (this.categoryFilter) {
      return this.categoryFilter === category
    }
    return false
  },
  
  // for single record in edit record page
  isCategorySelected(category) {
    return this.record.categoryId.name === category.toUpperCase()
  }
}