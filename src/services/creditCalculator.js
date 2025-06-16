export function calculateCredits(actionType, spend = []) {
  const baseMap = {
    module_usage: 10,
    social_post: 5,
    referral: 15,
    purchase: 20,
    coffee_wall: 8
  };

  const multiplierMap = {
    default: 0.1,
    ads: 0.15,
    tools: 0.2,
    content: 0.05
  };

  const base = baseMap[actionType] || 0;
  let bonus = 0;

  if (Array.isArray(spend)) {
    for (const entry of spend) {
      const multiplier = multiplierMap[entry.type] ?? multiplierMap.default;
      bonus += Math.floor(entry.amount * multiplier);
    }
  }

  return base + bonus;
}