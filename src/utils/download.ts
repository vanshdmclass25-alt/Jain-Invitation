import { toPng } from 'html-to-image';

export async function downloadInvitationCard(elementId: string, filename: string = 'jain-tapasya-parna-invitation.png'): Promise<boolean> {
  const node = document.getElementById(elementId);
  if (!node) {
    console.error('Element not found:', elementId);
    return false;
  }

  try {
    const dataUrl = await toPng(node, {
      quality: 0.95,
      pixelRatio: 2,
      cacheBust: true,
      filter: (child) => {
        // Exclude interactive buttons inside the card container if any
        if (child instanceof HTMLElement && child.dataset.ignoreScreenshot === 'true') {
          return false;
        }
        return true;
      },
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('Failed to capture card image:', err);
    alert('Could not generate image. You can take a screenshot or share via the link/WhatsApp.');
    return false;
  }
}
