import { Card } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

// Mock planetary data
const planetaryPositions = [
  {
    planet: 'Sun (Su)',
    sign: 'Aries',
    degree: '12°34\'21"',
    nakshatra: 'Ashwini',
    pada: '2',
    house: '1',
    retrograde: false,
  },
  {
    planet: 'Moon (Mo)',
    sign: 'Cancer',
    degree: '23°45\'12"',
    nakshatra: 'Pushya',
    pada: '3',
    house: '4',
    retrograde: false,
  },
  {
    planet: 'Mars (Ma)',
    sign: 'Capricorn',
    degree: '8°12\'45"',
    nakshatra: 'Uttara Ashadha',
    pada: '1',
    house: '10',
    retrograde: false,
  },
  {
    planet: 'Mercury (Me)',
    sign: 'Taurus',
    degree: '18°56\'34"',
    nakshatra: 'Rohini',
    pada: '4',
    house: '2',
    retrograde: true,
  },
  {
    planet: 'Jupiter (Ju)',
    sign: 'Sagittarius',
    degree: '27°23\'18"',
    nakshatra: 'Uttara Ashadha',
    pada: '2',
    house: '9',
    retrograde: false,
  },
  {
    planet: 'Venus (Ve)',
    sign: 'Leo',
    degree: '15°42\'56"',
    nakshatra: 'Purva Phalguni',
    pada: '3',
    house: '5',
    retrograde: false,
  },
  {
    planet: 'Saturn (Sa)',
    sign: 'Aquarius',
    degree: '21°18\'43"',
    nakshatra: 'Purva Bhadrapada',
    pada: '4',
    house: '11',
    retrograde: false,
  },
  {
    planet: 'Rahu (Ra)',
    sign: 'Virgo',
    degree: '14°32\'29"',
    nakshatra: 'Hasta',
    pada: '2',
    house: '6',
    retrograde: true,
  },
  {
    planet: 'Ketu (Ke)',
    sign: 'Pisces',
    degree: '14°32\'29"',
    nakshatra: 'Uttara Bhadrapada',
    pada: '2',
    house: '12',
    retrograde: true,
  },
];

export default function PlanetsTab() {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white">
        <h4 className="text-primary mb-6">Planetary Positions</h4>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Planet</TableHead>
                <TableHead>Sign (Rashi)</TableHead>
                <TableHead>Degree</TableHead>
                <TableHead>Nakshatra</TableHead>
                <TableHead>Pada</TableHead>
                <TableHead>House</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {planetaryPositions.map((planet, index) => (
                <TableRow key={index}>
                  <TableCell>{planet.planet}</TableCell>
                  <TableCell>{planet.sign}</TableCell>
                  <TableCell className="font-mono text-sm">{planet.degree}</TableCell>
                  <TableCell>{planet.nakshatra}</TableCell>
                  <TableCell className="text-center">{planet.pada}</TableCell>
                  <TableCell className="text-center">{planet.house}</TableCell>
                  <TableCell>
                    {planet.retrograde ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-accent-maroon/10 text-accent-maroon">
                        Retrograde ℞
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-accent-teal/10 text-accent-teal">
                        Direct
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white">
          <h5 className="text-primary mb-4">Planetary Strength</h5>
          <div className="space-y-3">
            {['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'].map((planet) => (
              <div key={planet} className="flex items-center justify-between">
                <span className="text-text">{planet}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent-teal"
                      style={{ width: `${Math.random() * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-text-light w-12 text-right">
                    {Math.floor(Math.random() * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <h5 className="text-primary mb-4">Planetary Relationships</h5>
          <div className="space-y-3 text-sm">
            <InfoRow label="Yoga Karaka" value="Mars" />
            <InfoRow label="Benefics" value="Jupiter, Venus, Mercury" />
            <InfoRow label="Malefics" value="Saturn, Mars, Sun" />
            <InfoRow label="Exalted" value="Sun, Mars" />
            <InfoRow label="Debilitated" value="None" />
            <InfoRow label="Combust" value="Mercury" />
          </div>
        </Card>
      </div>

      {/* Nakshatra Info */}
      <Card className="p-6 bg-white">
        <h5 className="text-primary mb-4">Nakshatra Details</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-text-light text-sm mb-2">Birth Nakshatra</p>
            <p className="text-text">Pushya</p>
            <p className="text-text-light text-sm mt-1">Pada 3 of 4</p>
          </div>
          <div>
            <p className="text-text-light text-sm mb-2">Nakshatra Lord</p>
            <p className="text-text">Saturn (Shani)</p>
          </div>
          <div>
            <p className="text-text-light text-sm mb-2">Deity</p>
            <p className="text-text">Brihaspati</p>
          </div>
          <div>
            <p className="text-text-light text-sm mb-2">Symbol</p>
            <p className="text-text">Cow's udder, Lotus, Arrow</p>
          </div>
          <div>
            <p className="text-text-light text-sm mb-2">Quality</p>
            <p className="text-text">Light, Swift (Laghu, Kshipra)</p>
          </div>
          <div>
            <p className="text-text-light text-sm mb-2">Gana</p>
            <p className="text-text">Deva (Divine)</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-text-light">{label}</span>
      <span className="text-text">{value}</span>
    </div>
  );
}
