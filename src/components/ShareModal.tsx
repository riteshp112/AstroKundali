import { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

interface ShareModalProps {
  isOpen: boolean;
  shareUrl: string;
  onClose: () => void;
}

export default function ShareModal({ isOpen, shareUrl, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary">Share Kundali</h3>
          <button
            onClick={onClose}
            className="text-text-light hover:text-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-text-light mb-4">
          Share this link with others to let them view your kundali:
        </p>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 px-3 py-2 border border-border rounded-md text-sm bg-background"
          />
          <Button
            onClick={handleCopy}
            className="bg-accent-teal hover:bg-accent-teal/90 text-primary px-3"
          >
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>

        <div className="space-y-3 mb-6">
          <h4 className="text-sm font-medium text-primary">Share via:</h4>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.open(
                  `https://twitter.com/intent/tweet?text=Check out my Kundali!&url=${encodeURIComponent(shareUrl)}`,
                  '_blank'
                );
              }}
              className="flex-1"
            >
              Twitter
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                  '_blank'
                );
              }}
              className="flex-1"
            >
              Facebook
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                window.open(
                  `https://api.whatsapp.com/send?text=Check out my Kundali: ${encodeURIComponent(shareUrl)}`,
                  '_blank'
                );
              }}
              className="flex-1"
            >
              WhatsApp
            </Button>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="w-full bg-accent-teal hover:bg-accent-teal/90 text-primary"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
