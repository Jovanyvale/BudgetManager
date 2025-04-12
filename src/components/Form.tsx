import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"

export default function Form() {

    const [budget, setBudget] = useState(0)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber)
    }

    const validateBudget = useMemo(() => {
        return isNaN(budget) || budget === 0;
    }, [budget])

    const { dispatch } = useBudget()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'add-budget', payload: { budget } })
    }

    return (
        <form
            onSubmit={handleSubmit}>
            <div className="flex flex-col max-w-full space-y-2 mx-auto">
                <label className="font-bold text-lg" htmlFor="budget">Define budget</label>
                <input
                    id="budget"
                    name="budget"
                    value={budget}
                    type="number"
                    placeholder="Set your budget"
                    onChange={handleChange}
                    className="budgetInput border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue3 focus:border-blue3"
                />
            </div>
            <input
                type="submit"
                value="Set budget"
                className="disabled:opacity-25 rounded-lg bg-blue3 w-full mx-auto mt-4 p-4 text-white text-lg border-none cursor-pointer"
                disabled={validateBudget}
            />
        </form>
    )
}