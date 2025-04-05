import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <header className="header">
            <h1>Open Network Visualization Platform (ONVP)</h1>
          </header>
          <div className="content">
            <aside className="sidebar">
              <nav>
                <ul>
                  <li>
                    <Link href="/">Introduction</Link>
                  </li>
                  <li>
                    <Link href="/visualization">Visualization</Link>
                  </li>
                </ul>
              </nav>
            </aside>
            <main className="main">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}