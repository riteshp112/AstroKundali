import { Card } from '../ui/card';
import type { KundaliData } from '../../App';

interface DetailsTabProps {
  kundali: KundaliData;
}

export default function DetailsTab({ kundali }: DetailsTabProps) {
  return (
    <div className="space-y-6">
      {/* Birth Details */}
      <Card className="p-6 bg-white">
        <h4 className="text-primary mb-6">Birth Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoSection title="Personal Details">
            <InfoRow label="Full Name" value={kundali.name} />
            <InfoRow 
              label="Date of Birth" 
              value={new Date(kundali.dob).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })} 
            />
            <InfoRow label="Time of Birth" value={kundali.tob} />
            <InfoRow label="Place of Birth" value={kundali.pob} />
          </InfoSection>

          <InfoSection title="Coordinates">
            <InfoRow label="Latitude" value={`${kundali.latitude.toFixed(4)}° N`} />
            <InfoRow label="Longitude" value={`${kundali.longitude.toFixed(4)}° E`} />
            <InfoRow label="Time Zone" value="IST (UTC +5:30)" />
            <InfoRow label="Ayanamsa" value="Lahiri" />
          </InfoSection>
        </div>
      </Card>

      {/* Panchang at Birth */}
      <Card className="p-6 bg-white">
        <h4 className="text-primary mb-6">Panchang at Birth</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PanchangItem
            title="Tithi"
            value="Shukla Dashami"
            subValue="10th Lunar Day (Waxing)"
            emoji="🌙"
          />
          <PanchangItem
            title="Vara"
            value="Mangalvara"
            subValue="Tuesday (Mars Day)"
            emoji="🔴"
          />
          <PanchangItem
            title="Nakshatra"
            value="Pushya"
            subValue="8th Nakshatra (Pada 3)"
            emoji="⭐"
          />
          <PanchangItem
            title="Yoga"
            value="Siddha"
            subValue="Auspicious Yoga"
            emoji="🕉️"
          />
          <PanchangItem
            title="Karana"
            value="Baalava"
            subValue="Movable Karana"
            emoji="🔄"
          />
          <PanchangItem
            title="Paksha"
            value="Shukla Paksha"
            subValue="Waxing Moon Phase"
            emoji="🌒"
          />
        </div>
      </Card>

      {/* Additional Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white">
          <h5 className="text-primary mb-4">Sunrise & Sunset</h5>
          <div className="space-y-3">
            <InfoRow label="Sunrise" value="06:23 AM IST" />
            <InfoRow label="Sunset" value="06:45 PM IST" />
            <InfoRow label="Day Duration" value="12 hours 22 minutes" />
            <InfoRow label="Night Duration" value="11 hours 38 minutes" />
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <h5 className="text-primary mb-4">Moon Details</h5>
          <div className="space-y-3">
            <InfoRow label="Moon Sign" value="Cancer (Karka)" />
            <InfoRow label="Moon Nakshatra" value="Pushya (Pada 3)" />
            <InfoRow label="Moon Phase" value="Waxing Gibbous" />
            <InfoRow label="Moon Illumination" value="73%" />
          </div>
        </Card>
      </div>

      {/* Muhurta Details */}
      <Card className="p-6 bg-white">
        <h5 className="text-primary mb-4">Auspicious Times (Muhurta)</h5>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-text-light text-sm mb-2">Abhijit Muhurta</p>
            <p className="text-text">11:52 AM - 12:40 PM</p>
            <p className="text-xs text-accent-teal mt-1">✓ Auspicious</p>
          </div>
          <div>
            <p className="text-text-light text-sm mb-2">Brahma Muhurta</p>
            <p className="text-text">04:45 AM - 05:33 AM</p>
            <p className="text-xs text-accent-teal mt-1">✓ Highly Auspicious</p>
          </div>
          <div>
            <p className="text-text-light text-sm mb-2">Rahu Kaal</p>
            <p className="text-text">03:15 PM - 04:45 PM</p>
            <p className="text-xs text-accent-maroon mt-1">✗ Inauspicious</p>
          </div>
        </div>
      </Card>

      {/* Divisional Charts Available */}
      <Card className="p-6 bg-white">
        <h5 className="text-primary mb-4">Divisional Charts (Vargas)</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            'D1 (Rashi)',
            'D2 (Hora)',
            'D3 (Drekkana)',
            'D4 (Chaturthamsa)',
            'D7 (Saptamsa)',
            'D9 (Navamsa)',
            'D10 (Dasamsa)',
            'D12 (Dwadasamsa)',
            'D16 (Shodasamsa)',
            'D20 (Vimsamsa)',
            'D24 (Chaturvimsamsa)',
            'D30 (Trisamsa)',
          ].map((chart, index) => (
            <div
              key={index}
              className="p-3 border border-border rounded-md text-center hover:border-accent-teal transition-colors cursor-pointer"
            >
              <p className="text-sm text-text">{chart}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Chart Generated Info */}
      <Card className="p-4 bg-gray-50 border-border">
        <div className="flex items-center justify-between text-sm text-text-light">
          <span>
            Chart generated on:{' '}
            {new Date(kundali.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
          <span>System: Vedic (Tropical)</span>
        </div>
      </Card>
    </div>
  );
}

function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h6 className="text-text mb-3">{title}</h6>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-text-light text-sm">{label}</span>
      <span className="text-text text-sm text-right max-w-[60%]">{value}</span>
    </div>
  );
}

function PanchangItem({
  title,
  value,
  subValue,
  emoji,
}: {
  title: string;
  value: string;
  subValue: string;
  emoji: string;
}) {
  return (
    <div className="p-4 border border-border rounded-lg hover:border-accent-teal transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{emoji}</span>
        <h6 className="text-text">{title}</h6>
      </div>
      <p className="text-text mb-1">{value}</p>
      <p className="text-xs text-text-light">{subValue}</p>
    </div>
  );
}
