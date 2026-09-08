export type IntermediateReportDecisionValue = "PASS" | "FAIL" | "NOT_SURE" | "PERM_FAIL" 

export const intermediateReportDecisionOptions = [
  { value: "PASS", label: "PASS" },
  { value: "FAIL", label: "FAIL" },
  { value: "PERM_FAIL", label: "PERM FAIL" },
  { value: "NOT_SURE", label: "NOT SURE" },
]

export const getIntermediateReportDecisionClassname = (
  decision: IntermediateReportDecisionValue,
  size: "sm" | "md",
) => {
  const baseClassname = `rounded-xl text-center ${size === "md" ? "px-4 py-1 w-[8rem]" : "px-2"}`
  let colorClassname

  switch (decision) {
    case "PASS":
      colorClassname = "bg-[#41D997] text-black"
      break
    case "FAIL":
      colorClassname = "bg-[#b33d20] text-white"
      break
    case "PERM_FAIL":
      colorClassname = "bg-[#6e2310] text-white"
      break
    case "NOT_SURE":
      colorClassname = "bg-[#EAED9A] text-black"
      break
  }

  return `${baseClassname} ${colorClassname}`
}

export default function IntermediateReportDecision({
  decision,
}: {
  decision: IntermediateReportDecisionValue | null
}) {
  if (!decision) return <span className="text-gray-400">No decision yet</span>

  return (
    <div className={getIntermediateReportDecisionClassname(decision, "md")}>
      {decision.split("_").join(" ")}
    </div>
  )
}
