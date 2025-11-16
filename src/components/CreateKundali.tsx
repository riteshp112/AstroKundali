import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Sparkles, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { toast } from 'sonner';
import { saveKundali } from '../utils/storage';
import type { KundaliData } from '../App';

interface CreateKundaliProps {
  isLoggedIn: boolean;
  onSave: (kundali: KundaliData) => void;
}

export default function CreateKundali({ isLoggedIn, onSave }: CreateKundaliProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    tob: '',
    pob: '',
    saveToAccount: false,
  });

  // Mock location data - in real app, use Google Places API
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleLocationInput = (value: string) => {
    setFormData(prev => ({ ...prev, pob: value }));
    
    // Mock suggestions - in real app, call Google Places API
    if (value.length > 2) {
      const mockSuggestions = [
        'Mumbai, Maharashtra, India',
        'Delhi, Delhi, India',
        'Bangalore, Karnataka, India',
        'Kolkata, West Bengal, India',
        'Chennai, Tamil Nadu, India',
      ].filter(loc => loc.toLowerCase().includes(value.toLowerCase()));
      
      setLocationSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleLocationSelect = (location: string) => {
    setFormData(prev => ({ ...prev, pob: location }));
    setShowSuggestions(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.dob || !formData.tob || !formData.pob) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const kundaliData: KundaliData = {
      id: Date.now().toString(),
      name: formData.name,
      dob: formData.dob,
      tob: formData.tob,
      pob: formData.pob,
      latitude: 19.0760, // Mock coordinates (Mumbai)
      longitude: 72.8777,
      createdAt: new Date().toISOString(),
    };

    // Always save to local storage
    saveKundali(kundaliData);

    if (isLoggedIn && formData.saveToAccount) {
      onSave(kundaliData);
      toast.success('Kundali saved to your account!');
    } else {
      toast.success('Kundali created successfully!');
    }

    setLoading(false);
    navigate(`/kundali/${kundaliData.id}`, { state: { kundali: kundaliData } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <span className="text-primary">AstroKundali</span>
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h2 className="mb-3">Create Your Kundali</h2>
            <p className="text-text-light">
              Enter your birth details to generate your personalized Vedic birth chart
            </p>
          </div>

          <Card className="p-8 bg-white shadow-lg border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-primary">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="border-border"
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="dob" className="text-primary">
                  Date of Birth *
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light pointer-events-none" />
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData(prev => ({ ...prev, dob: e.target.value }))}
                    required
                    className="pl-11 border-border"
                  />
                </div>
              </div>

              {/* Time of Birth */}
              <div className="space-y-2">
                <Label htmlFor="tob" className="text-primary">
                  Time of Birth *
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light pointer-events-none" />
                  <Input
                    id="tob"
                    type="time"
                    value={formData.tob}
                    onChange={(e) => setFormData(prev => ({ ...prev, tob: e.target.value }))}
                    required
                    className="pl-11 border-border"
                  />
                </div>
              </div>

              {/* Place of Birth */}
              <div className="space-y-2">
                <Label htmlFor="pob" className="text-primary">
                  Place of Birth *
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light pointer-events-none" />
                  <Input
                    id="pob"
                    type="text"
                    placeholder="Start typing city name..."
                    value={formData.pob}
                    onChange={(e) => handleLocationInput(e.target.value)}
                    onFocus={() => formData.pob.length > 2 && setShowSuggestions(true)}
                    required
                    className="pl-11 border-border"
                    autoComplete="off"
                  />
                  
                  {/* Location Suggestions */}
                  {showSuggestions && locationSuggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
                      {locationSuggestions.map((location, index) => (
                        <button
                          key={index}
                          type="button"
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-text"
                          onClick={() => handleLocationSelect(location)}
                        >
                          <MapPin className="w-4 h-4 text-text-light" />
                          {location}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-sm text-text-light">
                  Location will be used to calculate accurate planetary positions
                </p>
              </div>

              {/* Save to Account */}
              {isLoggedIn && (
                <div className="flex items-center gap-2 p-4 bg-background rounded-md">
                  <input
                    type="checkbox"
                    id="save"
                    checked={formData.saveToAccount}
                    onChange={(e) => setFormData(prev => ({ ...prev, saveToAccount: e.target.checked }))}
                    className="w-4 h-4 text-accent-teal rounded border-border"
                  />
                  <Label htmlFor="save" className="text-text cursor-pointer">
                    Save to my account
                  </Label>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-accent-teal hover:bg-accent-teal/90 text-primary py-6"
                size="lg"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Your Kundali...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Kundali
                  </>
                )}
              </Button>

              {!isLoggedIn && (
                <p className="text-center text-sm text-text-light">
                  Want to save your kundalis?{' '}
                  <Link to="/login" className="text-accent-teal hover:underline">
                    Create an account
                  </Link>
                </p>
              )}
            </form>
          </Card>

          {/* Info Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-border text-center">
              <div className="text-2xl mb-2">🔒</div>
              <p className="text-sm text-text-light">Your data is private and secure</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-border text-center">
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-sm text-text-light">Instant chart generation</p>
            </div>
            <div className="p-4 bg-white rounded-lg border border-border text-center">
              <div className="text-2xl mb-2">📱</div>
              <p className="text-sm text-text-light">Access from any device</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
