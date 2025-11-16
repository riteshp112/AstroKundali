import { useState } from 'react';
import { Card } from '../ui/card';
import { ChevronDown, ChevronRight } from 'lucide-react';

// Mock Dasha data
const dashaData = [
  {
    planet: 'Saturn',
    startDate: '2018-03-15',
    endDate: '2037-03-15',
    years: 19,
    antarDashas: [
      {
        planet: 'Saturn',
        startDate: '2018-03-15',
        endDate: '2021-01-22',
        years: 2.86,
        pratyantarDashas: [
          { planet: 'Saturn', startDate: '2018-03-15', endDate: '2018-09-14', months: 6 },
          { planet: 'Mercury', startDate: '2018-09-14', endDate: '2019-02-21', months: 5.2 },
          { planet: 'Ketu', startDate: '2019-02-21', endDate: '2019-07-01', months: 4.3 },
        ],
      },
      {
        planet: 'Mercury',
        startDate: '2021-01-22',
        endDate: '2023-08-01',
        years: 2.53,
      },
      {
        planet: 'Ketu',
        startDate: '2023-08-01',
        endDate: '2024-09-10',
        years: 1.11,
      },
      {
        planet: 'Venus',
        startDate: '2024-09-10',
        endDate: '2027-11-10',
        years: 3.17,
      },
      {
        planet: 'Sun',
        startDate: '2027-11-10',
        endDate: '2028-10-24',
        years: 0.95,
      },
    ],
  },
  {
    planet: 'Mercury',
    startDate: '2037-03-15',
    endDate: '2054-03-15',
    years: 17,
    antarDashas: [
      {
        planet: 'Mercury',
        startDate: '2037-03-15',
        endDate: '2039-08-11',
        years: 2.41,
      },
      {
        planet: 'Ketu',
        startDate: '2039-08-11',
        endDate: '2040-08-07',
        years: 0.99,
      },
    ],
  },
  {
    planet: 'Ketu',
    startDate: '2054-03-15',
    endDate: '2061-03-15',
    years: 7,
    antarDashas: [],
  },
];

export default function DashaTab() {
  const [expandedMaha, setExpandedMaha] = useState<number | null>(0);
  const [expandedAntar, setExpandedAntar] = useState<number | null>(null);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getCurrentDasha = () => {
    const now = new Date();
    for (const maha of dashaData) {
      const start = new Date(maha.startDate);
      const end = new Date(maha.endDate);
      if (now >= start && now <= end) {
        for (const antar of maha.antarDashas) {
          const antarStart = new Date(antar.startDate);
          const antarEnd = new Date(antar.endDate);
          if (now >= antarStart && now <= antarEnd) {
            return { maha: maha.planet, antar: antar.planet };
          }
        }
        return { maha: maha.planet, antar: null };
      }
    }
    return null;
  };

  const currentDasha = getCurrentDasha();

  return (
    <div className="space-y-6">
      {/* Current Dasha Card */}
      <Card className="p-6 bg-gradient-to-br from-primary to-[#3d4a6e] text-white">
        <h4 className="text-white mb-4">Current Dasha Period</h4>
        {currentDasha ? (
          <div className="space-y-3">
            <div>
              <p className="text-white/70 text-sm mb-1">Maha Dasha</p>
              <p className="text-2xl text-secondary">{currentDasha.maha}</p>
            </div>
            {currentDasha.antar && (
              <div>
                <p className="text-white/70 text-sm mb-1">Antar Dasha</p>
                <p className="text-xl text-accent-teal">{currentDasha.antar}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-white/80">Calculating current dasha...</p>
        )}
      </Card>

      {/* Vimshottari Dasha Timeline */}
      <Card className="p-6 bg-white">
        <h4 className="text-primary mb-6">Vimshottari Dasha Timeline</h4>
        
        <div className="space-y-4">
          {dashaData.map((maha, mahaIndex) => {
            const isExpanded = expandedMaha === mahaIndex;
            const isCurrent = currentDasha?.maha === maha.planet;

            return (
              <div
                key={mahaIndex}
                className={`border rounded-lg overflow-hidden ${
                  isCurrent ? 'border-secondary shadow-md' : 'border-border'
                }`}
              >
                {/* Maha Dasha Header */}
                <button
                  onClick={() => setExpandedMaha(isExpanded ? null : mahaIndex)}
                  className={`w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                    isCurrent ? 'bg-secondary/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-text-light" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-text-light" />
                    )}
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <h5 className="text-primary">
                          {maha.planet} Maha Dasha
                        </h5>
                        {isCurrent && (
                          <span className="px-2 py-1 text-xs rounded-full bg-secondary text-white">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-light">
                        {formatDate(maha.startDate)} - {formatDate(maha.endDate)} • {maha.years} years
                      </p>
                    </div>
                  </div>
                </button>

                {/* Antar Dashas */}
                {isExpanded && maha.antarDashas.length > 0 && (
                  <div className="border-t border-border bg-gray-50/50">
                    {maha.antarDashas.map((antar, antarIndex) => {
                      const isAntarExpanded = expandedAntar === antarIndex;
                      const isAntarCurrent = currentDasha?.antar === antar.planet && isCurrent;

                      return (
                        <div key={antarIndex} className="border-b last:border-b-0 border-border">
                          {/* Antar Dasha */}
                          <button
                            onClick={() => setExpandedAntar(isAntarExpanded ? null : antarIndex)}
                            className={`w-full p-4 pl-12 flex items-center justify-between hover:bg-white transition-colors ${
                              isAntarCurrent ? 'bg-accent-teal/5' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {antar.pratyantarDashas && antar.pratyantarDashas.length > 0 ? (
                                isAntarExpanded ? (
                                  <ChevronDown className="w-4 h-4 text-text-light" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-text-light" />
                                )
                              ) : (
                                <div className="w-4" />
                              )}
                              <div className="text-left">
                                <div className="flex items-center gap-2">
                                  <p className="text-text">
                                    {antar.planet} Antar Dasha
                                  </p>
                                  {isAntarCurrent && (
                                    <span className="px-2 py-1 text-xs rounded-full bg-accent-teal text-white">
                                      Current
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-text-light">
                                  {formatDate(antar.startDate)} - {formatDate(antar.endDate)} • {antar.years} years
                                </p>
                              </div>
                            </div>
                          </button>

                          {/* Pratyantara Dashas */}
                          {isAntarExpanded && antar.pratyantarDashas && (
                            <div className="bg-white">
                              {antar.pratyantarDashas.map((pratyantar, pratyIndex) => (
                                <div
                                  key={pratyIndex}
                                  className="p-3 pl-20 border-t border-border flex justify-between items-center"
                                >
                                  <div>
                                    <p className="text-sm text-text">{pratyantar.planet} Pratyantar Dasha</p>
                                    <p className="text-xs text-text-light">
                                      {formatDate(pratyantar.startDate)} - {formatDate(pratyantar.endDate)}
                                    </p>
                                  </div>
                                  <span className="text-xs text-text-light">{pratyantar.months} months</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Info Card */}
      <Card className="p-6 bg-white">
        <h5 className="text-primary mb-3">About Vimshottari Dasha</h5>
        <p className="text-text-light text-sm leading-relaxed">
          The Vimshottari Dasha system is a 120-year cycle divided among nine planets. Each planet's 
          Maha Dasha period is further subdivided into Antar Dashas and Pratyantar Dashas. The dasha 
          periods indicate the timing of events and the influence of planetary energies in your life.
        </p>
      </Card>
    </div>
  );
}
