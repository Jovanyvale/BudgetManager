import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import "react-circular-progressbar/dist/styles.css";

export default function Tracker() {

    const { state, dispatch, totalExpenses, displayAviable } = useBudget();

    const percentage = +((totalExpenses / state.budget) * 100).toFixed(1)

    return (
        <>
            <h1 className="font-bold mb-4 text-lg">Budget tracker</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="flex justify-center justify-self-center w-80">
                    <CircularProgressbar
                        value={percentage}
                        styles={buildStyles({
                            pathColor: percentage === 100 ? '#ff471a' : '#009EFF',
                            textColor: percentage === 100 ? '#ff471a' : '#009EFF'
                        })}
                        text={`${percentage}%`}
                    />
                </div>

                <div className="flex flex-col justify-center">
                    <div className="mb-4">
                        <AmountDisplay
                            label="budget"
                            amount={state.budget}
                        />

                        <AmountDisplay
                            label="spended"
                            amount={totalExpenses}
                        />

                        <AmountDisplay
                            label="aviable"
                            amount={displayAviable}
                        />
                    </div>

                    <button className="border-none bg-red-500 w-full p-2 font-bold rounded-md text-white text-lg"
                        onClick={() => dispatch({ type: "reset-app" })}>
                        Reset app
                    </button>
                </div>

            </div >

        </>
    )
}