import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export default function ContextEx() {
  const [lang, setLang] = useState("ko"); 
 
  // TODO: Provider 내부에 <Header />, <Main />, <Button />를 렌더링하세요.
  return (
    <LanguageContext.Provider value={{lang, setLang}}>
      <Header />
      <Main />
      <Button />
    </LanguageContext.Provider>
  );
}

function Header() {
  const {lang} = useContext(LanguageContext);
  return <h1>{lang==='ko'? "내 웹사이트" : "My Website"}</h1>;
}

function Main() {
  const {lang} = useContext(LanguageContext);

  return <p>{lang==='ko'? '안녕하세요':'Hello'}</p>;
}

function Button() {
  const {lang, setLang} = useContext(LanguageContext);
  const toggleLanguage = () => setLang(prev=>(prev==='ko' ? 'en' :'ko'));

  return <button onClick={toggleLanguage}>{lang ==='ko'? '언어 변경':'Change language'}</button>;;
}
