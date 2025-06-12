const DAY_HOURSE = 24;
const ACCEPTABLE_FORECAST_DEVIATION = 0.05; 
const MEGA_TO_KILO = 1000;

document.addEventListener("DOMContentLoaded", () => {
	const inputIds = ["avg_daily_power", "avg_deviation", "energy_cost"];
	const inputs = inputIds.map(id => document.getElementById(id));
  
	document.querySelector("button").addEventListener("click", () => {
	  const values = getInputValues();
	  const validationResults = validateInputs(values);
  
	  highlightErrors(validationResults);
  
	  if (!validationResults.every(v => v.isValid)) {
		showResult("Будь ласка, заповніть усі поля правильно.");
		return;
	  }
  
	  const profit = calculateProfit(values);
	  showResult(`Орієнтовний прибуток: ${profit.toFixed(2)} грн`);
	});
  
	function getInputValues() {
	  return {
		avg_daily_power: parseFloat(document.getElementById("avg_daily_power").value),
		avg_deviation: parseFloat(document.getElementById("avg_deviation").value),
		energy_cost: parseFloat(document.getElementById("energy_cost").value)
	  };
	}
  
	function validateInputs({ avg_daily_power, avg_deviation, energy_cost }) {
	  return [
		{ id: "avg_daily_power", isValid: avg_daily_power > 0 },
		{ id: "avg_deviation", isValid: avg_deviation > 0 },
		{ id: "energy_cost", isValid: energy_cost > 0 },
	  ];
	}
  
	function highlightErrors(validationResults) {
	  validationResults.forEach(result => {
		const input = document.getElementById(result.id);
		if (!result.isValid) 
		  input.classList.add("input-error");
		else 
		  input.classList.remove("input-error");
		
	  });
	}
  
	function calculateProfit({ avg_daily_power, avg_deviation, energy_cost }) {
		const unbalance_energy = integrateNormal(avg_daily_power, avg_deviation) ;
		const unbalance_profit = energy_cost * avg_daily_power * DAY_HOURSE * MEGA_TO_KILO * unbalance_energy;
		const fine = energy_cost * avg_daily_power * DAY_HOURSE * MEGA_TO_KILO * (1-unbalance_energy);
		const profit = unbalance_profit - fine;
		return profit;

	}
	
	function integrateNormal(avg_daily_power, avg_deviation, steps = 100000) {
		const a = avg_daily_power - ACCEPTABLE_FORECAST_DEVIATION * avg_daily_power;
		const b = avg_daily_power + ACCEPTABLE_FORECAST_DEVIATION * avg_daily_power;
		const dx = (b - a) / steps;
	  
		let area = 0;
	  
		for (let i = 0; i < steps; i++) {
		  const x = a + i * dx + dx / 2;
		  area += normalDistribution(x, avg_daily_power, avg_deviation) * dx;
		}
	  
		return area;
	}

	function normalDistribution(p, avg_daily_power, avg_deviation) {
		return Math.exp(-0.5 * ((p - avg_daily_power) / avg_deviation) ** 2) /
			   (avg_deviation * Math.sqrt(2 * Math.PI));
	}
  
	function showResult(message) {
	  document.getElementById("result").textContent = message;
	}
  });
  