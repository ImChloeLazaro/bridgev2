import Link from "next/link"

const OnboardingHeader = () => {
    return(
        <>
            <div className="bg-red-700 py-2 text-white px-2"><span className="font-semibold">INFORMATION</span>: You don't have any onboarding data yet, click <Link className="font-semibold" href='/onboarding'>here</Link> to proceed.</div>
        </>
    )
}

export default OnboardingHeader