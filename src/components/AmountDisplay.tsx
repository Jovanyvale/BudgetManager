import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?: string
    amount: number
}

export default function AmountDisplay({ label, amount }: AmountDisplayProps) {

    return (
        <>
            <p className="font-bold text-center text-2xl">
                {label && `${label.toUpperCase()}:`} <span className="text-blue3">{formatCurrency(amount)}</span>
            </p >
        </>
    )
}