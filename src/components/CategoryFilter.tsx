import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";


export default function CategoryFilter() {

    const { dispatch } = useBudget()

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: "select-category", payload: { id: e.target.value } })
    }

    return (
        <div className="bg-white shadow-lg p-8 rounded-3xl">
            <form action="">
                <div className="flex flex-col md:flex-row md:items-center gap-3 ">
                    <label htmlFor="filterByCategory">Filter by category</label>
                    <select id="filterByCategory" onChange={handleChange} className="p-3 rounded-lg flex-1 bg-gray-200">
                        <option value="">All categories</option>
                        {categories.map(category => (
                            <option value={category.name}
                                key={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    )
}