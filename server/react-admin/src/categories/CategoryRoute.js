import React, { useEffect, useState } from 'react'
import CategoryTable from './CategoryTable'

function CategoryRoute() {
  const [categories, setCategories] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(false)

  useEffect(() => {
    async function fetchCategories() {
      setLoadingCategories(true)
      const categoriesResponse = await fetch('/api/v1/categories')
      return await categoriesResponse.json()
    }
    fetchCategories().then(setCategories)
    setLoadingCategories(false)
  }, [])
  return (
    <>
      <CategoryTable categories={categories} isLoading={loadingCategories} />
    </>
  )
}

export default CategoryRoute
