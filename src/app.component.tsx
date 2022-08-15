import React from 'react';

import Header from '~/layout/header.component';
import Footer from '~/layout/footer.component';

import { randomWord } from '~/utils/utils';
import { WordRow } from '~/reactdle/word-row.component';

const App = () => {
  const word = randomWord();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex justify-center flex-grow">
        <h1>Main Content</h1>
        <div className="w-1/3 grid grid-rows-6 gap-2 m-4">
          <WordRow letters="hello" />
          <WordRow letters="solar" />
          <WordRow letters="penny" />
          <WordRow letters="smack" />
          <WordRow letters="stare" />
          <WordRow letters="he" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
