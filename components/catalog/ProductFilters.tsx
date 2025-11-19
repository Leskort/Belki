'use client'

interface Category {
  id: string
  name: string
  slug: string
}

interface ProductFiltersProps {
  categories: Category[]
  selectedCategory: string | null
  onCategoryChange: (slug: string | null) => void
}

export function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          selectedCategory === 'all'
            ? 'bg-neon-50 text-white horror-glow'
            : 'bg-dark-200 text-gray-300 hover:bg-dark-300'
        }`}
      >
        Все товары
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.slug)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedCategory === category.slug
              ? 'bg-neon-50 text-white horror-glow'
              : 'bg-dark-200 text-gray-300 hover:bg-dark-300'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}


