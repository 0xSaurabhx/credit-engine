export function validatePayload(payload) {
  const { userId, actionType, referrerId, spend } = payload;

  const validActions = ['module_usage', 'social_post', 'referral', 'purchase', 'coffee_wall'];

  if (!userId || typeof userId !== 'string') {
    return { valid: false, error: 'Invalid or missing userId' };
  }
  if (!actionType || !validActions.includes(actionType)) {
    return { valid: false, error: 'Invalid or missing actionType' };
  }
  if (referrerId && typeof referrerId !== 'string') {
    return { valid: false, error: 'referrerId must be a string' };
  }
  if (spend !== undefined) {
    if (!Array.isArray(spend)) return { valid: false, error: 'spend must be an array of { type, amount } objects' };
    const invalid = spend.some(s => typeof s !== 'object' || typeof s.type !== 'string' || typeof s.amount !== 'number' || s.amount < 0);
    if (invalid) return { valid: false, error: 'each spend item must have a string type and a positive amount' };
  }

  return { valid: true };
}