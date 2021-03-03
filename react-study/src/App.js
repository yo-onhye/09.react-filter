import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import Pagination from './components/Pagination';

import './style/App.scss';

const App = () => {
  const [title, setTitle] = useState('');
  const [items, setItems] = useState([]);
  const [filterItems, setFilterItems] = useState([]);
  const [isTitleCheck, setIsTitleCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  const handleFilterOption = e => {
    if (e.target.value === 'true') {
      const newFilterItems = items.filter(item => item.completed);
      setFilterItems(newFilterItems);
      handleTitleCheck(true);
    } else if (e.target.value === 'false') {
      const newFilterItems = items.filter(item => !item.completed);
      setFilterItems(newFilterItems);
      handleTitleCheck(false);
    } else {
      setFilterItems(items);
    }
  };

  const handleFilterTitle = e => {
    if (e.target.value === '') {
      setFilterItems(items);
    } else {
      const newData = filterItems.filter(item => item.title.match(title));
      setFilterItems(newData);
    };
  };

  const handleAllCheck = e => {
    handleTitleCheck(e.target.checked);
    const allCheckItems = items.map(item => {
      return {
        ...item,
        completed: e.target.checked
      };
    });
    setFilterItems(allCheckItems);
  }

  const handleSingleCheck = id => {
    const newItems = items.map(item => {
      if(item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });

    setItems(newItems);
  }

  const handleTitleCheck = isChecked => {
    setIsTitleCheck(!isChecked);
    console.log(isChecked);
  }

  useEffect(() => {
    try {
      const getData = async () => {
        setIsLoading(true);
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');

        setItems(data);
        setFilterItems(data);
        setIsLoading(false);
      }

      getData();

    } catch (err) {
      console.log(err)
    }
  }, []);

  const currentPosts = filterItems.slice(indexOfFirst, indexOfLast);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <main className='container'>
      <section className='todoFilter'>
        <form>
          <div className='todoSelect'>
            <select name='keywordOption' onChange={handleFilterOption}>
              <option value='all'>all</option>
              <option value={true}>true</option>
              <option value={false}>false</option>
            </select>
          </div>
          <div className='todoInput'>
            <input 
              type='text' 
              value={title}
              name='keywordText' 
              onChange={e => setTitle(e.target.value)}
              onKeyUp={handleFilterTitle}
              title='검색어 입력' 
              placeholder='검색어를 입력하세요.'
            />
          </div>
        </form>
      </section>
      <TodoList 
        items={currentPosts || items}
        isLoading={isLoading}
        onAllCheck={handleAllCheck}
        onSingleCheck={handleSingleCheck}
      />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={filterItems.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </main>
  )
}

export default App;