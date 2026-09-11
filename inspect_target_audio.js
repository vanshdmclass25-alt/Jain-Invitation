const fs = require('fs');
const https = require('https');

https.get('https://tattva-parna-invitation.vercel.app/assets/index-D8wLNQLI.js', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('target_bundle.js', data);
    console.log('Downloaded bundle size:', data.length);

    // Search for audio track definitions or TAPASYA_SONGS
    const regex = /\{[^}]*?(?:title|audioUrl|youtubeUrl|artist)[^}]*?\}/gi;
    let match;
    console.log('--- SONG OBJECTS FOUND ---');
    while ((match = regex.exec(data)) !== null) {
      if (match[0].includes('title') || match[0].includes('audio') || match[0].includes('Stotra')) {
        console.log(match[0]);
      }
    }

    // Search for audio class or audio player implementation
    console.log('--- AUDIO CODE FRAGMENTS ---');
    const audioCodeMatches = data.match(/class\s+\w+\s*\{[^}]*play[^}]*\}/gi) || [];
    audioCodeMatches.forEach(c => console.log(c.slice(0, 500)));
  });
});
