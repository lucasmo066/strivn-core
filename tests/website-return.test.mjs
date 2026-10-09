import assert from 'node:assert/strict';
import { test } from 'node:test';
import { calculateWebsiteReturn } from '../lib/website-return.ts';

test('two customer contributions can cover the build without treating every lead as a customer', () => {
  const result = calculateWebsiteReturn({ investment: 2000, customerContribution: 1000, closeRatePercent: 25 });
  assert.equal(result.customersNeeded, 2);
  assert.equal(result.valuePerLead, 250);
  assert.equal(result.leadsNeeded, 8);
  assert.equal(result.monthsToRecover, null);
});

test('rounds up whole customers and leads needed to win those customers', () => {
  const result = calculateWebsiteReturn({ investment: 2500, customerContribution: 1000, closeRatePercent: 40 });
  assert.equal(result.customersNeeded, 3);
  assert.equal(result.leadsNeeded, 8);
});

test('does not add an extra customer because of floating-point currency arithmetic', () => {
  assert.equal(calculateWebsiteReturn({ investment: 0.07, customerContribution: 0.01 }).customersNeeded, 7);
  assert.equal(calculateWebsiteReturn({ investment: 2000.01, customerContribution: 1000 }).customersNeeded, 3);
});

test('subtracts ongoing costs before estimating time to recover the full build price', () => {
  const result = calculateWebsiteReturn({ investment: 3000, customerContribution: 500, closeRatePercent: 25, monthlyLeads: 10, monthlyCosts: 250 });
  assert.equal(result.monthlyNet, 1000);
  assert.equal(result.monthsToRecover, 3);
});

test('does not claim a payoff when no leads close or costs consume their contribution', () => {
  for (const input of [
    { closeRatePercent: 0, monthlyLeads: 10, monthlyCosts: 0 },
    { closeRatePercent: 100, monthlyLeads: 0, monthlyCosts: 0 },
    { closeRatePercent: 50, monthlyLeads: 4, monthlyCosts: 2000 },
    { closeRatePercent: 50, monthlyLeads: 4, monthlyCosts: 3000 },
  ]) {
    assert.equal(calculateWebsiteReturn({ investment: 2000, customerContribution: 1000, ...input }).monthsToRecover, null);
  }
});

test('rejects invalid build/customer inputs and withholds timing for invalid or missing assumptions', () => {
  for (const value of [NaN, Infinity, -1, 0]) {
    assert.equal(calculateWebsiteReturn({ investment: value, customerContribution: 1000 }), null);
    assert.equal(calculateWebsiteReturn({ investment: 2000, customerContribution: value }), null);
  }
  assert.equal(calculateWebsiteReturn({ investment: 2000, customerContribution: Number.MIN_VALUE }), null);
  for (const assumptions of [
    {}, { closeRatePercent: 101 }, { closeRatePercent: -1 },
    { closeRatePercent: 25, monthlyLeads: -1 },
    { closeRatePercent: 25, monthlyLeads: 10, monthlyCosts: -1 },
    { closeRatePercent: 25, monthlyLeads: Infinity },
  ]) {
    const result = calculateWebsiteReturn({ investment: 2000, customerContribution: 1000, ...assumptions });
    assert.equal(result.customersNeeded, 2);
    assert.equal(result.monthsToRecover, null);
  }
});

test('includes care exactly once in ongoing coverage and recovery', () => {
  const input = { investment: 4500, customerContribution: 2000, closeRatePercent: 25, monthlyLeads: 4, monthlyCosts: 150 };
  const buildOnly = calculateWebsiteReturn(input);
  const growth = calculateWebsiteReturn({ ...input, careCost: 350 });
  assert.equal(growth.customersNeeded, 3);
  assert.equal(growth.totalMonthlyCosts, 500);
  assert.equal(growth.monthlyCustomersNeeded, 1);
  assert.equal(growth.monthlyNet, 1500);
  assert.equal(growth.monthsToRecover, 3);
  assert.ok(growth.monthsToRecover > buildOnly.monthsToRecover);
});

test('shows ongoing customer coverage without requiring lead estimates', () => {
  assert.equal(calculateWebsiteReturn({ investment: 2000, customerContribution: 100, careCost: 350 }).monthlyCustomersNeeded, 4);
  assert.equal(calculateWebsiteReturn({ investment: 2000, customerContribution: 100, careCost: 200 }).monthlyCustomersNeeded, 2);
  assert.equal(calculateWebsiteReturn({ investment: 2000, customerContribution: 100 }).monthlyCustomersNeeded, 0);
});

test('invalid extra costs cannot be offset by a positive care cost', () => {
  for (const costs of [{ monthlyCosts: -100, careCost: 350 }, { monthlyCosts: 0, careCost: -1 }, { monthlyCosts: NaN, careCost: 350 }]) {
    const result = calculateWebsiteReturn({ investment: 4500, customerContribution: 2000, closeRatePercent: 25, monthlyLeads: 4, ...costs });
    assert.equal(result.monthlyCustomersNeeded, null);
    assert.equal(result.monthlyNet, null);
    assert.equal(result.monthsToRecover, null);
  }
});
