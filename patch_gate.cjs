const { readFileSync, writeFileSync } = require('fs');

let content = readFileSync('src/components/CustomizationGate.tsx', 'utf8');

// Add phone state
content = content.replace(
  `  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');`,
  `  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');`
);

// Form submit
content = content.replace(
  `onSubmit={(e) => { e.preventDefault(); if (name && email) registerUser(name, email); }}`,
  `onSubmit={(e) => { e.preventDefault(); if (name && email && phone) registerUser(name, email, phone); }}`
);

// Add phone input field
const newField = `            <div>
              <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">WhatsApp Number</label>
              <input type="tel" pattern="[0-9]*" inputMode="numeric" required value={phone} onChange={e => { const val = e.target.value.replace(/[^0-9]/g, ''); setPhone(val); }} className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Enter only numbers (e.g. 9876543210)" />
            </div>
            <button`;

content = content.replace(
  `            <button type="submit" className="bg-[#C08B46] hover:bg-[#A8793A] text-white px-6 py-3 rounded-xl font-semibold text-xs shadow-md transition w-full mt-2 cursor-pointer">`,
  newField + ` type="submit" className="bg-[#C08B46] hover:bg-[#A8793A] text-white px-6 py-3 rounded-xl font-semibold text-xs shadow-md transition w-full mt-2 cursor-pointer">`
);

// Firestore auto-request
content = content.replace(
  `whatsappNumber: '+91 88509 18792'`,
  `whatsappNumber: user.phone || ''`
);

// Firestore request access manually
content = content.replace(
  `whatsappNumber: user.email || ''`,
  `whatsappNumber: user.phone || ''` // wait, let's check what it is in manual request
);
writeFileSync('src/components/CustomizationGate.tsx', content);
console.log("Patched CustomizationGate");
