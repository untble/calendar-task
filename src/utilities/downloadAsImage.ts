import html2canvas from 'html2canvas';

export const downloadAsImage = (targetId: string, filename: string) => {
  const target = document.getElementById(targetId);
  if (target) {
    html2canvas(target).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = filename || 'calendar.png';
      link.click();
    });
  }
}