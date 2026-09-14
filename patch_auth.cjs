const { readFileSync, writeFileSync } = require('fs');

let content = readFileSync('src/context/AuthContext.tsx', 'utf8');

content = content.replace(
  `export interface User {
  name: string;
  email: string;
  uid: string;
}`,
  `export interface User {
  name: string;
  email: string;
  phone: string;
  uid: string;
}`
);

content = content.replace(
  `registerUser: (name: string, email: string) => void;`,
  `registerUser: (name: string, email: string, phone: string) => void;`
);

content = content.replace(
  `  const registerUser = (name: string, email: string) => {
    const newUser = { name, email, uid: Math.random().toString(36).substring(2, 15) };
    setUser(newUser);
    localStorage.setItem('tattva_user', JSON.stringify(newUser));
  };`,
  `  const registerUser = (name: string, email: string, phone: string) => {
    const newUser = { name, email, phone, uid: Math.random().toString(36).substring(2, 15) };
    setUser(newUser);
    localStorage.setItem('tattva_user', JSON.stringify(newUser));
  };`
);

writeFileSync('src/context/AuthContext.tsx', content);
console.log("Patched AuthContext");
