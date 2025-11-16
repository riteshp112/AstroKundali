import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Sparkles, Calendar, Clock, MapPin, LogOut, User, Trash2, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { deleteKundali } from '../utils/storage';
import { shareKundali } from '../utils/pdfUtils';
import { toast } from 'sonner';
import type { KundaliData } from '../App';

interface DashboardProps {
  kundalis: KundaliData[];
  onLogout: () => void;
}

export default function Dashboard({ kundalis, onLogout }: DashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-primary">AstroKundali</h3>
                <p className="text-sm text-text-light">My Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="mb-2">My Kundalis</h2>
              <p className="text-text-light">
                {kundalis.length === 0
                  ? 'You haven\'t created any kundalis yet'
                  : `${kundalis.length} ${kundalis.length === 1 ? 'kundali' : 'kundalis'} saved`}
              </p>
            </div>

            <Link to="/create">
              <Button className="bg-accent-teal hover:bg-accent-teal/90 text-primary">
                <Plus className="w-5 h-5 mr-2" />
                Create New Kundali
              </Button>
            </Link>
          </div>

          {/* Kundali Grid */}
          {kundalis.length === 0 ? (
            <Card className="p-12 text-center bg-white">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-secondary" />
                </div>
                <h4 className="text-primary mb-3">No Kundalis Yet</h4>
                <p className="text-text-light mb-6">
                  Create your first kundali to start exploring your cosmic blueprint and 
                  save it for future reference.
                </p>
                <Link to="/create">
                  <Button className="bg-accent-teal hover:bg-accent-teal/90 text-primary">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Kundali
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kundalis.map((kundali, index) => (
                <motion.div
                  key={kundali.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <KundaliCard kundali={kundali} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Info Section */}
          {kundalis.length > 0 && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-white text-center">
                <div className="text-3xl mb-3">📊</div>
                <h5 className="text-primary mb-2">Detailed Charts</h5>
                <p className="text-sm text-text-light">
                  View multiple chart styles and divisional charts
                </p>
              </Card>
              <Card className="p-6 bg-white text-center">
                <div className="text-3xl mb-3">📥</div>
                <h5 className="text-primary mb-2">Download PDF</h5>
                <p className="text-sm text-text-light">
                  Export your kundali as a beautifully formatted PDF
                </p>
              </Card>
              <Card className="p-6 bg-white text-center">
                <div className="text-3xl mb-3">🔐</div>
                <h5 className="text-primary mb-2">Secure Storage</h5>
                <p className="text-sm text-text-light">
                  Your kundalis are safely stored and accessible anytime
                </p>
              </Card>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function KundaliCard({ kundali }: { kundali: KundaliData }) {
  const navigate = useNavigate();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete ${kundali.name}'s kundali?`)) {
      deleteKundali(kundali.id);
      toast.success('Kundali deleted successfully');
      // Trigger a refresh by navigating
      setTimeout(() => {
        navigate(0);
      }, 500);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = shareKundali(kundali);
    navigator.clipboard.writeText(url);
    toast.success('Share link copied to clipboard!');
  };

  return (
    <Link to={`/kundali/${kundali.id}`} state={{ kundali }}>
      <Card className="p-6 bg-white hover:shadow-lg transition-all duration-300 border-border hover:border-accent-teal group cursor-pointer relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
            <Sparkles className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-accent-teal/10 text-accent-teal">
            Saved
          </span>
        </div>

        {/* Name */}
        <h5 className="text-primary mb-3 group-hover:text-accent-teal transition-colors">
          {kundali.name}
        </h5>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-text-light">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(kundali.dob).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-text-light">
            <Clock className="w-4 h-4" />
            <span>{kundali.tob}</span>
          </div>
          <div className="flex items-center gap-2 text-text-light">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{kundali.pob}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-text-light">
            Created {new Date(kundali.createdAt).toLocaleDateString('en-IN')}
          </p>
        </div>

        {/* Hover Actions */}
        <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            className="flex-1 bg-accent-teal hover:bg-accent-teal/90 text-primary"
            onClick={(e) => e.preventDefault()}
          >
            View Kundali
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-border hover:bg-blue-50"
            onClick={handleShare}
            title="Copy share link"
          >
            <Share2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-border hover:bg-red-50"
            onClick={handleDelete}
            title="Delete kundali"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </Link>
  );
}
