type WebsiteReturnInputs = {
  investment: number;
  customerContribution: number;
  closeRatePercent?: number;
  monthlyLeads?: number;
  monthlyCosts?: number;
  careCost?: number;
};

// Avoid an extra customer/lead when decimal arithmetic lands just above an integer.
const roundUp = (value: number) => Math.ceil(value - Number.EPSILON * Math.abs(value) * 2);

/** Recovery of the build cost from additional business attributed to the site. */
export function calculateWebsiteReturn({
  investment,
  customerContribution,
  closeRatePercent,
  monthlyLeads,
  monthlyCosts = 0,
  careCost = 0,
}: WebsiteReturnInputs) {
  if (!Number.isFinite(investment) || investment <= 0 ||
      !Number.isFinite(customerContribution) || customerContribution <= 0) return null;

  const customersNeeded = Math.max(1, roundUp(investment / customerContribution));
  if (!Number.isSafeInteger(customersNeeded)) return null;
  const totalMonthlyCosts = Number.isFinite(monthlyCosts) && monthlyCosts >= 0 &&
    Number.isFinite(careCost) && careCost >= 0 && Number.isFinite(monthlyCosts + careCost)
    ? monthlyCosts + careCost : null;
  const recurringEstimate = totalMonthlyCosts !== null ? roundUp(totalMonthlyCosts / customerContribution) : null;
  const monthlyCustomersNeeded = recurringEstimate !== null && Number.isSafeInteger(recurringEstimate) ? recurringEstimate : null;
  const validRate = closeRatePercent !== undefined && Number.isFinite(closeRatePercent) &&
    closeRatePercent >= 0 && closeRatePercent <= 100;
  const valuePerLead = validRate ? customerContribution * (closeRatePercent / 100) : null;
  const leadEstimate = valuePerLead !== null && valuePerLead > 0
    ? roundUp(customersNeeded / (closeRatePercent! / 100))
    : null;
  const leadsNeeded = leadEstimate !== null && Number.isSafeInteger(leadEstimate) ? leadEstimate : null;
  const validMonthlyInputs = monthlyLeads !== undefined && Number.isFinite(monthlyLeads) && monthlyLeads >= 0 &&
    totalMonthlyCosts !== null;
  const netEstimate = valuePerLead !== null && validMonthlyInputs
    ? monthlyLeads * valuePerLead - totalMonthlyCosts!
    : null;
  const monthlyNet = netEstimate !== null && Number.isFinite(netEstimate) ? netEstimate : null;
  const recoveryEstimate = monthlyNet !== null && monthlyNet > 0 ? investment / monthlyNet : null;
  const monthsToRecover = recoveryEstimate !== null && Number.isFinite(recoveryEstimate) ? recoveryEstimate : null;

  return { customersNeeded, monthlyCustomersNeeded, totalMonthlyCosts, valuePerLead, leadsNeeded, monthlyNet, monthsToRecover };
}
