export type IntermediateReportDecisionValue = "PASS" | "FAIL" | "NOT_SURE" | "PERM_FAIL" 

export type ParentalAuthCheckValue = 'VALID' | 'NOT_VALID' | 'WRONG_CENTER';

export const parentalAuthCheckOptions = [
  { value: "VALID", label: "VALID" },
  { value: "NOT_VALID", label: "NOT VALID" },
  { value: "WRONG_CENTER", label: "WRONG CENTER" },
]

export const PARENTAL_AUTH_STYLES: Record<ParentalAuthCheckValue, string> = {
  VALID: 'rounded-xl text-center px-4 py-1 w-[10rem] bg-[#41D997] text-black',
  NOT_VALID: 'rounded-xl text-center px-4 py-1 w-[10rem] bg-[#b33d20] text-white',
  WRONG_CENTER: 'rounded-xl text-center px-4 py-1 w-[10rem] bg-[#EAED9A] text-black',
};

export default function ParentalAuthCheck(
  { parentalAuthCheck } : { parentalAuthCheck: ParentalAuthCheckValue | null}
) {
  if (!parentalAuthCheck) return <span className="text-gray-400">No decision yet</span>

  return (
    <div className={PARENTAL_AUTH_STYLES[parentalAuthCheck]}>
      {parentalAuthCheck.split("_").join(" ")}
    </div>
  )
}
