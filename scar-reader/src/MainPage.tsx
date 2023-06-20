
import React, { useState } from 'react';
import axios, {AxiosResponse} from 'axios';
import './MainPageCss.css';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<MangaInterface[]>([]);

  interface MangaInterface {
  id: string;
  title: string;
  description: string;
  image_link: string;
 }

function mapResponseToInterface(response: any): MangaInterface {
  const mangaInterface: MangaInterface = {
    id: response.id,
    title: response.attributes.title.en,
    description: response.attributes.description.en,
    image_link: response.relationships.find((relationship: any) => relationship.type === "cover_art").attributes.fileName
  };

  return mangaInterface;
}

  const handleSearch = async () => {
    const url = "https://api.mangadex.org/manga?&limit=5&includes[]=cover_art&order[relevance]=desc"

    try {

        const response = await axios.get(url, {
            params: {
                title: searchTerm
            }
        });
        console.log(response.data.data);
        const mangaList: MangaInterface[] = response.data.data.map((mangaData: any) =>
            mapResponseToInterface(mangaData)
        );
      setResults(mangaList);
    } catch (error) {
      console.error(error);
    }
  };
return (
    <div className="main-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for manga..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
      </div>

      {results.length > 0 && (
        <div className="results-box">
          <div className="grid-container">
            {results.map((result) => (
              <div className="result-item" key={result.id}>
                <div className="image-container">
                  <img src={`https://uploads.mangadex.org/covers/${result.id}/${result.image_link}`} alt={result.title} />
                </div>
                <div className="content-container">
                  <p className="title">{result.title}</p>
                    <Link to={`/manga/${result.id}`} className="read-button">Read</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;

