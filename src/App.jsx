import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        let allRepos = [];
        let page = 1;
        let response;
        do {
          response = await axios.get(`https://api.github.com/users/google/repos?page=${page}&per_page=100`);
          allRepos = [...allRepos, ...response.data];
          page++;
        } while (response.data.length > 0);

        allRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);

        const topTenRepos = allRepos.slice(0, 10);

        setRepos(topTenRepos);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className='bg-gray-100 min-h-screen flex justify-center items-center'>
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-4xl font-bold text-center mb-4 text-gray-800'>
          Top 10 Google Repos
        </h1>
        <p className='text-lg text-center mb-8 text-gray-600'>The most popular repositories from Google</p>
        {loading ? (
          <div className='flex justify-center items-center'>
            <svg
              className='animate-spin h-5 w-5 mr-3 text-gray-800'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM20 12c0 2.133-.843 4.091-2.223 5.571l-3-2.647A7.962 7.962 0 0020 12h4zm-6-7.291A7.962 7.962 0 0020 12h4c0-6.627-5.373-12-12-12v4zm-7.777 7.777l-3 2.647C1.135 16.824 0 14.042 0 12h4c0 1.958.743 3.75 1.977 5.083z'
              ></path>
            </svg>
            <span className='text-gray-800'>Loading...</span>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {repos.map((repo, index) => (
              <div
                key={repo.id}
                className='bg-white rounded-lg shadow-lg p-6 transition duration-500 ease-in-out transform hover:scale-105'
              >
                <h2 className='text-lg font-semibold mb-2'>
                  {index + 1}.{' '}
                  <a
                    href={repo.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:underline transition duration-300 ease-in-out'
                  >
                    {repo.name}
                  </a>
                </h2>
                <p className='text-gray-600 mb-2'>Stars: {repo.stargazers_count}</p>
                <p className='text-gray-600 mb-2'>Language: {repo.language}</p>
                <p className='text-gray-600 mb-4'>
                  Description: {repo.description ? repo.description : 'No description available'}
                </p>
                <div className='flex justify-between items-center'>
                  <a
                    href={repo.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-600 hover:underline flex items-center transition duration-300 ease-in-out'
                  >
                    <span>View Repository</span>
                    <svg
                      className='w-4 h-4 ml-1 transition duration-300 ease-in-out'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-6a1 1 0 00-1 1v4a1 1 0 102 0V5a1 1 0 00-1-1zm0 10a1 1 0 100-2 1 1 0 000 2z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </a>
                  <span className='text-gray-600'>
                    Updated: {new Date(repo.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
