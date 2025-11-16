import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { getRecentKundalis, getAllKundalis } from '../utils/storage';
import type { KundaliData } from '../App';

export default function KundaliComparison() {
  const [searchParams] = useSearchParams();
  const [selectedKundalis, setSelectedKundalis] = useState<KundaliData[]>([]);
  const [availableKundalis, setAvailableKundalis] = useState<KundaliData[]>([]);
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    const allKundalis = getAllKundalis();
    setAvailableKundalis(allKundalis);
  }, []);

  const handleSelectKundali = (kundali: KundaliData) => {
    if (!selectedKundalis.some(k => k.id === kundali.id)) {
      setSelectedKundalis([...selectedKundalis, kundali]);
    }
  };

  const handleRemoveKundali = (id: string) => {
    setSelectedKundalis(selectedKundalis.filter(k => k.id !== id));
  };

  if (selectedKundalis.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="mb-4">Compare Kundalis</h2>
            <p className="text-text-light mb-8">
              Select two or more kundalis to compare their planetary positions and astrological insights
            </p>

            <Card className="p-12 bg-white max-w-2xl mx-auto">
              <Button
                onClick={() => setShowSelector(true)}
                className="bg-accent-teal hover:bg-accent-teal/90 text-primary"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Select Kundalis to Compare
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* Selector Modal */}
        {showSelector && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-2xl w-full p-6 bg-white max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-primary">Select Kundalis</h3>
                <button onClick={() => setShowSelector(false)} className="text-text-light hover:text-text">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 mb-6">
                {availableKundalis.length === 0 ? (
                  <p className="text-text-light text-center py-6">No kundalis available</p>
                ) : (
                  availableKundalis.map((kundali) => (
                    <button
                      key={kundali.id}
                      onClick={() => handleSelectKundali(kundali)}
                      className="w-full p-4 border border-border rounded-lg hover:bg-background transition-colors text-left"
                    >
                      <h4 className="text-primary font-medium">{kundali.name}</h4>
                      <p className="text-sm text-text-light">
                        {new Date(kundali.dob).toLocaleDateString()} • {kundali.tob}
                      </p>
                    </button>
                  ))
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowSelector(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowSelector(false)}
                  className="flex-1 bg-accent-teal hover:bg-accent-teal/90 text-primary"
                  disabled={selectedKundalis.length < 2}
                >
                  Compare ({selectedKundalis.length})
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h3 className="text-primary">Kundali Comparison</h3>
            <Button
              onClick={() => setShowSelector(true)}
              variant="outline"
              className="border-border"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Kundali Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {selectedKundalis.map((kundali) => (
              <Card key={kundali.id} className="p-6 bg-white relative">
                <button
                  onClick={() => handleRemoveKundali(kundali.id)}
                  className="absolute top-4 right-4 text-text-light hover:text-text"
                >
                  <X className="w-5 h-5" />
                </button>

                <h4 className="text-primary font-semibold mb-2">{kundali.name}</h4>
                <div className="space-y-2 text-sm text-text-light">
                  <p>DOB: {new Date(kundali.dob).toLocaleDateString()}</p>
                  <p>TOB: {kundali.tob}</p>
                  <p>POB: {kundali.pob}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Comparison Table */}
          <Card className="p-6 bg-white overflow-x-auto">
            <h4 className="text-primary mb-6 font-semibold">Planetary Positions Comparison</h4>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 text-primary font-semibold">Planet</th>
                  {selectedKundalis.map((kundali) => (
                    <th key={kundali.id} className="text-left py-3 px-3 text-primary font-semibold">
                      {kundali.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'].map(
                  (planet) => (
                    <tr key={planet} className="border-b border-border hover:bg-background">
                      <td className="py-3 px-3 font-medium text-text">{planet}</td>
                      {selectedKundalis.map((kundali) => (
                        <td key={kundali.id} className="py-3 px-3 text-text-light">
                          Data would be displayed here
                        </td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Card>

          {/* Compatibility Score */}
          {selectedKundalis.length === 2 && (
            <Card className="p-6 bg-white mt-8">
              <h4 className="text-primary mb-4 font-semibold">Relationship Compatibility</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-text">Overall Compatibility</span>
                    <span className="text-primary font-semibold">76%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-accent-teal h-2 rounded-full"
                      style={{ width: '76%' }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-background rounded-lg">
                    <h5 className="text-sm font-medium text-primary mb-1">Guna Milan</h5>
                    <p className="text-2xl font-bold text-accent-teal">28/36</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <h5 className="text-sm font-medium text-primary mb-1">Bhakoot</h5>
                    <p className="text-2xl font-bold text-accent-teal">Excellent</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <h5 className="text-sm font-medium text-primary mb-1">Nadi</h5>
                    <p className="text-2xl font-bold text-accent-teal">Good</p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Selector Modal */}
      {showSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full p-6 bg-white max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-primary">Add More Kundalis</h3>
              <button onClick={() => setShowSelector(false)} className="text-text-light hover:text-text">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {availableKundalis
                .filter((k) => !selectedKundalis.some((sk) => sk.id === k.id))
                .map((kundali) => (
                  <button
                    key={kundali.id}
                    onClick={() => {
                      handleSelectKundali(kundali);
                      setShowSelector(false);
                    }}
                    className="w-full p-4 border border-border rounded-lg hover:bg-background transition-colors text-left"
                  >
                    <h4 className="text-primary font-medium">{kundali.name}</h4>
                    <p className="text-sm text-text-light">
                      {new Date(kundali.dob).toLocaleDateString()} • {kundali.tob}
                    </p>
                  </button>
                ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setShowSelector(false)}
              className="w-full"
            >
              Close
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
