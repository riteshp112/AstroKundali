import { useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Download, Settings2 } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import ChartTab from './kundali-tabs/ChartTab';
import PlanetsTab from './kundali-tabs/PlanetsTab';
import DashaTab from './kundali-tabs/DashaTab';
import DetailsTab from './kundali-tabs/DetailsTab';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { KundaliData } from '../App';

export default function KundaliViewer() {
  const { id } = useParams();
  const location = useLocation();
  const kundali = location.state?.kundali as KundaliData;
  
  const [chartStyle, setChartStyle] = useState<'north' | 'south' | 'east'>('north');

  // If no kundali data, show error
  if (!kundali) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h3 className="mb-4">Kundali not found</h3>
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleDownloadPDF = () => {
    // Mock PDF download - in real app, generate PDF
    alert('PDF download functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h3 className="text-primary">{kundali.name}</h3>
                <p className="text-sm text-text-light">
                  {new Date(kundali.dob).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}{' '}
                  • {kundali.tob} • {kundali.pob}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Select value={chartStyle} onValueChange={(value: any) => setChartStyle(value)}>
                <SelectTrigger className="w-[180px]">
                  <Settings2 className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north">North Indian</SelectItem>
                  <SelectItem value="south">South Indian</SelectItem>
                  <SelectItem value="east">East Indian</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleDownloadPDF} className="bg-accent-teal hover:bg-accent-teal/90 text-primary">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white border border-border">
            <TabsTrigger value="chart">Chart</TabsTrigger>
            <TabsTrigger value="planets">Planets</TabsTrigger>
            <TabsTrigger value="dasha">Dasha</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="chart">
            <ChartTab chartStyle={chartStyle} kundali={kundali} />
          </TabsContent>

          <TabsContent value="planets">
            <PlanetsTab />
          </TabsContent>

          <TabsContent value="dasha">
            <DashaTab />
          </TabsContent>

          <TabsContent value="details">
            <DetailsTab kundali={kundali} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
