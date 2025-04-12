import { PropsWithChildren } from "react";

export default function ErrorMessage({ children }: PropsWithChildren) {

    return (
        <p className="bg-red-500 text-white text-sm p-2 text-center m-2">
            {children}
        </p>
    )
}