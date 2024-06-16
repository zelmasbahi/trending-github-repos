import React from "react";

interface LangFilterProps {
  selectedLanguages: string[];
  setSelectedLanguages: (languages: string[]) => void;
  languages: string[];
}

const LangFilter: React.FC<LangFilterProps> = ({
  selectedLanguages,
  setSelectedLanguages,
  languages,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedLanguages([...selectedLanguages, value]);
    } else {
      setSelectedLanguages(selectedLanguages.filter((lang) => lang !== value));
    }
  };

  return (
    <div>
      {languages.length > 0 &&
        languages.map((lang) => (
          <label key={lang} className="mr-2">
            <input
              type="checkbox"
              className="mr-1"
              value={lang}
              checked={selectedLanguages.includes(lang)}
              onChange={handleCheckboxChange}
            />
            {lang}
          </label>
        ))}
    </div>
  );
};

export default LangFilter;
