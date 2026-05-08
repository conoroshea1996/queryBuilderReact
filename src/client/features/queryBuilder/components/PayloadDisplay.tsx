import { BackendQuery } from "../types";

interface PayloadDisplayProps {
    submittedData: BackendQuery | null;
}

export function PayloadDisplay({ submittedData }: PayloadDisplayProps) {
    if (!submittedData) return null;

    return (
        <section className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                <h2 className="text-sm font-semibold text-gray-700">
                    Generated Query
                </h2>
            </div>

            <pre className="bg-gray-950 p-4 overflow-x-auto text-sm leading-6">
                <code className="text-green-400">
                    {JSON.stringify(submittedData, null, 2)}
                </code>
            </pre>
        </section>
    )
}