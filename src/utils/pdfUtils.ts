import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { KundaliData } from '../App';

export const generateKundaliPDF = async (kundali: KundaliData, element?: HTMLElement): Promise<void> => {
  try {
    let canvas: HTMLCanvasElement;
    
    if (element) {
      // Capture the provided element
      canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: 1200,
      });
    } else {
      // Create a simple text-based PDF if no element provided
      const pdf = new jsPDF('portrait', 'mm', 'a4');
      
      // Add title
      pdf.setFontSize(20);
      pdf.text('Kundali Report', 105, 30, { align: 'center' });
      
      // Add personal details
      pdf.setFontSize(14);
      pdf.text('Personal Details', 20, 60);
      
      pdf.setFontSize(12);
      pdf.text(`Name: ${kundali.name}`, 20, 80);
      pdf.text(`Date of Birth: ${new Date(kundali.dob).toLocaleDateString()}`, 20, 90);
      pdf.text(`Time of Birth: ${kundali.tob}`, 20, 100);
      pdf.text(`Place of Birth: ${kundali.pob}`, 20, 110);
      pdf.text(`Coordinates: ${kundali.latitude.toFixed(4)}°N, ${kundali.longitude.toFixed(4)}°E`, 20, 120);
      
      // Add chart placeholder
      pdf.setFontSize(14);
      pdf.text('Birth Chart', 20, 150);
      pdf.setFontSize(10);
      pdf.text('Chart visualization would appear here in the full version', 20, 170);
      
      // Add footer
      pdf.setFontSize(8);
      pdf.text(`Generated on ${new Date().toLocaleDateString()} by AstroKundali`, 105, 280, { align: 'center' });
      
      pdf.save(`${kundali.name}_Kundali.pdf`);
      return;
    }

    // Create PDF from canvas
    const pdf = new jsPDF('portrait', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    // Add additional pages if content is too long
    if (imgHeight > 297) { // A4 height in mm
      let remainingHeight = imgHeight - 297;
      let yOffset = -297;
      
      while (remainingHeight > 0) {
        pdf.addPage();
        const pageHeight = Math.min(remainingHeight, 297);
        pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
        yOffset -= 297;
        remainingHeight -= 297;
      }
    }
    
    pdf.save(`${kundali.name}_Kundali.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

export const shareKundali = (kundali: KundaliData): string => {
  const params = new URLSearchParams({
    name: kundali.name,
    dob: kundali.dob,
    tob: kundali.tob,
    pob: kundali.pob,
  });
  
  return `${window.location.origin}/#/kundali/shared?${params}`;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};
