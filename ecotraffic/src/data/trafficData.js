// Simulated traffic data — no external API used.
// This data is generated for educational demonstration purposes only.

export const cityOverview = [
  { city: 'Pune', level: 'High', avgSpeed: 26, color: '#f97316' },
  { city: 'Mumbai', level: 'Very High', avgSpeed: 18, color: '#ef4444' },
  { city: 'Bengaluru', level: 'High', avgSpeed: 22, color: '#f97316' },
  { city: 'Delhi', level: 'Moderate', avgSpeed: 31, color: '#eab308' },
]

export const roadTraffic = [
  { id: 1, city: 'Pune', road: 'Hinjewadi Road', level: 'High', avgSpeed: 24, delay: 18 },
  { id: 2, city: 'Pune', road: 'Baner Road', level: 'Moderate', avgSpeed: 35, delay: 8 },
  { id: 3, city: 'Pune', road: 'FC Road', level: 'Low', avgSpeed: 42, delay: 3 },
  { id: 4, city: 'Mumbai', road: 'Andheri', level: 'Very High', avgSpeed: 15, delay: 28 },
  { id: 5, city: 'Mumbai', road: 'Bandra West', level: 'High', avgSpeed: 20, delay: 22 },
  { id: 6, city: 'Mumbai', road: 'Marine Drive', level: 'Low', avgSpeed: 44, delay: 2 },
  { id: 7, city: 'Bengaluru', road: 'Whitefield', level: 'High', avgSpeed: 21, delay: 20 },
  { id: 8, city: 'Bengaluru', road: 'MG Road', level: 'Moderate', avgSpeed: 33, delay: 9 },
  { id: 9, city: 'Bengaluru', road: 'Electronic City', level: 'Very High', avgSpeed: 16, delay: 26 },
  { id: 10, city: 'Delhi', road: 'Connaught Place', level: 'Moderate', avgSpeed: 30, delay: 10 },
  { id: 11, city: 'Delhi', road: 'Ring Road', level: 'High', avgSpeed: 23, delay: 16 },
  { id: 12, city: 'Delhi', road: 'Lodhi Road', level: 'Low', avgSpeed: 40, delay: 4 },
]

export const levelStyles = {
  'Low': { badge: 'badge-low', dot: '#22c55e' },
  'Moderate': { badge: 'badge-moderate', dot: '#eab308' },
  'High': { badge: 'badge-high', dot: '#f97316' },
  'Very High': { badge: 'badge-veryhigh', dot: '#ef4444' },
}

export const cities = ['All Cities', ...new Set(roadTraffic.map(r => r.city))]
export const levels = ['All Levels', 'Low', 'Moderate', 'High', 'Very High']

// Emission factors: kg CO2 per litre of fuel
export const EMISSION_FACTORS = {
  petrol: 2.31,
  diesel: 2.68,
}

// Vehicle definitions: label, fuel type, default km/l efficiency
export const vehicleTypes = [
  { value: 'petrol-car', label: 'Petrol Car', fuel: 'petrol', defaultEfficiency: 15 },
  { value: 'diesel-car', label: 'Diesel Car', fuel: 'diesel', defaultEfficiency: 18 },
  { value: 'petrol-bike', label: 'Petrol Bike', fuel: 'petrol', defaultEfficiency: 55 },
  { value: 'public-bus', label: 'Public Bus (per passenger share)', fuel: 'diesel', defaultEfficiency: 4.5, passengerShare: 40 },
]

// CO2 per km (kg) for comparison options
export const comparisonOptions = [
  { name: 'Walking', co2PerKm: 0, note: 'Zero direct emissions' },
  { name: 'Cycling', co2PerKm: 0, note: 'Zero direct emissions' },
  { name: 'Public Transport', co2PerKm: 0.05, note: 'Shared emissions per passenger' },
  { name: 'Carpooling (2 people)', co2PerKm: 0.096, note: 'Emissions split between passengers' },
]

// Mode CO2 per km for the chart (kg CO2 per passenger-km)
export const modeEmissions = [
  { mode: 'Car (Petrol)', co2: 0.192 },
  { mode: 'Car (Diesel)', co2: 0.216 },
  { mode: 'Motorcycle', co2: 0.082 },
  { mode: 'Bus', co2: 0.05 },
  { mode: 'Train/Metro', co2: 0.041 },
  { mode: 'Cycling', co2: 0 },
  { mode: 'Walking', co2: 0 },
]

// Sustainability score lookup (out of 100)
export const travelModes = [
  { value: 'walking', label: 'Walking', score: 100, co2PerKm: 0 },
  { value: 'cycling', label: 'Cycling', score: 95, co2PerKm: 0 },
  { value: 'bus', label: 'Bus', score: 80, co2PerKm: 0.05 },
  { value: 'metro', label: 'Train/Metro', score: 85, co2PerKm: 0.041 },
  { value: 'carpool', label: 'Carpool', score: 65, co2PerKm: 0.096 },
  { value: 'motorcycle', label: 'Motorcycle', score: 45, co2PerKm: 0.082 },
  { value: 'car', label: 'Car', score: 20, co2PerKm: 0.192 },
]

export const greenOptions = [
  {
    icon: 'Footprints',
    title: 'Walking',
    description: 'Best for short distances. Completely free and zero direct emissions.',
    benefit: '100% reduction in travel emissions',
    distance: '0 – 2 km',
  },
  {
    icon: 'Bike',
    title: 'Cycling',
    description: 'Zero direct vehicle emissions and great for your health too.',
    benefit: '100% reduction in travel emissions',
    distance: '0 – 5 km',
  },
  {
    icon: 'BusFront',
    title: 'Public Transport',
    description: 'Buses and metros carry many passengers, so emissions per person stay low.',
    benefit: 'Up to 75% lower emissions per passenger',
    distance: '5 – 20 km',
  },
  {
    icon: 'Users',
    title: 'Carpooling',
    description: 'Sharing a ride reduces the number of vehicles on the road.',
    benefit: 'Up to 50% lower emissions per person',
    distance: '10+ km',
  },
]

export const tips = [
  'Using public transport instead of a private vehicle can significantly reduce emissions per passenger.',
  'Idling in traffic wastes fuel — switching off your engine at long signals saves fuel and cuts emissions.',
  'Carpooling just twice a week can reduce your weekly travel emissions by up to 40%.',
  'Keeping your tyres properly inflated improves fuel efficiency by 3–5%.',
  'Combining short trips into one journey reduces cold starts, which produce more emissions.',
]
