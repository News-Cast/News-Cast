import React, { useState, useEffect } from 'react';
import { GET } from '../helpers/requests';
import ArticleListElement from '../components/articleListElement';
import { useSearchParams } from "react-router-dom";
import SearchField from '../components/searchField';
import TopicListElement from '../components/topicListElement';

function SearchPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState();
  const [page, setPage] = useState();
  const [pageList, setPageList] = useState([]);

  const HITS_PER_PAGE = 20;
  let page_list;
  

  let search = (query) => {
    GET(`/search/?q=${query}&count=20`)
      .then(response => setResults(response.data))
  }
  useEffect(() => {
    let q = searchParams.get('q');
    if (q) {
      setQuery(q);
      search(q);
    };
    let p = searchParams.get('page');
    if (p) {
      setPage(parseInt(p));
    } else {
      setPage(1);
    }
  }, []);

  useEffect(() => {
    if (!results) return;
    let start = 1;
    let end = 5;
    if (page < (Math.ceil(results.hitCount / HITS_PER_PAGE) - 2)) {
      if (page < 3) {
        console.log('p0')
        if (Math.ceil(results.hitCount / HITS_PER_PAGE) < 5) {
          console.log('p1')
          end = Math.ceil(results.hitCount / HITS_PER_PAGE);
        }
      } else {
        console.log('p2')
        end = page + 2;
        start = page - 2;
      }
    } else {
      end = Math.ceil(results.hitCount / HITS_PER_PAGE);
      if (page < 5) {
        console.log('p3')
        start = 1;
      } else {
        console.log('p4')
        start = end - 5;
      }
    }
    setPageList(Array.from({length: end - start + 1}, (x, i) => i + start))
  }, [results]);

  return (
      <div className="container mx-auto pt-16 px-3 mb-40">
        <div className="w-full max-w-xl">
          <SearchField />
          {results && 
            <div className="mt-3">
              <div className="text-sm">{results.hitCount} Ergebnisse</div>
              {results.suggestion &&
                <div className="">Meintest du: <a href={`/search?q=${results.suggestion}`}><span className="text-slate-800" dangerouslySetInnerHTML={{__html: results.suggestion_html}} /></a></div>
              }
            </div>
          }
        </div>
        <div className="w-full max-w-4xl">
        {results && 
            <div className="mt-10">
              {results.content.map(content => {
                return (
                  content.type === 'topic'
                    ? <TopicListElement topic={content} />
                    : <ArticleListElement article={content} />
                )})
              }
              <div className='mt-14'>
                <a 
                  href={`/search?q=${query}&page=${page - 1}`}
                  disabled={page == 1 ? true : false} 
                  className={`rounded-l-full border px-3 py-2 font-bold ${page == 1 ? "bg-slate-200 text-gray-500 cursor-not-allowed" : "hover:bg-slate-100 cursor-pointer"}`}
                >Zurück</a>
                {pageList.map((site_page) => 
                  <a 
                    href={`/search?q=${query}&page=${site_page}`}
                    disabled={page == site_page ? true : false} 
                    className={`border-y border-r px-3 py-2 font-bold ${page == site_page ? "bg-slate-200 text-gray-500 cursor-not-allowed" : "hover:bg-slate-100 cursor-pointer"}`}
                  >{site_page}</a>
                )}
                <a 
                  href={`/search?q=${query}&page=${page + 1}`}
                  disabled={page == Math.ceil(results.hitCount / HITS_PER_PAGE) ? true : false} 
                  className={`rounded-r-full border-y border-r px-3 py-2 font-bold ${page == Math.ceil(results.hitCount / HITS_PER_PAGE) ? "bg-slate-200 text-gray-500 cursor-not-allowed" : "hover:bg-slate-100 cursor-pointer"}`}
                >Weiter</a>
              </div>
            </div>
          }
        </div>
      </div>
  );
}

export default SearchPage;
