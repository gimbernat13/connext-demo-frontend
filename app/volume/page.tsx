import { Suspense } from "react";
import Volume from "./volume";


export default async function Page() {
    return (
        <main>
                <Suspense fallback={<div>Loading...</div>}>
                    <Volume />
                </Suspense>
        </main>
    );
}
