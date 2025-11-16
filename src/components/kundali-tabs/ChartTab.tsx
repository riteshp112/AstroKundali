import { Card } from '../ui/card';
import type { KundaliData } from '../../App';

interface ChartTabProps {
  chartStyle: 'north' | 'south' | 'east';
  kundali: KundaliData;
}

// Mock planetary data
const mockPlanets = [
  { planet: 'Sun', house: 1, sign: 'Aries' },
  { planet: 'Moon', house: 4, sign: 'Cancer' },
  { planet: 'Mars', house: 10, sign: 'Capricorn' },
  { planet: 'Mercury', house: 2, sign: 'Taurus' },
  { planet: 'Jupiter', house: 9, sign: 'Sagittarius' },
  { planet: 'Venus', house: 5, sign: 'Leo' },
  { planet: 'Saturn', house: 11, sign: 'Aquarius' },
  { planet: 'Rahu', house: 6, sign: 'Virgo' },
  { planet: 'Ketu', house: 12, sign: 'Pisces' },
];

export default function ChartTab({ chartStyle, kundali }: ChartTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Chart */}
      <div className="lg:col-span-2">
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-primary">Lagna Chart (D1)</h4>
            <span className="text-sm text-text-light">{chartStyle === 'north' ? 'North Indian' : chartStyle === 'south' ? 'South Indian' : 'East Indian'} Style</span>
          </div>

          {chartStyle === 'north' && <NorthIndianChart planets={mockPlanets} />}
          {chartStyle === 'south' && <SouthIndianChart planets={mockPlanets} />}
          {chartStyle === 'east' && <EastIndianChart planets={mockPlanets} />}
        </Card>
      </div>

      {/* Chart Info */}
      <div className="space-y-6">
        <Card className="p-6 bg-white">
          <h5 className="text-primary mb-4">Chart Information</h5>
          <div className="space-y-3">
            <InfoRow label="Ascendant" value="Aries (Mesha)" />
            <InfoRow label="Ascendant Lord" value="Mars" />
            <InfoRow label="Moon Sign" value="Cancer (Karka)" />
            <InfoRow label="Nakshatra" value="Pushya (3rd Pada)" />
            <InfoRow label="Ayanamsa" value="Lahiri" />
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <h5 className="text-primary mb-4">Legend</h5>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-maroon"></div>
              <span className="text-text">Malefic Planets</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-teal"></div>
              <span className="text-text">Benefic Planets</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <span className="text-text">Ascendant</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-text-light text-sm">{label}</span>
      <span className="text-text">{value}</span>
    </div>
  );
}

interface PlanetData {
  planet: string;
  house: number;
  sign: string;
}

// North Indian Chart (Diamond shaped)
function NorthIndianChart({ planets }: { planets: PlanetData[] }) {
  const getHousePlanets = (house: number) => {
    return planets.filter(p => p.house === house).map(p => p.planet.substring(0, 2)).join(', ');
  };

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Diamond outline */}
        <path
          d="M 200 20 L 380 200 L 200 380 L 20 200 Z"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2"
        />
        
        {/* Inner diagonals */}
        <line x1="200" y1="20" x2="200" y2="380" stroke="var(--color-primary)" strokeWidth="1" />
        <line x1="20" y1="200" x2="380" y2="200" stroke="var(--color-primary)" strokeWidth="1" />
        
        {/* House numbers and planets */}
        {/* House 1 (Top) */}
        <text x="200" y="45" textAnchor="middle" className="text-xs fill-secondary">Asc</text>
        <text x="200" y="80" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(1)}</text>
        
        {/* House 2 (Top-Right) */}
        <text x="280" y="100" textAnchor="middle" className="text-xs fill-text-light">2</text>
        <text x="280" y="120" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(2)}</text>
        
        {/* House 3 (Right-Top) */}
        <text x="340" y="140" textAnchor="middle" className="text-xs fill-text-light">3</text>
        <text x="340" y="160" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(3)}</text>
        
        {/* House 4 (Right) */}
        <text x="360" y="200" textAnchor="middle" className="text-xs fill-text-light">4</text>
        <text x="340" y="220" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(4)}</text>
        
        {/* House 5 (Right-Bottom) */}
        <text x="340" y="260" textAnchor="middle" className="text-xs fill-text-light">5</text>
        <text x="340" y="280" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(5)}</text>
        
        {/* House 6 (Bottom-Right) */}
        <text x="280" y="300" textAnchor="middle" className="text-xs fill-text-light">6</text>
        <text x="280" y="320" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(6)}</text>
        
        {/* House 7 (Bottom) */}
        <text x="200" y="360" textAnchor="middle" className="text-xs fill-text-light">7</text>
        <text x="200" y="340" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(7)}</text>
        
        {/* House 8 (Bottom-Left) */}
        <text x="120" y="300" textAnchor="middle" className="text-xs fill-text-light">8</text>
        <text x="120" y="320" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(8)}</text>
        
        {/* House 9 (Left-Bottom) */}
        <text x="60" y="260" textAnchor="middle" className="text-xs fill-text-light">9</text>
        <text x="60" y="280" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(9)}</text>
        
        {/* House 10 (Left) */}
        <text x="40" y="200" textAnchor="middle" className="text-xs fill-text-light">10</text>
        <text x="60" y="220" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(10)}</text>
        
        {/* House 11 (Left-Top) */}
        <text x="60" y="140" textAnchor="middle" className="text-xs fill-text-light">11</text>
        <text x="60" y="160" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(11)}</text>
        
        {/* House 12 (Top-Left) */}
        <text x="120" y="100" textAnchor="middle" className="text-xs fill-text-light">12</text>
        <text x="120" y="120" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(12)}</text>
      </svg>
    </div>
  );
}

// South Indian Chart (Square grid)
function SouthIndianChart({ planets }: { planets: PlanetData[] }) {
  const getHousePlanets = (house: number) => {
    return planets.filter(p => p.house === house).map(p => p.planet.substring(0, 2)).join(', ');
  };

  // South Indian houses are arranged differently - fixed positions for signs
  const housePositions = [
    { x: 100, y: 50 },    // House 1 (varies)
    { x: 200, y: 50 },    // House 2
    { x: 300, y: 50 },    // House 3
    { x: 350, y: 100 },   // House 4
    { x: 350, y: 200 },   // House 5
    { x: 350, y: 300 },   // House 6
    { x: 300, y: 350 },   // House 7
    { x: 200, y: 350 },   // House 8
    { x: 100, y: 350 },   // House 9
    { x: 50, y: 300 },    // House 10
    { x: 50, y: 200 },    // House 11
    { x: 50, y: 100 },    // House 12
  ];

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Outer square */}
        <rect x="40" y="40" width="320" height="320" fill="none" stroke="var(--color-primary)" strokeWidth="2" />
        
        {/* Grid lines */}
        <line x1="140" y1="40" x2="140" y2="360" stroke="var(--color-primary)" strokeWidth="1" />
        <line x1="260" y1="40" x2="260" y2="360" stroke="var(--color-primary)" strokeWidth="1" />
        <line x1="40" y1="140" x2="360" y2="140" stroke="var(--color-primary)" strokeWidth="1" />
        <line x1="40" y1="260" x2="360" y2="260" stroke="var(--color-primary)" strokeWidth="1" />
        
        {/* Diagonal lines */}
        <line x1="40" y1="40" x2="140" y2="140" stroke="var(--color-primary)" strokeWidth="1" />
        <line x1="260" y1="40" x2="360" y2="140" stroke="var(--color-primary)" strokeWidth="1" />
        <line x1="40" y1="260" x2="140" y2="360" stroke="var(--color-primary)" strokeWidth="1" />
        <line x1="260" y1="360" x2="360" y2="260" stroke="var(--color-primary)" strokeWidth="1" />
        
        {/* Houses with planets */}
        {housePositions.map((pos, i) => (
          <g key={i}>
            <text x={pos.x} y={pos.y - 5} textAnchor="middle" className="text-xs fill-text-light">
              {i === 0 ? 'Asc' : i + 1}
            </text>
            <text x={pos.x} y={pos.y + 15} textAnchor="middle" className="text-xs fill-text">
              {getHousePlanets(i + 1)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// East Indian Chart (Rectangular grid)
function EastIndianChart({ planets }: { planets: PlanetData[] }) {
  const getHousePlanets = (house: number) => {
    return planets.filter(p => p.house === house).map(p => p.planet.substring(0, 2)).join(', ');
  };

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* 3x4 Grid */}
        <rect x="40" y="40" width="320" height="320" fill="none" stroke="var(--color-primary)" strokeWidth="2" />
        
        {/* Vertical lines */}
        <line x1="146.67" y1="40" x2="146.67" y2="360" stroke="var(--color-primary)" strokeWidth="1" />
        <line x1="253.33" y1="40" x2="253.33" y2="360" stroke="var(--color-primary)" strokeWidth="1" />
        
        {/* Horizontal lines */}
        <line x1="40" y1="120" x2="360" y2="120" stroke="var(--color-primary)" strokeWidth="1" />
        <line x1="40" y1="200" x2="360" y2="200" stroke="var(--color-primary)" strokeWidth="1" />
        <line x1="40" y1="280" x2="360" y2="280" stroke="var(--color-primary)" strokeWidth="1" />
        
        {/* Houses - arranged in specific pattern */}
        {/* Row 1 */}
        <text x="93" y="75" textAnchor="middle" className="text-xs fill-secondary">Asc</text>
        <text x="93" y="95" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(1)}</text>
        
        <text x="200" y="75" textAnchor="middle" className="text-xs fill-text-light">12</text>
        <text x="200" y="95" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(12)}</text>
        
        <text x="307" y="75" textAnchor="middle" className="text-xs fill-text-light">11</text>
        <text x="307" y="95" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(11)}</text>
        
        {/* Row 2 */}
        <text x="93" y="155" textAnchor="middle" className="text-xs fill-text-light">2</text>
        <text x="93" y="175" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(2)}</text>
        
        <text x="307" y="155" textAnchor="middle" className="text-xs fill-text-light">10</text>
        <text x="307" y="175" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(10)}</text>
        
        {/* Row 3 */}
        <text x="93" y="235" textAnchor="middle" className="text-xs fill-text-light">3</text>
        <text x="93" y="255" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(3)}</text>
        
        <text x="307" y="235" textAnchor="middle" className="text-xs fill-text-light">9</text>
        <text x="307" y="255" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(9)}</text>
        
        {/* Row 4 */}
        <text x="93" y="315" textAnchor="middle" className="text-xs fill-text-light">4</text>
        <text x="93" y="335" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(4)}</text>
        
        <text x="200" y="315" textAnchor="middle" className="text-xs fill-text-light">5</text>
        <text x="200" y="335" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(5)}</text>
        
        <text x="307" y="315" textAnchor="middle" className="text-xs fill-text-light">6</text>
        <text x="307" y="335" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(6)}</text>
        
        {/* Center section */}
        <text x="200" y="235" textAnchor="middle" className="text-xs fill-text-light">7</text>
        <text x="200" y="255" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(7)}</text>
        <text x="200" y="275" textAnchor="middle" className="text-xs fill-text">{getHousePlanets(8)}</text>
      </svg>
    </div>
  );
}
